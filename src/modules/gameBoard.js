/* eslint-disable no-plusplus */

export default class GameBoard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.board = this.createBoard();
  }

  createBoard() {
    const boardArray = [];
    for (let i = 0; i < this.rows; i++) {
      boardArray[i] = [];
      for (let j = 0; j < this.columns; j++) {
        boardArray[i][j] = null;
      }
    }
    return boardArray;
  }

  placeShip(ship, rowIndex, columnIndex) {
    if (!this.isValidPlacement(ship, rowIndex, columnIndex)) {
      return false;
    }

    if (ship.shipLength === 1) {
      this.board[rowIndex][columnIndex] = ship;
    } else if (ship.shipLength > 1) {
      if (
        this.isValidPlacement(ship, rowIndex, columnIndex + ship.shipLength - 1)
      ) {
        for (let i = 0; i < ship.shipLength; i++) {
          this.board[rowIndex][columnIndex + i] = ship;
        }
      } else if (
        this.isValidPlacement(ship, rowIndex + ship.shipLength - 1, columnIndex)
      ) {
        for (let i = 0; i < ship.shipLength; i++) {
          this.board[rowIndex + i][columnIndex] = ship;
        }
      } else {
        return false;
      }
    }

    return true;
  }

  isValidPlacement(ship, rowIndex, columnIndex) {
    if (
      rowIndex >= 0 &&
      rowIndex < this.rows &&
      columnIndex >= 0 &&
      columnIndex < this.columns
    ) {
      if (this.board[rowIndex][columnIndex] === null) {
        return true;
      }
    }
    return false;
  }
}
