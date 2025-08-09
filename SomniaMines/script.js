const CHAIN = {
    chainId: '0xC488',
    chainName: 'Somnia Testnet',
    nativeCurrency: {
        name: 'Somnia Test Token',
        symbol: 'STT',
        decimals: 18
    },
    rpcUrls: ['https://rpc.ankr.com/somnia_testnet'],
    blockExplorerUrls: ['https://shannon-explorer.somnia.network']
};
const ENTRY_AMOUNT = 1;
const TOKEN = CHAIN.nativeCurrency.symbol;
const HOUSE_EDGE = 0.01;
const MAX_PAYOUT_X = 10;

const CONTRACT_ADDRESS = '0x6b7FA09D6e4798965f644E32bD3bC0fe70acDE4B';
const CONTRACT_ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "index", "type": "uint8" } ], "name": "Busted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "picks", "type": "uint8" }, { "indexed": false, "internalType": "uint256", "name": "payout", "type": "uint256" } ], "name": "CashedOut", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "gameId", "type": "uint256" }], "name": "cashOut", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "depositHouse", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "bombs", "type": "uint8" }], "name": "enterGame", "outputs": [{ "internalType": "uint256", "name": "gameId", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "player", "type": "address" }, { "indexed": false, "internalType": "uint8", "name": "bombs", "type": "uint8" }, { "indexed": false, "internalType": "uint256", "name": "seedBlock", "type": "uint256" } ], "name": "GameStarted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "HouseDeposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "HouseWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256" }, { "indexed": false, "internalType": "uint8", "name": "index", "type": "uint8" }, { "indexed": false, "internalType": "bool", "name": "bomb", "type": "bool" }, { "indexed": false, "internalType": "uint8", "name": "picks", "type": "uint8" } ], "name": "PickRevealed", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "gameId", "type": "uint256" }], "name": "rescheduleSeed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "gameId", "type": "uint256" }, { "internalType": "uint8", "name": "index", "type": "uint8" } ], "name": "revealPick", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256" }, { "indexed": false, "internalType": "bytes32", "name": "seed", "type": "bytes32" } ], "name": "SeedReady", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdrawal", "type": "event" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawHouse", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [], "name": "ENTRY_FEE_WEI", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "games", "outputs": [{ "internalType": "address", "name": "player", "type": "address" }, { "internalType": "uint8", "name": "bombs", "type": "uint8" }, { "internalType": "uint8", "name": "picks", "type": "uint8" }, { "internalType": "bool", "name": "active", "type": "bool" }, { "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seedBlock", "type": "uint256" }, { "internalType": "bytes32", "name": "seed", "type": "bytes32" }, { "internalType": "uint32", "name": "bombsMask", "type": "uint32" }, { "internalType": "uint32", "name": "revealedMask", "type": "uint32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "p", "type": "address" }], "name": "gamesOf", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "gamesOfPlayer", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "gameId", "type": "uint256" }], "name": "getGame", "outputs": [{ "internalType": "address", "name": "player", "type": "address" }, { "internalType": "uint8", "name": "bombs", "type": "uint8" }, { "internalType": "uint8", "name": "picks", "type": "uint8" }, { "internalType": "bool", "name": "active", "type": "bool" }, { "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seedBlock", "type": "uint256" }, { "internalType": "bytes32", "name": "seed", "type": "bytes32" }, { "internalType": "uint32", "name": "bombsMask", "type": "uint32" }, { "internalType": "uint32", "name": "revealedMask", "type": "uint32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GRID_SIZE", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "GRID_TILES", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "HOUSE_EDGE_BPS", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "houseBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_BOMBS", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAX_PAYOUT_X", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MIN_BOMBS", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MULT_SCALE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nextGameId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pending", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "bombs", "type": "uint8" }, { "internalType": "uint8", "name": "picks", "type": "uint8" } ], "name": "quoteMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" } ];

(() => {
    if (typeof window.ethers === 'undefined') {
        console.error('Ethers not loaded');
        return;
    }

    const $ = (id) => document.getElementById(id);
    const boardEl = $('board'),
        multEl = $('mult'),
        payoutEl = $('payout');
    const startBtn = $('startBtn'),
        cashoutBtn = $('cashoutBtn');
    const statusEl = $('status'),
        safeCountEl = $('safeCount'),
        safeTotalEl = $('safeTotal');
    const bombsRange = $('bombs'),
        bombsVal = $('bombsVal');
    const tableEl = $('table'),
        overlay = $('overlay'),
        overlayTitle = $('overlayTitle'),
        overlayText = $('overlayText');
    const revealAllBtn = $('revealAll'),
        newRoundBtn = $('newRound');
    const connectBtn = $('connectBtn'),
        walletInfo = $('walletInfo'),
        addrShort = $('addrShort');
    const walletBalanceEl = $('walletBalance'),
        netDot = $('netDot'),
        gateMsg = $('gateMsg'),
        seedInfo = $('seedInfo');
    const betLabel = $('betLabel'),
        pendingBalEl = $('pendingBal'),
        withdrawAllBtn = $('withdrawAllBtn');
    const blocker = $('blocker'),
        blockerText = $('blockerText'),
        noticeEl = $('notice');

    if (betLabel) betLabel.textContent = `${ENTRY_AMOUNT} ${TOKEN}`;

    const GRID = 5,
        TILES = 25;
    let bombs = +bombsRange.value,
        picksMade = 0,
        currentMultiplier = 1,
        gameActive = false;

    let provider = null,
        signer = null,
        account = null,
        chainOk = false,
        contract = null;
    let walletBalanceWei = 0n;
    let gameId = null,
        seedBlock = null,
        pollTimer = null;

    buildBoard();
    renderPreview();
    refreshTotals();
    updateHUD();
    gateCheck();

    bombsRange.addEventListener('input', () => {
        bombs = +bombsRange.value;
        bombsVal.textContent = bombs;
        refreshTotals();
        renderPreview();
    });
    startBtn.addEventListener('click', startOnChain);
    cashoutBtn.addEventListener('click', doCashOut);
    revealAllBtn.addEventListener('click', revealAllAfterFinish);
    newRoundBtn.addEventListener('click', resetForNewRound);
    withdrawAllBtn.addEventListener('click', withdrawAll);
    connectBtn.addEventListener('click', connectFlow);

    async function connectFlow() {
        try {
            await connectWallet();
            await ensureChain();
            await initContract();
            await refreshWalletBalance();
            toggleWalletUI(true);
            gateCheck();
            refreshPending();
        } catch (e) {
            notify(cleanErr(e), 'error');
        }
    }
    async function connectWallet() {
        if (!window.ethereum) throw new Error('No wallet found.');
        provider = new ethers.BrowserProvider(window.ethereum, 'any');
        const accounts = await provider.send('eth_requestAccounts', []);
        account = ethers.getAddress(accounts[0]);
        signer = await provider.getSigner();
        window.ethereum.on?.('accountsChanged', onAccChanged);
        window.ethereum.on?.('chainChanged', onChainChanged);
    }
    async function ensureChain() {
        const net = await provider.getNetwork();
        chainOk = ('0x' + net.chainId.toString(16)).toLowerCase() === CHAIN.chainId.toLowerCase();
        if (!chainOk) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                        chainId: CHAIN.chainId
                    }]
                });
                chainOk = true;
            } catch (e) {
                if (e.code === 4902 || (e.message || '').includes('Unrecognized')) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [CHAIN]
                    });
                    chainOk = true;
                } else {
                    throw e;
                }
            }
        }
        netDot.className = 'dot ' + (chainOk ? 'ok' : 'bad');
    }
    async function initContract() {
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }
    async function refreshWalletBalance() {
        if (!provider || !account) return;
        walletBalanceWei = await provider.getBalance(account);
        walletBalanceEl.textContent = `${Number(ethers.formatEther(walletBalanceWei)).toFixed(4)} ${TOKEN}`;
    }

    function toggleWalletUI(connected) {
        if (!connected) {
            walletInfo.classList.add('hidden');
            connectBtn.classList.remove('hidden');
            return;
        }
        addrShort.textContent = shortAddr(account);
        walletInfo.classList.remove('hidden');
        connectBtn.classList.add('hidden');
    }

    function onAccChanged(accs) {
        if (!accs || accs.length === 0) return resetWallet();
        account = ethers.getAddress(accs[0]);
        addrShort.textContent = shortAddr(account);
        refreshWalletBalance().then(gateCheck).then(refreshPending);
    }

    function onChainChanged() {
        ensureChain().then(refreshWalletBalance).then(gateCheck).then(refreshPending);
    }

    function resetWallet() {
        provider = signer = null;
        account = null;
        chainOk = false;
        contract = null;
        walletBalanceWei = 0n;
        toggleWalletUI(false);
        walletBalanceEl.textContent = `0.0000 ${TOKEN}`;
        gateCheck();
    }

    function gateCheck() {
        const connectedOk = !!account && chainOk;
        const hasEntry = walletBalanceWei >= ethers.parseEther(String(ENTRY_AMOUNT));
        startBtn.disabled = !(connectedOk && hasEntry && !gameActive);
        cashoutBtn.disabled = !(connectedOk && gameActive && picksMade > 0);
        withdrawAllBtn.disabled = !connectedOk;
    }
    setInterval(() => {
        if (account && provider) {
            refreshWalletBalance();
            refreshPending();
        }
    }, 15000);

    function buildBoard() {
        boardEl.innerHTML = '';
        for (let i = 0; i < TILES; i++) {
            const tile = document.createElement('button');
            tile.className = 'tile';
            tile.dataset.idx = i;
            const flip = document.createElement('div');
            flip.className = 'flip';
            const front = document.createElement('div');
            front.className = 'front';
            const idx = document.createElement('div');
            idx.className = 'index';
            idx.textContent = i + 1;
            front.appendChild(idx);
            const back = document.createElement('div');
            back.className = 'back';
            flip.appendChild(front);
            flip.appendChild(back);
            tile.appendChild(flip);
            tile.addEventListener('click', () => onTileClick(i, tile));
            boardEl.appendChild(tile);
        }
    }

    function resetForNewRound() {
        overlay.classList.add('hidden');
        unblock();
        clearInterval(pollTimer);
        pollTimer = null;
        for (const tile of boardEl.children) {
            tile.className = 'tile';
            const back = tile.querySelector('.back');
            back.className = 'back';
            back.innerHTML = '';
            tile.disabled = false;
            tile.style.outline = '';
        }
        picksMade = 0;
        currentMultiplier = 1;
        gameId = null;
        seedBlock = null;
        gameActive = false;
        bombsRange.disabled = false;
        startBtn.disabled = false;
        cashoutBtn.disabled = true;
        statusEl.textContent = 'Idle';
        statusEl.className = 'status idle';
        seedInfo.textContent = '';
        refreshTotals();
        updateHUD();
        gateCheck();
    }

    function block(msg) {
        blockerText.textContent = msg || 'Processing…';
        blocker.classList.remove('hidden');
    }

    function unblock() {
        blocker.classList.add('hidden');
        gateCheck();
    }
    let noticeTimer = null;

    function notify(msg, type = 'info', ms = 4000) {
        if (!noticeEl) return;
        noticeEl.textContent = msg;
        noticeEl.className = `notice ${type} show`;
        if (noticeTimer) clearTimeout(noticeTimer);
        if (ms > 0) noticeTimer = setTimeout(() => {
            noticeEl.classList.remove('show');
        }, ms);
    }

    async function startOnChain() {
        try {
            if (!contract) await connectFlow();
            const need = ethers.parseEther(String(ENTRY_AMOUNT));
            if (walletBalanceWei < need) {
                notify(`Insufficient balance: need ${ENTRY_AMOUNT} ${TOKEN}`, 'warn');
                return;
            }

            block('Starting… confirm in wallet');
            statusEl.textContent = 'Committing…';
            statusEl.className = 'status live';
            startBtn.disabled = true;
            bombsRange.disabled = true;
            cashoutBtn.disabled = true;

            const tx = await contract.enterGame(bombs, {
                value: need
            });
            block('Starting… waiting for confirmation');
            const rcpt = await tx.wait();

            let ev = null;
            for (const lg of rcpt.logs) {
                try {
                    const p = contract.interface.parseLog(lg);
                    if (p.name === 'GameStarted') {
                        ev = p;
                        break;
                    }
                } catch (_) {}
            }
            if (!ev) throw new Error('GameStarted event not found');
            gameId = Number(ev.args[0]);
            seedBlock = Number(ev.args[3]);

            gameActive = true;
            picksMade = 0;
            currentMultiplier = 1;
            statusEl.textContent = `Committed (game #${gameId})`;
            seedInfo.textContent = `Seed block = ${seedBlock}.`;

            await waitForSeedReady();
        } catch (e) {
            notify(cleanErr(e), 'error', 6000);
            unblock();
            resetForNewRound();
        }
    }

    async function waitForSeedReady() {
        const poll = async () => {
            const now = await provider.getBlockNumber();
            if (now > seedBlock) {
                seedInfo.textContent = `Seed ready (block ${seedBlock}). Click tiles to reveal.`;
                notify('Seed ready — click tiles to reveal.', 'success', 3000);
                enableBoard(true);
                unblock();
                clearInterval(pollTimer);
                pollTimer = null;
            } else {
                const remain = Math.max(0, seedBlock - now);
                block(`Starting… waiting for randomness (~${remain} blocks).`);
                enableBoard(false);
            }
        };
        await poll();
        pollTimer = setInterval(poll, 3000);
    }

    function enableBoard(on) {
        for (const t of boardEl.children) {
            t.disabled = !on || t.classList.contains('revealed');
        }
    }

    async function onTileClick(index, tileEl) {
        try {
            if (!gameActive || tileEl.classList.contains('revealed')) return;

            const now = await provider.getBlockNumber();
            if (now <= seedBlock) {
                block('Starting… waiting for randomness.');
                return;
            }

            block('Revealing… confirm in wallet');
            enableBoard(false);
            const tx = await contract.revealPick(gameId, index);
            block('Revealing… waiting for confirmation');
            const rcpt = await tx.wait();

            let isBomb = false,
                picks = 0,
                autoCashed = false,
                payout = 0;
            for (const lg of rcpt.logs) {
                try {
                    const parsed = contract.interface.parseLog(lg);
                    if (parsed.name === 'PickRevealed') {
                        const idx = Number(parsed.args[1]);
                        const bomb = Boolean(parsed.args[2]);
                        const pk = Number(parsed.args[3]);
                        if (idx === index) {
                            isBomb = bomb;
                            picks = pk;
                        }
                    } else if (parsed.name === 'Busted') {
                        isBomb = true;
                    } else if (parsed.name === 'CashedOut') {
                        autoCashed = true;
                        picks = Number(parsed.args[1]);
                        payout = Number(ethers.formatEther(parsed.args[2]));
                    }
                } catch (_) {}
            }

            tileEl.classList.add('revealed');
            const back = tileEl.querySelector('.back');
            if (isBomb) {
                back.classList.add('bomb');
                back.innerHTML = '<span class="emoji">💣</span>';
                statusEl.textContent = 'Lost';
                statusEl.className = 'status dead';
                gameActive = false;
                cashoutBtn.disabled = true;
                overlayTitle.textContent = 'Boom 💥';
                overlayText.textContent = 'You hit a bomb.';
                overlay.classList.remove('hidden');
                await revealAllAfterFinish();
                unblock();
            } else {
                back.classList.add('safe');
                back.innerHTML = '<span class="emoji">💎</span>';
                picksMade = picks;
                currentMultiplier = payoutMultiplier(picksMade, bombs);
                statusEl.textContent = `Safe picks: ${picksMade}`;
                statusEl.className = 'status live';
                cashoutBtn.disabled = (picksMade === 0);
                if (autoCashed) {
                    statusEl.textContent = 'Won';
                    statusEl.className = 'status won';
                    overlayTitle.textContent = 'You cleared the board';
                    overlayText.textContent = `Credited ${payout.toFixed(4)} ${TOKEN} to your contract balance. Use “Withdraw to wallet”.`;
                    overlay.classList.remove('hidden');
                    gameActive = false;
                    cashoutBtn.disabled = true;
                    await revealAllAfterFinish();
                    await refreshPending();
                    unblock();
                } else {
                    enableBoard(true);
                    unblock();
                }
            }

            updateHUD();
        } catch (e) {
            notify(cleanErr(e), 'error', 6000);
            enableBoard(true);
            unblock();
        }
    }

    async function doCashOut() {
        try {
            if (!gameActive || picksMade === 0) return;
            block('Cash out… confirm in wallet');
            enableBoard(false);
            const tx = await contract.cashOut(gameId);
            block('Cash out… waiting for confirmation');
            const rcpt = await tx.wait();

            let payout = 0;
            for (const lg of rcpt.logs) {
                try {
                    const p = contract.interface.parseLog(lg);
                    if (p.name === 'CashedOut') {
                        payout = Number(ethers.formatEther(p.args[2]));
                        break;
                    }
                } catch (_) {}
            }
            statusEl.textContent = 'Won';
            statusEl.className = 'status won';
            overlayTitle.textContent = 'You cashed out';
            overlayText.textContent = `Credited ${payout.toFixed(4)} ${TOKEN} to your contract balance. Click “Withdraw to wallet”.`;
            overlay.classList.remove('hidden');
            gameActive = false;
            cashoutBtn.disabled = true;
            await revealAllAfterFinish();
            await refreshPending();
            unblock();
        } catch (e) {
            notify(cleanErr(e), 'error', 6000);
            enableBoard(true);
            unblock();
        }
    }

    async function refreshPending() {
        try {
            if (!contract || !account) return;
            const amt = await contract.pending(account);
            const n = Number(ethers.formatEther(amt));
            pendingBalEl.textContent = `${n.toFixed(4)} ${TOKEN}`;
            withdrawAllBtn.disabled = (n <= 0);
        } catch (_) {}
    }
    async function withdrawAll() {
        try {
            block('Withdrawing… confirm in wallet');
            const tx = await contract.withdrawAll();
            block('Withdrawing… waiting for confirmation');
            await tx.wait();
            await refreshPending();
            await refreshWalletBalance();
            unblock();
            notify('Withdraw complete.', 'success', 3000);
        } catch (e) {
            unblock();
            notify(cleanErr(e), 'error', 6000);
        }
    }

    async function revealAllAfterFinish() {
        try {
            if (!contract || gameId === null) return;
            const g = await contract.getGame(gameId);
            const bombsMask = Number(g[7]);
            for (let i = 0; i < TILES; i++) {
                const tile = boardEl.children[i];
                const back = tile.querySelector('.back');
                const isBomb = (bombsMask & (1 << i)) !== 0;
                tile.classList.add('revealed');
                if (isBomb) {
                    back.classList.add('bomb');
                    back.innerHTML = '<span class="emoji">💣</span>';
                } else {
                    back.classList.add('safe');
                    back.innerHTML = '<span class="emoji">💎</span>';
                }
                tile.disabled = true;
            }
        } catch (_) {}
    }

    function refreshTotals() {
        $('safeTotal').textContent = String(TILES - bombs);
    }

    function updateHUD() {
        multEl.textContent = currentMultiplier.toFixed(2) + '×';
        payoutEl.textContent = (clamp(ENTRY_AMOUNT * currentMultiplier, 0, ENTRY_AMOUNT * MAX_PAYOUT_X)).toFixed(2) + ` ${TOKEN}`;
        $('safeCount').textContent = String(picksMade);
        gateCheck();
    }

    function renderPreview() {
        tableEl.innerHTML = '';
        for (let k = 1; k <= 9; k++) {
            const m = payoutMultiplier(k, +bombsRange.value);
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerHTML = `<div class="k">${k} safe</div><div><strong>${m.toFixed(2)}×</strong></div>`;
            tableEl.appendChild(cell);
        }
    }

    function payoutMultiplier(k, B) {
        let fair = 1;
        for (let i = 0; i < k; i++) fair *= ((25 - i) / (25 - B - i));
        const withEdge = fair * (1 - HOUSE_EDGE);
        return Math.min(withEdge, MAX_PAYOUT_X);
    }

    function clamp(v, lo, hi) {
        return Math.max(lo, Math.min(hi, v));
    }

    function shortAddr(a) {
        return a ? a.slice(0, 6) + '…' + a.slice(-4) : '—';
    }

    function cleanErr(err) {
        return (err && (err.data?.message || err.message)) || String(err);
    }
})();