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

    let mines = parseInt(minesInput.value);
    let gems = parseInt(gemsInput.value);
    let profit = 0;
    let betAmount = parseFloat(betAmountInput.value);

    function updateProfit() {
        profitElement.textContent = `₹${profit.toFixed(2)}`;
    }

    function updateGems() {
        gemsInput.value = 25 - mines;
    }

    function initializeGame() {
        mines = parseInt(minesInput.value);
        updateGems();
        const totalTiles = tiles.length;

        tiles.forEach(tile => {
            tile.classList.remove('revealed', 'bomb', 'gem');
            tile.textContent = '';
        });
        profit = 0;
        updateProfit();

        let mineIndices = [];
        while (mineIndices.length < mines) {
            const randomIndex = Math.floor(Math.random() * totalTiles);
            if (!mineIndices.includes(randomIndex)) {
                mineIndices.push(randomIndex);
            }
        }

        tiles.forEach((tile, index) => {
            tile.dataset.type = mineIndices.includes(index) ? 'mine' : 'gem';
        });
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
        revealGrid();
        setTimeout(() => {
            location.reload();
        }, 5000); // 5-second delay before reloading
    }

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            if (tile.classList.contains('revealed')) return;

            if (tile.dataset.type === 'mine') {
                tile.classList.add('bomb');
                tile.textContent = '💣';
                bombSound.play();
                endGame();
            } else {
                tile.classList.add('revealed', 'gem');
                tile.textContent = '😊';
                profit += betAmount * 0.1; // Simple profit calculation, adjust as needed
                updateProfit();
            }
        });
    });
    function revealGrid() {
        tiles.forEach(tile => {
            if (tile.dataset.type === 'mine') {
                tile.classList.add('bomb');
                tile.textContent = '💣';
            } else {
                tile.classList.add('revealed', 'gem');
                tile.textContent = '😊';
            }
        });
    }

    function endGame() {
        revealGrid();
        setTimeout(() => {
            location.reload();
        }, 5000); // 5-second delay before reloading
    }

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            if (tile.classList.contains('revealed')) return;

            if (tile.dataset.type === 'mine') {
                tile.classList.add('bomb');
                tile.textContent = '💣';
                bombSound.play();
                endGame();
            } else {
                tile.classList.add('revealed', 'gem');
                tile.textContent = '😊';
                profit += betAmount * 0.1; // Simple profit calculation, adjust as needed
                updateProfit();
            }
        });
    });


    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            if (tile.classList.contains('revealed')) return;

            if (tile.dataset.type === 'mine') {
                tile.classList.add('bomb');
                tile.textContent = '💣';
                bombSound.play();
                revealGrid();
                alert('You hit a mine! Game Over.');
                initializeGame();
            } else {
                tile.classList.add('revealed', 'gem');
                tile.textContent = '😊';
                profit += betAmount * 0.1; // Simple profit calculation, adjust as needed
                updateProfit();
            }
        });
    });

    randomTileButton.addEventListener('click', () => {
        const unrevealedTiles = Array.from(tiles).filter(tile => !tile.classList.contains('revealed'));
        if (unrevealedTiles.length > 0) {
            const randomTile = unrevealedTiles[Math.floor(Math.random() * unrevealedTiles.length)];
            randomTile.click();
        }
    });

    cashoutButton.addEventListener('click', () => {
        alert(`You cashed out with a profit of ₹${profit.toFixed(2)}!`);
        initializeGame();
    });

    minesInput.addEventListener('change', () => {
        mines = parseInt(minesInput.value);
        if (mines < 1) mines = 1;
        if (mines > 24) mines = 24;
        minesInput.value = mines;
        updateGems();
        initializeGame();
    });

    betAmountInput.addEventListener('change', () => {
        betAmount = parseFloat(betAmountInput.value);
        if (betAmount < 0) betAmount = 0;
        betAmountInput.value = betAmount.toFixed(2);
    });

    modeToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeToggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Add functionality for auto mode if needed
        });
    });

    betHalfButton.addEventListener('click', () => {
        betAmount /= 2;
        betAmountInput.value = betAmount.toFixed(2);
    });

    betDoubleButton.addEventListener('click', () => {
        betAmount *= 2;
        betAmountInput.value = betAmount.toFixed(2);
    });

    // Initialize the game when the page loads
    initializeGame();
});