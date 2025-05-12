const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restart');
const moveSound = document.getElementById('moveSound');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

// Winning conditions
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

// Handle human click
function handleCellClick(event) {
  const idx = parseInt(event.target.getAttribute('data-index'));
  if (!gameActive || gameState[idx] || currentPlayer !== 'X') return;
  makeMove(idx, 'X');
  if (checkEnd()) return;
  switchToAI();
}

// Apply move to board and UI
function makeMove(idx, player) {
  gameState[idx] = player;
  const cell = document.querySelector(`.cell[data-index="${idx}"]`);
  cell.classList.add(player.toLowerCase());
  moveSound.play();
}


// Switch to AI turn
function switchToAI() {
  currentPlayer = 'O';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
  setTimeout(aiMove, 200);
}

// AI move using Minimax + Alpha-Beta
function aiMove() {
  const { index } = findBestMove(gameState);
  makeMove(index, 'O');
  if (checkEnd()) return;
  currentPlayer = 'X';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
}

// Check for win or draw and end game
function checkEnd() {
  const result = getResult(gameState);
  if (result) {
    gameActive = false;
    if (result.player === 'Draw') {
      statusText.textContent = 'Draw!';
    } else {
      highlightWinningCells(result.line);
      statusText.textContent = `Player ${result.player} wins!`;
    }
    return true;
  }
  return false;
}

// Determine winner or draw
function getResult(state) {
  for (let line of winningConditions) {
    const [a, b, c] = line;
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return { player: state[a], line };
    }
  }
  if (!state.includes('')) return { player: 'Draw', line: [] };
  return null;
}

// Highlight winning cells
function highlightWinningCells(indices) {
  indices.forEach(i => {
    document.querySelector(`.cell[data-index="${i}"]`).classList.add('winning-cell');
  });
}

// Restart game
function restartGame() {
  gameState.fill('');
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `It's ${currentPlayer}'s turn`;
  cells.forEach(cell => cell.classList.remove('x', 'o', 'winning-cell'));
}

// Find best move for AI
function findBestMove(state) {
  let bestVal = -Infinity;
  let bestIndex = -1;
  for (let i = 0; i < state.length; i++) {
    if (!state[i]) {
      state[i] = 'O';
      const moveVal = minimax(state, 0, false, -Infinity, Infinity);
      state[i] = '';
      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestIndex = i;
      }
    }
  }
  return { index: bestIndex, score: bestVal };
}

// Minimax with Alpha-Beta Pruning
function minimax(state, depth, isMax, alpha, beta) {
  const result = getResult(state);
  if (result) {
    if (result.player === 'O') return 10 - depth;
    if (result.player === 'X') return depth - 10;
    return 0;
  }

  if (isMax) {
    let maxEval = -Infinity;
    for (let i = 0; i < state.length; i++) {
      if (!state[i]) {
        state[i] = 'O';
        const evalScore = minimax(state, depth + 1, false, alpha, beta);
        state[i] = '';
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < state.length; i++) {
      if (!state[i]) {
        state[i] = 'X';
        const evalScore = minimax(state, depth + 1, true, alpha, beta);
        state[i] = '';
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
    }
    return minEval;
  }
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial status
statusText.textContent = `It's ${currentPlayer}'s turn`;
