/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import Ship from "./ship";
import GameBoard from "./gameBoard";

// Board setup functions
export function createBoard(boardId, rows, columns) {
  const boardElement = document.getElementById(boardId);
  boardElement.innerHTML = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("div");
      cell.className = "board-cell";
      cell.dataset.row = i;
      cell.dataset.column = j;
      boardElement.appendChild(cell);
    }
  }
}

export function colorPlayerShips(boardId, playerGameBoard) {
  for (let i = 0; i < playerGameBoard.rows; i++) {
    for (let j = 0; j < playerGameBoard.columns; j++) {
      const cell = document.querySelector(
        `#${boardId} .board-cell[data-row="${i}"][data-column="${j}"]`,
      );
      if (playerGameBoard.board[i][j] instanceof Ship) {
        cell.classList.add("player-ship");
      }
    }
  }
}

// Attack handling
function handlePlayerAttack(event, player1, player2, gameController) {
  const cell = event.target;
  if (cell.className !== "board-cell") return;

  const rowIndex = parseInt(cell.dataset.row, 10);
  const columnIndex = parseInt(cell.dataset.column, 10);

  const attackResult = player1.sendAttack(
    rowIndex,
    columnIndex,
    player2.gameBoard,
  );
  if (attackResult !== false) {
    updateCellState(cell, player2.gameBoard.board[rowIndex][columnIndex]);

    const winner = gameController.checkWin();
    if (winner) {
      endGame(winner, player1.name);
    } else {
      gameController.switchPlayer();
      setTimeout(() => aiMakeAttack(player1, player2, gameController), 300);
    }
  }
}

export function aiMakeAttack(player1, player2, gameController) {
  player2.makeRandomAttack(player1.gameBoard);
  const [rowIndex, colIndex] = player2.getLastAttack();

  const playerBoardId = "p1-gameboard";
  const cell = document.querySelector(
    `#${playerBoardId} .board-cell[data-row="${rowIndex}"][data-column="${colIndex}"]`,
  );

  updateCellState(cell, player1.gameBoard.board[rowIndex][colIndex]);

  const winner = gameController.checkWin();
  if (winner) {
    endGame(winner, player1.name);
  } else {
    gameController.switchPlayer();
  }
}

// End Game
function endGame(winnerName, playerName) {
  const winnerInfoElement = document.querySelector(".winner-info");
  const dialogContainer = document.querySelector(".dialog-container");
  const dialog = document.querySelector("dialog");

  winnerInfoElement.textContent = winnerName === playerName ? "You won!" : "You lose";
  dialogContainer.style.display = 'flex';
  dialog.showModal();
}


// Utility functions
function updateCellState(cell, cellState) {
  if (cellState === "hit") {
    cell.classList.add("cell-hit");
  } else if (cellState === "miss") {
    cell.classList.add("cell-miss");
  }
}

export function setupCellClickHandler(
  boardId,
  player1,
  player2,
  gameController,
) {
  const boardElement = document.getElementById(boardId);

  if (boardId === "p2-gameboard") {
    boardElement.addEventListener("click", (event) =>
      handlePlayerAttack(event, player1, player2, gameController),
    );
  }
}

export function setupRestartButtonListener(player1, player2) {
  const restartButton = document.getElementById("restart-button");

  restartButton.addEventListener("click", () => {
    player1.setGameBoard(new GameBoard());
    player2.setGameBoard(new GameBoard());
    createBoard("p1-gameboard", 10, 10);
    createBoard("p2-gameboard", 10, 10);
    document.querySelector("dialog").close();
    document.querySelector(".dialog-container").style.display = 'none';
  });
}

