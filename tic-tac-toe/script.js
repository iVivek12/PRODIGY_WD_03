const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const modeSelection = document.getElementById('mode-selection');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsComputerButton = document.getElementById('player-vs-computer');
const gameBoard = document.getElementById('game-board');
const scoreboard = document.getElementById('scoreboard');
const scoreXElement = document.getElementById('score-x');
const scoreOElement = document.getElementById('score-o');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isAgainstComputer = false;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || checkWinner()) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => {
            updateScore();
            alert(`${currentPlayer} wins!`);
        }, 100); 
        return;
    }

    if (!gameState.includes('')) {
        setTimeout(() => {
            alert('Draw!');
        }, 100); 
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (isAgainstComputer && currentPlayer === 'O') {
        setTimeout(computerMove, 1000); 
    }
}

function computerMove() {
    let emptyCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = currentPlayer;
        document.querySelector(`.cell[data-index='${randomIndex}']`).innerText = currentPlayer;

        if (checkWinner()) {
            setTimeout(() => {
                updateScore();
                alert(`${currentPlayer} wins!`);
            }, 100);
            return;
        }

        if (!gameState.includes('')) {
            setTimeout(() => {
                alert('Draw!');
            }, 100); 
            return;
        }

        currentPlayer = 'X';
    }
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXElement.innerText = scoreX;
    } else {
        scoreO++;
        scoreOElement.innerText = scoreO;
    }
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.innerText = '');
}

function startGame(mode) {
    isAgainstComputer = (mode === 'computer');
    scoreboard.classList.remove('hidden');
    gameBoard.classList.remove('hidden');
    restartGame();
}

playerVsPlayerButton.addEventListener('click', () => startGame('player'));
playerVsComputerButton.addEventListener('click', () => startGame('computer'));
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
