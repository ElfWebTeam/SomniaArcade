// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * SomniaMines — on-chain Mines (5x5)
 * - Fixed bet: 1 token (18 decimals)
 * - Bombs per game: 1..10
 * - Each tile reveal requires a tx (no client-side cheating)
 * - Randomness: future blockhash + prevrandao (derived once per game)
 * - House bankroll: contract holds entry fees + owner deposits; payouts debit houseBalance
 * - Economics: ~1% edge, 10x cap
 */

contract SomniaMines {
    // ----- Config -----
    uint8 public constant GRID_SIZE = 5; // 5x5
    uint8 public constant GRID_TILES = 25;
    uint8 public constant MIN_BOMBS = 1;
    uint8 public constant MAX_BOMBS = 10;
    uint256 public constant ENTRY_FEE_WEI = 1 ether; // 1 token @ 18 decimals
    uint16 public constant HOUSE_EDGE_BPS = 100; // 1%
    uint256 public constant MULT_SCALE = 1e9; // fixed-point
    uint256 public constant MAX_PAYOUT_X = 10 * MULT_SCALE;

    // ----- Ownership / treasury -----
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    uint256 public houseBalance; // funds available to pay winners

    // Reentrancy guard (for withdraws)
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
        uint8 bombs; // 1..10
        uint8 picks; // safe picks so far
        bool active; // true until cashOut or bust
        uint256 bet; // 1 ether
        uint256 seedBlock; // future block
        bytes32 seed; // set when derived
        uint32 bombsMask; // 25-bit mask (1 = bomb)
        uint32 revealedMask; // 25-bit mask (1 = revealed)
    }

    uint256 public nextGameId = 1;
    mapping(uint256 => Game) public games;
    mapping(address => uint256[]) public gamesOfPlayer;

    // Pull-payments
    mapping(address => uint256) public pending;

    // ----- Events -----
    event GameStarted(
        uint256 indexed gameId,
        address indexed player,
        uint8 bombs,
        uint256 seedBlock
    );
    event SeedReady(uint256 indexed gameId, bytes32 seed);
    event PickRevealed(
        uint256 indexed gameId,
        uint8 index,
        bool bomb,
        uint8 picks
    );
    event Busted(uint256 indexed gameId, uint8 index);
    event CashedOut(uint256 indexed gameId, uint8 picks, uint256 payout);
    event HouseDeposit(address indexed from, uint256 amount);
    event HouseWithdraw(address indexed to, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);

    // ===== Public game flow =====

    /// Start a new game. Pays 1 token to the house bankroll and schedules future RNG.
    function enterGame(uint8 bombs) external payable returns (uint256 gameId) {
        require(bombs >= MIN_BOMBS && bombs <= MAX_BOMBS, "bombs range");
        require(msg.value == ENTRY_FEE_WEI, "bet is 1 token");

        gameId = nextGameId++;
        Game storage g = games[gameId];
        g.player = msg.sender;
        g.bombs = bombs;
        g.picks = 0;
        g.active = true;
        g.bet = msg.value;
        g.seedBlock = block.number + 20;

        gamesOfPlayer[msg.sender].push(gameId);
        houseBalance += msg.value; // losses accrue unless player cashes out

        emit GameStarted(gameId, msg.sender, bombs, g.seedBlock);
    }

    /// Reveal a single tile (index 0..24). Requires seed ready. Each call updates state on-chain.
    function revealPick(uint256 gameId, uint8 index) external {
        Game storage g = games[gameId];
        require(g.player == msg.sender, "not your game");
        require(g.active, "not active");
        require(index < GRID_TILES, "bad index");

        _ensureSeed(gameId, g);

        uint32 bit = uint32(1) << index;
        require((g.revealedMask & bit) == 0, "already revealed");
        g.revealedMask |= bit;

        // Bomb?
        if ((g.bombsMask & bit) != 0) {
            g.active = false; // bust: house keeps stake
            emit PickRevealed(gameId, index, true, g.picks);
            emit Busted(gameId, index);
            return;
        }

        // Safe
        g.picks += 1;
        emit PickRevealed(gameId, index, false, g.picks);

        // If cleared all safe tiles, auto cash-out
        if (g.picks >= (GRID_TILES - g.bombs)) {
            _cashOut(gameId, g);
        }
    }

    /// Cash out current game based on safe picks so far.
    function cashOut(uint256 gameId) external {
        Game storage g = games[gameId];
        require(g.player == msg.sender, "not your game");
        require(g.active, "not active");
        require(g.picks > 0, "no picks");
        _ensureSeed(gameId, g);
        _cashOut(gameId, g);
    }

    /// If the seed block is too old (blockhash not available), reschedule to a future block.
    function rescheduleSeed(uint256 gameId) external {
        Game storage g = games[gameId];
        require(g.player == msg.sender || msg.sender == owner, "no auth");
        require(g.active, "settled");
        if (block.number <= g.seedBlock) revert("wait seed");
        if (g.seed != bytes32(0)) revert("seed present");
        bytes32 bh = blockhash(g.seedBlock);
        require(bh == bytes32(0), "seed available");
        g.seedBlock = block.number + 20;
        // No event: next _ensureSeed will emit SeedReady
    }

    // ===== Withdrawals / treasury =====

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

    function quoteMultiplier(
        uint8 bombs,
        uint8 picks
    ) external pure returns (uint256) {
        require(bombs >= MIN_BOMBS && bombs <= MAX_BOMBS, "bombs");
        require(picks > 0 && picks <= GRID_TILES - bombs, "picks");
        return _multiplierFP(bombs, picks);
    }

    function getGame(
        uint256 gameId
    )
        external
        view
        returns (
            address player,
            uint8 bombs,
            uint8 picks,
            bool active,
            uint256 bet,
            uint256 seedBlock,
            bytes32 seed,
            uint32 bombsMask,
            uint32 revealedMask
        )
    {
        Game storage g = games[gameId];
        return (
            g.player,
            g.bombs,
            g.picks,
            g.active,
            g.bet,
            g.seedBlock,
            g.seed,
            g.bombsMask,
            g.revealedMask
        );
    }

    function gamesOf(address p) external view returns (uint256[] memory) {
        return gamesOfPlayer[p];
    }

    // ===== Internals =====

    function _cashOut(uint256 gameId, Game storage g) internal {
        uint256 m = _multiplierFP(g.bombs, g.picks); // 1e9 scale
        uint256 payout = (g.bet * m) / MULT_SCALE;
        require(payout <= (g.bet * MAX_PAYOUT_X) / MULT_SCALE, "cap"); // redundant guard
        require(houseBalance >= payout, "insolvent");

        houseBalance -= payout;
        pending[g.player] += payout;
        g.active = false;

        emit CashedOut(gameId, g.picks, payout);
    }

    function _ensureSeed(uint256 gameId, Game storage g) internal {
        if (g.seed != bytes32(0)) return;
        require(block.number > g.seedBlock, "wait seed");
        bytes32 r1 = blockhash(g.seedBlock);
        require(r1 != bytes32(0), "seed expired"); // use rescheduleSeed
        bytes32 r2 = keccak256(abi.encodePacked(block.prevrandao));
        g.seed = keccak256(abi.encodePacked(gameId, g.player, g.bombs, r1, r2));
        g.bombsMask = _bombsMask(g.seed, g.bombs);
        emit SeedReady(gameId, g.seed);
    }

    // Build a 25-bit mask with `bombs` bits set (Fisher–Yates over 0..24)
    function _bombsMask(
        bytes32 seed,
        uint8 bombs
    ) internal pure returns (uint32 mask) {
        uint8[GRID_TILES] memory arr;
        for (uint8 i = 0; i < GRID_TILES; i++) arr[i] = i;

        for (uint8 i = GRID_TILES; i > 1; i--) {
            uint256 j = uint256(keccak256(abi.encode(seed, i))) % i;
            uint8 tmp = arr[i - 1];
            arr[i - 1] = arr[j];
            arr[j] = tmp;
        }
        for (uint8 k = 0; k < bombs; k++) {
            mask |= uint32(1) << arr[k];
        }
    }

    // Multiplier in 1e9 fixed-point:
    // m = Π_{i=0..k-1} ( (25 - i) / (25 - bombs - i) ) * (1 - edge); then capped to 10x
    function _multiplierFP(
        uint8 bombs,
        uint8 k
    ) internal pure returns (uint256 m) {
        m = MULT_SCALE;
        unchecked {
            for (uint8 i = 0; i < k; i++) {
                uint256 num = (GRID_TILES - i);
                uint256 den = (GRID_TILES - bombs - i);
                m = (m * num) / den;
            }
        }
        m = (m * (10_000 - HOUSE_EDGE_BPS)) / 10_000;
        if (m > MAX_PAYOUT_X) m = MAX_PAYOUT_X;
    }

    // Accept direct deposits as house top-ups
    receive() external payable {
        houseBalance += msg.value;
        emit HouseDeposit(msg.sender, msg.value);
    }
}
