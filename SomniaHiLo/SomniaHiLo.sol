// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * Somnia Hi‑Lo — on‑chain higher/lower with per‑step reveals.
 * - 52‑card deck (ranks only: 2..A). Suits ignored for Hi/Lo.
 * - Draws without replacement using counts per rank (4 copies each).
 * - First card drawn via prime(gameId).
 * - Each guess is a tx: revealNext(gameId, guess) where guess: 0=lower, 1=higher.
 * - Ace is treated as the lowest rank (wraps below 2).
 * - Cash‑out any time: bet * product(1/prob_step) * (1 - edge), capped.
 */

contract SomniaHiLo {
    // ----- Config -----
    uint256 public constant ENTRY_FEE_WEI = 1 ether;
    uint16 public constant HOUSE_EDGE_BPS = 100; // 1%
    uint256 public constant MULT_SCALE = 1e9; // fixed‑point scale
    uint256 public constant MAX_PAYOUT_X = 20 * MULT_SCALE;

    // ----- Owner / Treasury -----
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    uint256 public houseBalance;

    // Reentrancy guard
    uint256 private _reent = 1;
    modifier nonReentrant() {
        require(_reent == 1, "reentrant");
        _reent = 2;
        _;
        _reent = 1;
    }

    constructor() {
        owner = msg.sender;
    }

    // ----- Game state -----
    struct Game {
        address player;
        bool active;
        uint8 steps;
        uint8 currentRank; // 0..12 (2..A), 255 = unset
        uint8[13] counts;
        uint256 bet;
        uint256 seedBlock;
        bytes32 seed;
        uint256 multFP;
    }

    uint256 public nextGameId = 1;
    mapping(uint256 => Game) public games;
    mapping(address => uint256[]) public gamesOfPlayer;
    mapping(address => uint256) public pending;

    // ----- Events -----
    event GameStarted(
        uint256 indexed gameId,
        address indexed player,
        uint256 seedBlock
    );
    event SeedReady(uint256 indexed gameId, uint8 firstRank);
    event Step(
        uint256 indexed gameId,
        uint8 prevRank,
        uint8 guess,
        uint8 nextRank,
        bool win,
        uint8 steps,
        uint256 multFP
    );
    event Busted(uint8 nextRank);
    event CashedOut(uint256 indexed gameId, uint8 steps, uint256 payout);
    event HouseDeposit(address indexed from, uint256 amount);
    event HouseWithdraw(address indexed to, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);

    // ===== Public flow =====

    function enterGame() external payable returns (uint256 gameId) {
        require(msg.value == ENTRY_FEE_WEI, "bet is 1 token");

        gameId = nextGameId++;
        Game storage g = games[gameId];
        g.player = msg.sender;
        g.active = true;
        g.steps = 0;
        g.currentRank = 255;
        for (uint8 i = 0; i < 13; i++) g.counts[i] = 4;
        g.bet = msg.value;
        g.seedBlock = block.number + 20;
        g.multFP = MULT_SCALE;

        gamesOfPlayer[msg.sender].push(gameId);
        houseBalance += msg.value;

        emit GameStarted(gameId, msg.sender, g.seedBlock);
    }

    /// Draw the first face‑up card once seed ready.
    function prime(uint256 gameId) external {
        Game storage g = games[gameId];
        require(g.player == msg.sender, "not your game");
        require(g.active, "settled");
        _ensureSeedAndPrime(g, gameId);
    }

    /// Reveal next with compare‑space (Ace low).
    function revealNext(uint256 gameId, uint8 guess) external {
        require(guess <= 1, "bad guess");
        Game storage g = games[gameId];
        require(g.player == msg.sender, "not your game");
        require(g.active, "not active");

        _ensureSeedAndPrime(g, gameId);

        uint8 prevR = g.currentRank;
        uint8 prevC = _cmp(prevR);

        (uint16 totalRem, uint16 fav) = _remainingTotals(
            g,
            prevR,
            prevC,
            guess
        );
        if (fav == 0) {
            uint8 nr = _drawNextRank(g, gameId);
            g.active = false;
            emit Step(gameId, prevR, guess, nr, false, g.steps, g.multFP);
            emit Busted(nr);
            return;
        }

        uint256 stepFP = (uint256(totalRem) * MULT_SCALE) / uint256(fav);
        uint8 nr = _drawNextRank(g, gameId);
        uint8 nc = _cmp(nr);

        bool win = guess == 1 ? (nc > prevC) : (nc < prevC);

        if (win) {
            unchecked {
                g.multFP = (g.multFP * stepFP) / MULT_SCALE;
            }
            g.steps++;
            g.currentRank = nr;
            emit Step(gameId, prevR, guess, nr, true, g.steps, g.multFP);

            (uint16 t2, ) = _remainingTotals(g, nr, nc, 0);
            if (t2 == 0) _cashOut(gameId, g);
        } else {
            g.active = false;
            emit Step(gameId, prevR, guess, nr, false, g.steps, g.multFP);
            emit Busted(nr);
        }
    }

    function cashOut(uint256 gameId) external {
        Game storage g = games[gameId];
        require(g.player == msg.sender, "not your game");
        require(g.active, "not active");
        require(g.steps > 0, "no steps");
        _ensureSeedAndPrime(g, gameId);
        _cashOut(gameId, g);
    }

    function rescheduleSeed(uint256 gameId) external {
        Game storage g = games[gameId];
        require(msg.sender == g.player || msg.sender == owner, "no auth");
        require(g.active, "settled");
        require(block.number > g.seedBlock, "wait seed");
        require(g.seed == bytes32(0), "seed present");
        require(blockhash(g.seedBlock) == bytes32(0), "seed available");
        g.seedBlock = block.number + 20;
    }

    // ===== Withdraw / treasury =====

    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0 && pending[msg.sender] >= amount, "insufficient");
        pending[msg.sender] -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "xfer failed");
        emit Withdrawal(msg.sender, amount);
    }

    function withdrawAll() external nonReentrant {
        uint256 amt = pending[msg.sender];
        require(amt > 0, "zero");
        pending[msg.sender] = 0;
        (bool ok, ) = msg.sender.call{value: amt}("");
        require(ok, "xfer failed");
        emit Withdrawal(msg.sender, amt);
    }

    function depositHouse() external payable onlyOwner {
        require(msg.value > 0, "zero");
        houseBalance += msg.value;
        emit HouseDeposit(msg.sender, msg.value);
    }

    function withdrawHouse(uint256 amount) external onlyOwner {
        require(amount <= houseBalance, "exceeds house");
        houseBalance -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "xfer failed");
        emit HouseWithdraw(msg.sender, amount);
    }

    // ===== Views =====

    function getGame(
        uint256 gameId
    )
        external
        view
        returns (
            address player,
            bool active,
            uint256 bet,
            uint256 seedBlock,
            int8 currentRank,
            uint8 steps,
            uint256 multFP,
            bytes32 seed
        )
    {
        Game storage g = games[gameId];
        int8 cr = g.currentRank == 255 ? int8(-1) : int8(uint8(g.currentRank));
        return (
            g.player,
            g.active,
            g.bet,
            g.seedBlock,
            cr,
            g.steps,
            g.multFP,
            g.seed
        );
    }

    function gamesOf(address p) external view returns (uint256[] memory) {
        return gamesOfPlayer[p];
    }

    // ===== Internals =====

    function _cashOut(uint256 gameId, Game storage g) internal {
        uint256 m = (g.multFP * (10_000 - HOUSE_EDGE_BPS)) / 10_000;
        if (m > MAX_PAYOUT_X) m = MAX_PAYOUT_X;
        uint256 payout = (g.bet * m) / MULT_SCALE;
        require(houseBalance >= payout, "insolvent");
        houseBalance -= payout;
        pending[g.player] += payout;
        g.active = false;
        emit CashedOut(gameId, g.steps, payout);
    }

    function _ensureSeedAndPrime(Game storage g, uint256 gameId) internal {
        if (g.seed != bytes32(0)) {
            if (g.currentRank == 255) _primeFirstCard(g, gameId);
            return;
        }
        require(block.number > g.seedBlock, "wait seed");
        bytes32 b1 = blockhash(g.seedBlock);
        require(b1 != bytes32(0), "seed expired");
        bytes32 b2 = keccak256(abi.encodePacked(block.prevrandao));
        g.seed = keccak256(abi.encodePacked(gameId, g.player, b1, b2));
        _primeFirstCard(g, gameId);
        emit SeedReady(gameId, g.currentRank);
    }

    function _primeFirstCard(Game storage g, uint256 gameId) internal {
        uint8 first = _drawNextRank(g, gameId);
        g.currentRank = first;
    }

    // Ace-low mapping: 12→0, 0→1, …, 11→12
    function _cmp(uint8 r) internal pure returns (uint8) {
        return (r + 1) % 13;
    }

    function _remainingTotals(
        Game storage g,
        uint8 prevR,
        uint8 prevC,
        uint8 guess
    ) internal view returns (uint16 total, uint16 fav) {
        uint16 t;
        uint16 f;
        for (uint8 r = 0; r < 13; r++) {
            uint8 c = g.counts[r];
            t += c;
            uint8 rc = _cmp(r);
            if (guess == 1) {
                if (rc > prevC) f += c;
            } else {
                if (rc < prevC) f += c;
            }
        }
        return (t, f);
    }

    function _drawNextRank(
        Game storage g,
        uint256 gameId
    ) internal returns (uint8) {
        uint16 total;
        for (uint8 r = 0; r < 13; r++) total += g.counts[r];
        require(total > 0, "deck empty");

        uint16 drawn = 52 - total;
        uint256 rnd = uint256(keccak256(abi.encode(g.seed, gameId, drawn)));
        uint256 pick = rnd % total;

        uint16 acc;
        for (uint8 r = 0; r < 13; r++) {
            uint8 c = g.counts[r];
            if (c == 0) continue;
            acc += c;
            if (pick < acc) {
                g.counts[r] = c - 1;
                return r;
            }
        }
        revert("draw fail");
    }

    receive() external payable {
        houseBalance += msg.value;
        emit HouseDeposit(msg.sender, msg.value);
    }
}
