/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

import Ship from "./ship";

// Board setup functions
export function createBoard(boardId, rows, columns, gameBoard = null) {
  const boardElement = document.getElementById(boardId);
  boardElement.innerHTML = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("div");
      cell.className = "board-cell";
      cell.dataset.row = i;
      cell.dataset.column = j;
      if (gameBoard && gameBoard.board[i][j] instanceof Ship) {
        cell.classList.add("player-ship");
      }
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
  const endGameDialog = document.getElementById("game-end-dialog");
  const dialogContainer = document.querySelector(".game-end-dialog-container");

  winnerInfoElement.textContent =
    winnerName === playerName ? "You won!" : "You lose";
  dialogContainer.style.display = "flex";
  endGameDialog.showModal();
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

export function setupRestartButtonListener(gameSetup) {
  const restartButton = document.getElementById("restart-button");

  function restartGameHandler() {
    const endGameDialog = document.getElementById("game-end-dialog");
    const dialogContainer = document.querySelector(
      ".game-end-dialog-container",
    );

    dialogContainer.style.display = "none";

    endGameDialog.close();
    gameSetup.initialize();
  }
  restartButton.removeEventListener("click", restartGameHandler);
  restartButton.addEventListener("click", restartGameHandler);
}

// SHIP PLACEMENT MODAL LOGIC

export function setupShipPlacementModal(player) {
  const modal = document.getElementById("ship-placement-modal");
  const boardElement = document.getElementById("placement-gameboard");
  let ships;
  let currentShipIndex = 0;
  let isHorizontal = true;

  const resetModal = () => {
    ships = createShips();
    currentShipIndex = 0;
    isHorizontal = true;
    createBoard("placement-gameboard", 10, 10);
  };

  const handleShipPlacementClick = (event) => {
    const placed = handleShipPlacement(
      event,
      player,
      ships[currentShipIndex],
      isHorizontal,
    );
    if (placed) {
      currentShipIndex++;
      if (currentShipIndex >= ships.length) {
        modal.close();
      }
    }
  };

  const setupEventListeners = () => {
    boardElement.removeEventListener("mouseover", handleShipHover);
    boardElement.removeEventListener("mouseout", handleShipHoverOut);
    boardElement.removeEventListener("click", handleShipPlacementClick);

    boardElement.addEventListener("mouseover", (event) =>
      handleShipHover(event, ships[currentShipIndex], isHorizontal),
    );
    boardElement.addEventListener("mouseout", handleShipHoverOut);
    boardElement.addEventListener("click", handleShipPlacementClick);
    document.getElementById("rotate-button").onclick = () => {
      isHorizontal = !isHorizontal;
    };
  };

  modal.addEventListener("close", () => {
    colorPlayerShips("p1-gameboard", player.gameBoard);
    resetModal();
    setupEventListeners();
  });

  resetModal();
  setupEventListeners();
}

function createShips() {
  return [
    new Ship("Carrier", 5),
    new Ship("Battleship", 4),
    new Ship("Destroyer", 3),
    new Ship("Submarine", 3),
    new Ship("Patrol Boat", 2),
  ];
}

function handleShipHover(event, ship, isHorizontal) {
  if (event.target.className.includes("board-cell")) {
    const row = parseInt(event.target.dataset.row, 10);
    const col = parseInt(event.target.dataset.column, 10);
    highlightShipPlacement(row, col, ship.shipLength, isHorizontal);
  }
}

function handleShipHoverOut() {
  clearShipPlacementHighlight();
}

function handleShipPlacement(event, player, ship, isHorizontal) {
  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.column, 10);
  if (player.gameBoard.placeShip(ship, row, col, isHorizontal)) {
    colorPlayerShips("placement-gameboard", player.gameBoard);
    clearShipPlacementHighlight();
    return true;
  }
  return false;
}

function highlightShipPlacement(row, col, length, isHorizontal) {
  clearShipPlacementHighlight();
  for (let i = 0; i < length; i++) {
    const cell = isHorizontal
      ? document.querySelector(
          `#placement-gameboard .board-cell[data-row="${row}"][data-column="${
            col + i
          }"]`,
        )
      : document.querySelector(
          `#placement-gameboard .board-cell[data-row="${
            row + i
          }"][data-column="${col}"]`,
        );
    if (cell) cell.classList.add("ship-hover");
  }
}

function clearShipPlacementHighlight() {
  document
    .querySelectorAll("#placement-gameboard .board-cell.ship-hover")
    .forEach((cell) => {
      cell.classList.remove("ship-hover");
    });
}
