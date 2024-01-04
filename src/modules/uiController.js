/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import Ship from "./ship";
import GameBoard from "./gameBoard";

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

// this needs splitting up
function handleCellClick(event, player1, player2, gameController) {
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
    const cellState = player2.gameBoard.board[rowIndex][columnIndex];
    if (cellState === "hit") {
      cell.classList.add("cell-hit");
    } else if (cellState === "miss") {
      cell.classList.add("cell-miss");
    }
    if (gameController.checkWin()) {
      // need to handle end of game scenario here
    }
    gameController.switchPlayer();
    setTimeout(() => aiMakeAttack(player1, player2, gameController), 300);
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
      handleCellClick(event, player1, player2, gameController),
    );
  }
}

export function aiMakeAttack(player1, player2, gameController) {

  player2.makeRandomAttack(player1.gameBoard);
  const [rowIndex, colIndex] = player2.getLastAttack();

  const playerBoardId = "p1-gameboard";
  const cell = document.querySelector(
    `#${playerBoardId} .board-cell[data-row="${rowIndex}"][data-column="${colIndex}"]`,
  );

  const cellState = player1.gameBoard.board[rowIndex][colIndex];
  if (cellState === "hit") {
    cell.classList.add("cell-hit");
  } else if (cellState === "miss") {
    cell.classList.add("cell-miss");
  }

  if (gameController.checkWin()) {
    // still need to handle end of game scenario
  } else {
    gameController.switchPlayer();
  }
}

export function setupRestartButtonListener(player1, player2) {
  const restartButton = document.getElementById("restart-button");

  restartButton.addEventListener("click", () => {
    player1.setGameBoard(new GameBoard());
    player2.setGameBoard(new GameBoard());
    createBoard("p1-gameboard", 10, 10);
    createBoard("p2-gameboard", 10, 10);
  });
}

