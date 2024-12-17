document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const colors = ['yellow', 'blue', 'red'];
    const cards = [
        { shape: 'L', color: 'red', image: 'kartlar/Card_Red_L.png', points: 2 },
        { shape: 'L', color: 'blue', image: 'kartlar/Card_Blue_L.png', points: 2 },
        { shape: 'L', color: 'yellow', image: 'kartlar/Card_Yellow_L.png', points: 2 },
        { shape: 'J', color: 'red', image: 'kartlar/Card_Red_J.png', points: 2 },
        { shape: 'J', color: 'blue', image: 'kartlar/Card_Blue_J.png', points: 2 },
        { shape: 'J', color: 'yellow', image: 'kartlar/Card_Yellow_J.png', points: 2 },
        { shape: 'O', color: 'red', image: 'kartlar/Card_Red_O.png', points: 2 },
        { shape: 'O', color: 'blue', image: 'kartlar/Card_Blue_O.png', points: 2 },
        { shape: 'O', color: 'yellow', image: 'kartlar/Card_Yellow_O.png', points: 2 },
        { shape: 'T', color: 'red', image: 'kartlar/Card_Red_T.png', points: 2 },
        { shape: 'T', color: 'blue', image: 'kartlar/Card_Blue_T.png', points: 2 },
        { shape: 'T', color: 'yellow', image: 'kartlar/Card_Yellow_T.png', points: 2 },
        { shape: 'I', color: 'red', image: 'kartlar/Card_Red_I.png', points: 1 },
        { shape: 'I', color: 'blue', image: 'kartlar/Card_Blue_I.png', points: 1 },
        { shape: 'I', color: 'yellow', image: 'kartlar/Card_Yellow_I.png', points: 1 },
        { shape: 'Dia', color: 'red', image: 'kartlar/Card_Red_S.png', points: 2 },
        { shape: 'Dia', color: 'blue', image: 'kartlar/Card_Blue_Dia.png', points: 2 },
        { shape: 'Dia', color: 'yellow', image: 'kartlar/Card_Yellow_Dia.png', points: 2 },
        { shape: 'S', color: 'red', image: 'kartlar/Card_Red_S.png', points: 3 },
        { shape: 'S', color: 'blue', image: 'kartlar/Card_Blue_S.png', points: 3 },
        { shape: 'S', color: 'yellow', image: 'kartlar/Card_Yellow_S.png', points: 3 },
        { shape: 'Z', color: 'red', image: 'kartlar/Card_Red_Z.png', points: 3 },
        { shape: 'Z', color: 'blue', image: 'kartlar/Card_Blue_Z.png', points: 3 },
        { shape: 'Z', color: 'yellow', image: 'kartlar/Card_Yellow_Z.png', points: 3 },
        { shape: 'C', color: 'red', image: 'kartlar/Card_Red_C.png', points: 1 },
        { shape: 'C', color: 'blue', image: 'kartlar/Card_Blue_C.png', points: 1 },
        { shape: 'C', color: 'yellow', image: 'kartlar/Card_Yellow_C.png', points: 1 },
    ];
  
    let grid = Array(3).fill().map(() => Array(3).fill(null));
    let currentPlayer = 1;
    let bag = Array(6).fill('yellow').concat(Array(6).fill('blue')).concat(Array(6).fill('red'));
    let drawnYarn = null;

    function createBoard() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                board.appendChild(cell);
            }
        }
    }

    function placeYarn(row, col, color) {
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        const yarn = document.createElement('div');
        yarn.classList.add('yarn', color);
        cell.appendChild(yarn);
        grid[row][col] = color;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }
    let shuffledDeck = shuffleDeck([...cards]);     

    function pushYarns(row, col, color, direction) {
        if (direction === 'up') {
            let temp = grid[0][col];
            for (let i = 0; i < 2; i++) {
                grid[i][col] = grid[i + 1][col];
                updateCell(i, col);
            }
            grid[2][col] = color;
            updateCell(2, col);
        } else if (direction === 'down') {
            let temp = grid[2][col];
            for (let i = 2; i > 0; i--) {
                grid[i][col] = grid[i - 1][col];
                updateCell(i, col);
            }
            grid[0][col] = color;
            updateCell(0, col);
        } else if (direction === 'left') {
            let temp = grid[row][0];
            for (let j = 0; j < 2; j++) {
                grid[row][j] = grid[row][j + 1];
                updateCell(row, j);
            }
            grid[row][2] = color;
            updateCell(row, 2);
        } else if (direction === 'right') {
            let temp = grid[row][2];
            for (let j = 2; j > 0; j--) {
                grid[row][j] = grid[row][j - 1];
                updateCell(row, j);
            }
            grid[row][0] = color;
            updateCell(row, 0);
        }
    }

    function updateCell(row, col) {
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        cell.innerHTML = '';
        if (grid[row][col] !== null) {
            const yarn = document.createElement('div');
            yarn.classList.add('yarn', grid[row][col]);
            cell.appendChild(yarn);
        }
    }

    function drawYarn() {
        if (bag.length === 0) {
            alert('The game is over! All yarn balls are used.');
            return null;
        }
        const randomIndex = Math.floor(Math.random() * bag.length);
        const color = bag.splice(randomIndex, 1)[0];
        drawnYarn = color;
        displayDrawnYarn(color);
        return color;
    }

    function displayDrawnYarn(color) {
        const container = document.getElementById('drawn-yarn-container');
        container.innerHTML = '';
        const yarn = document.createElement('div');
        yarn.classList.add('yarn', color);
        container.appendChild(yarn);
    }

    function handleTurn(event) {
        if (!drawnYarn) {
            alert('You need to draw a yarn first!');
            return;
        }
        const direction = event.target.dataset.direction;
        let row, col;
        if (direction === 'up' || direction === 'down') {
            col = parseInt(event.target.dataset.col);
            row = direction === 'up' ? 2 : 0;
        } else if (direction === 'left' || direction === 'right') {
            row = parseInt(event.target.dataset.row);
            col = direction === 'left' ? 2 : 0;
        }
        pushYarns(row, col, drawnYarn, direction);
        drawnYarn = null;
        document.getElementById('drawn-yarn-container').innerHTML = '';
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    function initializeBoard() {
        const initialColors = ['yellow', 'yellow', 'yellow', 'blue', 'blue', 'blue', 'red', 'red', 'red'];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const randomIndex = Math.floor(Math.random() * initialColors.length);
                const color = initialColors.splice(randomIndex, 1)[0];
                placeYarn(i, j, color);
            }
        }
    }

    createBoard();
    initializeBoard();
    document.querySelectorAll('.control-btn').forEach(button => {
        button.addEventListener('click', handleTurn);
    });
    document.getElementById('draw-yarn-btn').addEventListener('click', drawYarn);
});
