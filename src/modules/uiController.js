/* eslint-disable no-plusplus */

export default function createBoard(boardId, rows, columns) {
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
