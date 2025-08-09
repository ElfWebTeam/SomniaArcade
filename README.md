# Somnia Arcade

Somnia Arcade is a collection of fully on-chain mini-games built for the [Somnia Testnet](https://somnia.network/).  
Every game runs entirely on smart contracts with **provable fairness**, transparent payouts, and minimal off-chain logic.  

The platform is designed for quick, fun gameplay while showcasing Somnia’s speed, low cost, and ability to handle real-time interactive dApps.

---

## 🎮 Games

### 1. Somnia Hi-Lo
**Contract Address:** [0x9F3cC2f1E66B0dd77Ad278eCb1C49C2d6Ef24CED](https://shannon-explorer.somnia.network/address/0x9F3cC2f1E66B0dd77Ad278eCb1C49C2d6Ef24CED)

Guess if the next card is **higher** or **lower** than the current one.  
Each guess is a transaction, and the deck is shuffled on-chain from a committed seed. Ties lose.

---

### 2. Somnia Mines
**Contract Address:** [0x6b7FA09D6e4798965f644E32bD3bC0fe70acDE4B](https://shannon-explorer.somnia.network/address/0x6b7FA09D6e4798965f644E32bD3bC0fe70acDE4B)

Open tiles to reveal safe spots and climb the multiplier.  
Bomb positions are generated using on-chain randomness from a committed seed.  
Cash out anytime to lock in your winnings.

---

### 3. Somnia Spin  
**Status:** 🚧 Coming Soon, We’re actively developing it and will update once deployed.

---

## 🛠 How to Test on Somnia Testnet

### Prerequisites
- [MetaMask](https://metamask.io/) or a wallet with Somnia Testnet added
- Some **STT** test tokens (faucet link if available)
- A browser that supports Web3 injection (e.g., Chrome)

---

### Hi-Lo – Manual Playtesting Steps

1. **Open the game:**  
   [https://somniaarcade.com/SomniaHiLo/](https://somniaarcade.com/SomniaHiLo/)
   
2. **Connect Wallet:**  
   Click **"Connect Wallet"** and approve MetaMask connection.

3. **Check your STT balance:**  
   Make sure you have enough STT to cover the entry cost.

4. **Start a round:**  
   - Set your bet (fixed for testnet version)  
   - Click **"Start"**, this commits your seed to the contract.
   
5. **Guess higher or lower:**  
   Each guess triggers a transaction to reveal the next card.

6. **Cash out:**  
   Click **"Cash Out"** anytime to send winnings to your pending balance.

7. **Withdraw:**  
   From any game UI, click **"Withdraw"** to transfer pending balance to your wallet.

---

### Mines – Manual Playtesting Steps

1. **Open the game:**  
   [https://somniaarcade.com/SomniaMines/](https://somniaarcade.com/SomniaMines/)

2. **Connect Wallet** (same as above).

3. **Set bet & start:**  
   Click **"Start Game"** to commit the bomb layout seed.

4. **Reveal tiles:**  
   Click a tile to reveal it.  
   - Safe tile → multiplier increases  
   - Bomb → round ends

5. **Cash out** to lock winnings, then **Withdraw** to wallet.

---

## 🔍 Fairness Model

- **Commit-Reveal Randomness:**  
  Games commit a hash of the seed, then reveal after a future block.  
  The revealed blockhash + `prevrandao` ensures no early knowledge.
  
- **On-chain Execution:**  
  All core game logic (card draws, bomb positions, payouts) happens inside the smart contract.

- **Transparent Odds:**  
  Multipliers are calculated with fair odds × (1 - house edge), stored on-chain.

---

## 📜 Smart Contracts

| Game          | Contract Address |
|---------------|------------------|
| Somnia Hi-Lo  | [0x9F3cC2f1E66B0dd77Ad278eCb1C49C2d6Ef24CED](https://shannon-explorer.somnia.network/address/0x9F3cC2f1E66B0dd77Ad278eCb1C49C2d6Ef24CED) |
| Somnia Mines  | [0x6b7FA09D6e4798965f644E32bD3bC0fe70acDE4B](https://shannon-explorer.somnia.network/address/0x6b7FA09D6e4798965f644E32bD3bC0fe70acDE4B) |
| Somnia Spin   | Coming Soon |

---

## 🔗 Links

- **Live Website:** [https://somniaarcade.com/](https://somniaarcade.com/)  
- **GitHub Repo:** [https://github.com/ElfWebTeam/SomniaArcade](https://github.com/ElfWebTeam/SomniaArcade)  
- **Hackathon Page:** [https://dorahacks.io/hackathon/somnia-minigames/detail](https://dorahacks.io/hackathon/somnia-minigames/detail)  
- **Demo Video:** will be updated after Somnia Spin is deployed.

---

## 🏆 Hackathon Notes

This project was built for the **Somnia Mini-Games Hackathon** on [DoraHacks](https://dorahacks.io/hackathon/somnia-minigames/detail).  
Focus areas include:

- **Creativity & Originality:** Custom game mechanics designed for Somnia’s speed and finality.
- **Technical Excellence:** Fully deployed contracts on Somnia Testnet.
- **User Experience:** Minimal clicks, fast interaction, clean UI.
- **On-chain Impact:** Entire game logic is on-chain.
- **Community Fit:** Simple to play, transparent, and designed for repeat engagement.

---

## 📌 Next Steps

- Finalize and deploy **Somnia Spin**  
- Add leaderboards for all games  
- Expand to mainnet if adoption is strong

---














