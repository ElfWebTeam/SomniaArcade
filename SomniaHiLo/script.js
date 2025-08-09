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
const MAX_PAYOUT_X = 20;

const CONTRACT_ADDRESS = '0x9F3cC2f1E66B0dd77Ad278eCb1C49C2d6Ef24CED';
const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"nextRank","type":"uint8"}],"name":"Busted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"steps","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"payout","type":"uint256"}],"name":"CashedOut","type":"event"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"cashOut","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositHouse","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"enterGame","outputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":true,"internalType":"address","name":"player","type":"address"},{"indexed":false,"internalType":"uint256","name":"seedBlock","type":"uint256"}],"name":"GameStarted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HouseDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"HouseWithdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"prime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"rescheduleSeed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"},{"internalType":"uint8","name":"guess","type":"uint8"}],"name":"revealNext","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"firstRank","type":"uint8"}],"name":"SeedReady","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"gameId","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"prevRank","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"guess","type":"uint8"},{"indexed":false,"internalType":"uint8","name":"nextRank","type":"uint8"},{"indexed":false,"internalType":"bool","name":"win","type":"bool"},{"indexed":false,"internalType":"uint8","name":"steps","type":"uint8"},{"indexed":false,"internalType":"uint256","name":"multFP","type":"uint256"}],"name":"Step","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawHouse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[],"name":"ENTRY_FEE_WEI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"games","outputs":[{"internalType":"address","name":"player","type":"address"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"uint8","name":"steps","type":"uint8"},{"internalType":"uint8","name":"currentRank","type":"uint8"},{"internalType":"uint256","name":"bet","type":"uint256"},{"internalType":"uint256","name":"seedBlock","type":"uint256"},{"internalType":"bytes32","name":"seed","type":"bytes32"},{"internalType":"uint256","name":"multFP","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"p","type":"address"}],"name":"gamesOf","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"gamesOfPlayer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"gameId","type":"uint256"}],"name":"getGame","outputs":[{"internalType":"address","name":"player","type":"address"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"uint256","name":"bet","type":"uint256"},{"internalType":"uint256","name":"seedBlock","type":"uint256"},{"internalType":"int8","name":"currentRank","type":"int8"},{"internalType":"uint8","name":"steps","type":"uint8"},{"internalType":"uint256","name":"multFP","type":"uint256"},{"internalType":"bytes32","name":"seed","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HOUSE_EDGE_BPS","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"houseBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_PAYOUT_X","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MULT_SCALE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextGameId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pending","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

(() => {
    if (typeof window.ethers === 'undefined') {
        console.error('Ethers not loaded');
        return;
    }

    const $ = (id) => document.getElementById(id);
    const multEl = $('mult'),
        payoutEl = $('payout'),
        betLabel = $('betLabel');
    const startBtn = $('startBtn'),
        cashoutBtn = $('cashoutBtn');
    const lowerBtn = $('lowerBtn'),
        higherBtn = $('higherBtn');
    const statusEl = $('status'),
        seedInfo = $('seedInfo');
    const stepsWonEl = $('stepsWon'),
        pendingBalEl = $('pendingBal');
    const connectBtn = $('connectBtn'),
        walletInfo = $('walletInfo'),
        addrShort = $('addrShort');
    const walletBalanceEl = $('walletBalance'),
        netDot = $('netDot'),
        gateMsg = $('gateMsg');
    const blocker = $('blocker'),
        blockerText = $('blockerText');
    const cardImg = $('cardImg'),
        cardBack = $('cardBack');

    if (betLabel) betLabel.textContent = `${ENTRY_AMOUNT} ${TOKEN}`;

    let provider = null,
        signer = null,
        account = null,
        chainOk = false,
        contract = null;
    let walletBalanceWei = 0n;
    let gameId = null,
        seedBlock = null,
        pollTimer = null;
    let steps = 0,
        currentMultiplier = 1,
        gameActive = false;

    let seedIsReady = false;
    let primeRequested = false;
    let primeDone = false;

    const rankNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    const svgPath = (r) => `cards/${rankNames[r]}_of_spades.svg`;
    const pngPath = (r) => `cards/${rankNames[r]}_of_spades.png`;

    setCard(null);
    updateHUD();
    gateCheck();

    connectBtn.addEventListener('click', connectFlow);
    startBtn.addEventListener('click', startOnChain);
    cashoutBtn.addEventListener('click', doCashOut);
    lowerBtn.addEventListener('click', () => doGuess(0));
    higherBtn.addEventListener('click', () => doGuess(1));
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && account) {
            refreshWalletBalance();
            refreshPending();
        }
    });

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
            console.error(e);
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
        cashoutBtn.disabled = !(connectedOk && gameActive && steps > 0);
        lowerBtn.disabled = !(connectedOk && gameActive);
        higherBtn.disabled = !(connectedOk && gameActive);
        gateMsg.textContent = connectedOk ? 'Ready.' : `Connect Somnia Testnet and have ≥ ${ENTRY_AMOUNT} ${TOKEN}.`;
    }
    setInterval(() => {
        if (account && provider) {
            refreshWalletBalance();
            refreshPending();
        }
    }, 15000);

    function block(msg) {
        blockerText.textContent = msg || 'Processing…';
        blocker.classList.remove('hidden');
    }

    function unblock() {
        blocker.classList.add('hidden');
        gateCheck();
    }

    function setCard(rankOrNull) {
        console.log('[setCard] rank =', rankOrNull);
        if (rankOrNull === null || rankOrNull < 0) {
            cardImg.style.display = 'none';
            cardBack.style.display = 'block';
            cardBack.textContent = 'Waiting for start…';
            return;
        }
        const r = rankOrNull;
        const tryPng = () => {
            cardImg.onerror = () => {
                console.error('[img] png missing', pngPath(r), '→ text fallback');
                cardBack.textContent = rankNames[r].toUpperCase();
                cardBack.style.display = 'block';
                cardImg.style.display = 'none';
            };
            console.warn('[img] svg missing, trying png', svgPath(r));
            cardImg.src = pngPath(r);
        };
        cardImg.onload = () => {
            console.log('[img] loaded', cardImg.src);
            cardImg.style.display = 'block';
            cardBack.style.display = 'none';
        };
        cardImg.onerror = tryPng;
        console.log('[img] trying svg', svgPath(r));
        cardImg.src = svgPath(r);
    }

    async function startOnChain() {
        try {
            if (!contract) await connectFlow();

            const need = ethers.parseEther(String(ENTRY_AMOUNT));
            if (walletBalanceWei < need) {
                console.warn('Insufficient');
                return;
            }

            block('Starting… confirm in wallet');
            statusEl.textContent = 'Starting…';
            statusEl.className = 'status live';
            startBtn.disabled = true;
            cashoutBtn.disabled = true;
            lowerBtn.disabled = true;
            higherBtn.disabled = true;

            const tx = await contract.enterGame({
                value: need
            });
            block('Starting… waiting for confirmation');
            const rcpt = await tx.wait();
            console.log('[enterGame] receipt:', rcpt);

            let ev = null;
            for (const lg of rcpt.logs) {
                if ((lg.address || '').toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) continue;
                try {
                    const p = contract.interface.parseLog(lg);
                    if (p.name === 'GameStarted') {
                        ev = p;
                        break;
                    }
                } catch (_) {}
            }
            if (!ev) {
                console.error('GameStarted not found');
                unblock();
                return;
            }

            gameId = Number(ev.args[0]);
            seedBlock = Number(ev.args[2]);

            gameActive = true;
            steps = 0;
            currentMultiplier = 1;

            seedIsReady = false;
            primeRequested = false;
            primeDone = false;

            stepsWonEl.textContent = '0';
            setCard(null);
            statusEl.textContent = `Committed (game #${gameId})`;

            await waitForSeedReady();
        } catch (e) {
            console.error(e);
            unblock();
            resetRoundState();
        }
    }

    async function waitForSeedReady() {
        const poll = async () => {
            const now = await provider.getBlockNumber();
            if (now > seedBlock) {
                if (!seedIsReady) {
                    seedIsReady = true;

                    if (pollTimer) {
                        clearInterval(pollTimer);
                        pollTimer = null;
                    }
                    seedInfo.textContent = `Seed ready (block ${seedBlock}). Priming first card…`;
                }

                if (primeDone) {
                    return;
                }
                if (primeRequested) {
                    return;
                }

                try {
                    primeRequested = true;
                    block('Priming first card… confirm in wallet');
                    const txp = await contract.prime(gameId);
                    console.log('[prime] sent:', txp.hash);
                    const rcptp = await txp.wait();
                    console.log('[prime] receipt:', rcptp);

                    const g = await contract.getGame(gameId);
                    const cr = Number(g[4]);
                    console.log('[prime] getGame.currentRank =', cr);
                    setCard(cr >= 0 ? cr : null);

                    primeDone = true;
                    lowerBtn.disabled = false;
                    higherBtn.disabled = false;
                    unblock();
                } catch (e) {
                    console.error('[prime] failed:', e);

                    primeRequested = false;
                    unblock();
                }
            } else {
                const remain = Math.max(0, seedBlock - now);
                seedInfo.textContent = `Starting… waiting for randomness (~${remain} blocks).`;
                block(seedInfo.textContent);
            }
        };
        await poll();
        if (!pollTimer) pollTimer = setInterval(poll, 3000);
    }

    async function doGuess(guess) {
        try {
            if (!gameActive) return;
            block(guess === 1 ? 'Higher… confirm in wallet' : 'Lower… confirm in wallet');
            lowerBtn.disabled = true;
            higherBtn.disabled = true;

            const tx = await contract.revealNext(gameId, guess);
            block('Revealing… waiting for confirmation');
            const rcpt = await tx.wait();
            console.log('[revealNext] receipt:', rcpt);

            let stepEv = null,
                busted = false,
                bustedRank = null;
            for (const lg of rcpt.logs) {
                if ((lg.address || '').toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) continue;
                try {
                    const p = contract.interface.parseLog(lg);
                    if (p.name === 'Step') {
                        stepEv = p;
                    } else if (p.name === 'Busted') {
                        busted = true;
                        bustedRank = Number(p.args[0]);
                    }
                } catch (_) {}
            }

            if (!stepEv) {
                console.warn('Step event not found; recovering via getGame()');
                const g = await contract.getGame(gameId);
                const cr = Number(g[4]);
                if (cr >= 0) setCard(cr);
                lowerBtn.disabled = false;
                higherBtn.disabled = false;
                unblock();
                return;
            }

            const prevRank = Number(stepEv.args[1]);
            const nextRank = Number(stepEv.args[3]);
            const win = Boolean(stepEv.args[4]);
            const newSteps = Number(stepEv.args[5]);
            const multFP = stepEv.args[6];

            console.log('[revealNext] parsed Step:', {
                prevRank,
                nextRank,
                win,
                newSteps,
                multFP: multFP.toString()
            });

            setCard(nextRank);

            if (win) {
                steps = newSteps;
                currentMultiplier = Math.min(Number(multFP) / 1e9 * (1 - HOUSE_EDGE), MAX_PAYOUT_X);
                statusEl.textContent = `Safe (${steps})`;
                statusEl.className = 'status live';
                stepsWonEl.textContent = String(steps);
                lowerBtn.disabled = false;
                higherBtn.disabled = false;
                cashoutBtn.disabled = (steps === 0);
            } else {
                statusEl.textContent = 'Lost';
                statusEl.className = 'status dead';
                gameActive = false;
                cashoutBtn.disabled = true;
                lowerBtn.disabled = true;
                higherBtn.disabled = true;
            }

            updateHUD();
            unblock();
        } catch (e) {
            console.error(e);
            lowerBtn.disabled = false;
            higherBtn.disabled = false;
            unblock();
        }
    }

    async function doCashOut() {
        try {
            if (!gameActive || steps === 0) return;
            block('Cash out… confirm in wallet');
            lowerBtn.disabled = true;
            higherBtn.disabled = true;
            const tx = await contract.cashOut(gameId);
            block('Cash out… waiting for confirmation');
            const rcpt = await tx.wait();
            console.log('[cashOut] receipt:', rcpt);

            let payout = 0;
            for (const lg of rcpt.logs) {
                if ((lg.address || '').toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) continue;
                try {
                    const p = contract.interface.parseLog(lg);
                    if (p.name === 'CashedOut') {
                        payout = Number(ethers.formatEther(p.args[2]));
                        break;
                    }
                } catch (_) {}
            }
            console.log('[cashOut] payout:', payout, TOKEN);
            statusEl.textContent = 'Won';
            statusEl.className = 'status won';
            gameActive = false;
            cashoutBtn.disabled = true;
            await refreshPending();
            unblock();
        } catch (e) {
            console.error(e);
            lowerBtn.disabled = false;
            higherBtn.disabled = false;
            unblock();
        }
    }

    function resetRoundState() {
        gameId = null;
        seedBlock = null;
        steps = 0;
        currentMultiplier = 1;
        gameActive = false;
        stepsWonEl.textContent = '0';
        seedInfo.textContent = '';
        setCard(null);
        updateHUD();
        gateCheck();
    }

    async function refreshPending() {
        try {
            if (!contract || !account) return;
            const amt = await contract.pending(account);
            const n = Number(ethers.formatEther(amt));
            pendingBalEl.textContent = `${n.toFixed(4)} ${TOKEN}`;
            $('withdrawAllBtn').disabled = (n <= 0);
        } catch (e) {
            console.error(e);
        }
    }
    $('withdrawAllBtn').addEventListener('click', async () => {
        try {
            block('Withdrawing… confirm in wallet');
            const tx = await contract.withdrawAll();
            block('Withdrawing… waiting for confirmation');
            await tx.wait();
            await refreshPending();
            await refreshWalletBalance();
            unblock();
        } catch (e) {
            console.error(e);
            unblock();
        }
    });

    function updateHUD() {
        multEl.textContent = currentMultiplier.toFixed(2) + '×';
        payoutEl.textContent = (Math.min(ENTRY_AMOUNT * currentMultiplier, ENTRY_AMOUNT * MAX_PAYOUT_X)).toFixed(2) + ` ${TOKEN}`;
        gateCheck();
    }

    function shortAddr(a) {
        return a ? a.slice(0, 6) + '…' + a.slice(-4) : '—';
    }
})();