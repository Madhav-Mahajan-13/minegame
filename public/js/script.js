document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    const randomTileButton = document.getElementById('randomTile');
    const cashoutButton = document.getElementById('cashout');
    const profitElement = document.getElementById('profit');
    const bombSound = document.getElementById('bombSound');
    const betAmountInput = document.getElementById('betAmount');
    const minesInput = document.getElementById('mines');
    const gemsInput = document.getElementById('gems');
    const modeToggleButtons = document.querySelectorAll('.mode-toggle button');
    const betHalfButton = document.querySelector('.bet-half');
    const betDoubleButton = document.querySelector('.bet-double');

    // Game state variables
    let gameState = {
        mines: parseInt(minesInput.value),
        gems: parseInt(gemsInput.value),
        profit: 0,
        betAmount: parseFloat(betAmountInput.value),
        isGameActive: false,
        revealedCount: 0,
        mineIndices: [],
        gameMode: 'manual' // 'manual' or 'auto'
    };

    // Utility functions
    function updateProfit() {
        profitElement.textContent = `₹${gameState.profit.toFixed(2)}`;
    }

    function updateGems() {
        gameState.gems = 25 - gameState.mines;
        gemsInput.value = gameState.gems;
    }

    function calculateProfitMultiplier() {
        // Better profit calculation based on risk (mines vs gems ratio)
        const riskRatio = gameState.mines / 25;
        const baseMultiplier = 0.05; // Base 5% profit per gem
        const riskBonus = riskRatio * 0.15; // Up to 15% bonus for higher risk
        return baseMultiplier + riskBonus;
    }

    function checkWinCondition() {
        if (gameState.revealedCount === gameState.gems) {
            // Player won by revealing all gems
            setTimeout(() => {
                alert(`Congratulations! You won! Final profit: ₹${gameState.profit.toFixed(2)}`);
                initializeGame();
            }, 500);
            return true;
        }
        return false;
    }

    function revealGrid() {
        tiles.forEach(tile => {
            if (tile.dataset.type === 'mine') {
                tile.classList.add('bomb');
                tile.textContent = '💣';
            } else {
                tile.classList.add('revealed', 'gem');
                tile.textContent = '💎';
            }
        });
    }

    function endGame() {
        gameState.isGameActive = false;
        revealGrid();
        setTimeout(() => {
            alert('Game Over! Starting new game...');
            initializeGame();
        }, 2000);
    }

    function initializeGame() {
        // Reset game state
        gameState.mines = parseInt(minesInput.value);
        gameState.gems = 25 - gameState.mines;
        gameState.profit = 0;
        gameState.isGameActive = true;
        gameState.revealedCount = 0;
        gameState.mineIndices = [];

        updateGems();
        updateProfit();

        // Reset all tiles
        tiles.forEach(tile => {
            tile.classList.remove('revealed', 'bomb', 'gem');
            tile.textContent = '';
            tile.style.pointerEvents = 'auto';
        });

        // Generate mine positions
        const totalTiles = tiles.length;
        while (gameState.mineIndices.length < gameState.mines) {
            const randomIndex = Math.floor(Math.random() * totalTiles);
            if (!gameState.mineIndices.includes(randomIndex)) {
                gameState.mineIndices.push(randomIndex);
            }
        }

        // Set tile types
        tiles.forEach((tile, index) => {
            tile.dataset.type = gameState.mineIndices.includes(index) ? 'mine' : 'gem';
        });
    }

    function handleTileClick(tile) {
        if (!gameState.isGameActive || tile.classList.contains('revealed')) {
            return;
        }

        if (tile.dataset.type === 'mine') {
            // Hit a mine
            tile.classList.add('bomb');
            tile.textContent = '💣';
            bombSound.play();
            endGame();
        } else {
            // Found a gem
            tile.classList.add('revealed', 'gem');
            tile.textContent = '💎';
            tile.style.pointerEvents = 'none'; // Prevent double-clicking
            
            gameState.revealedCount++;
            
            // Calculate profit based on risk
            const multiplier = calculateProfitMultiplier();
            const profitGain = gameState.betAmount * multiplier;
            gameState.profit += profitGain;
            
            updateProfit();
            
            // Check if player won
            if (checkWinCondition()) {
                return;
            }
        }
    }

    // Event Listeners
    tiles.forEach(tile => {
        tile.addEventListener('click', () => handleTileClick(tile));
    });

    randomTileButton.addEventListener('click', () => {
        if (!gameState.isGameActive) return;
        
        const unrevealedTiles = Array.from(tiles).filter(tile => 
            !tile.classList.contains('revealed') && !tile.classList.contains('bomb')
        );
        
        if (unrevealedTiles.length > 0) {
            const randomTile = unrevealedTiles[Math.floor(Math.random() * unrevealedTiles.length)];
            handleTileClick(randomTile);
        }
    });

    cashoutButton.addEventListener('click', () => {
        if (!gameState.isGameActive || gameState.revealedCount === 0) {
            alert('No profit to cash out!');
            return;
        }
        
        alert(`You cashed out with a profit of ₹${gameState.profit.toFixed(2)}!`);
        initializeGame();
    });

    minesInput.addEventListener('change', () => {
        let newMines = parseInt(minesInput.value);
        newMines = Math.max(1, Math.min(24, newMines)); // Clamp between 1 and 24
        minesInput.value = newMines;
        gameState.mines = newMines;
        updateGems();
        initializeGame();
    });

    betAmountInput.addEventListener('change', () => {
        let newBet = parseFloat(betAmountInput.value);
        newBet = Math.max(0, newBet); // Ensure non-negative
        betAmountInput.value = newBet.toFixed(2);
        gameState.betAmount = newBet;
    });

    modeToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update game mode
            if (button.textContent.toLowerCase().includes('auto')) {
                gameState.gameMode = 'auto';
                // Auto mode logic could be implemented here
            } else {
                gameState.gameMode = 'manual';
            }
        });
    });

    betHalfButton.addEventListener('click', () => {
        gameState.betAmount = Math.max(0, gameState.betAmount / 2);
        betAmountInput.value = gameState.betAmount.toFixed(2);
    });

    betDoubleButton.addEventListener('click', () => {
        gameState.betAmount *= 2;
        betAmountInput.value = gameState.betAmount.toFixed(2);
    });

    // Initialize the game when the page loads
    initializeGame();
});