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

  placeShip(ship, rowIndex, columnIndex, isHorizontal = true) {
    if (isHorizontal) {
      let canPlaceHorizontally = true;
      for (let i = 0; i < ship.shipLength; i++) {
        if (
          columnIndex + i >= this.columns ||
          this.board[rowIndex][columnIndex + i] !== null
        ) {
          canPlaceHorizontally = false;
          break;
        }
      }

      if (canPlaceHorizontally) {
        for (let i = 0; i < ship.shipLength; i++) {
          this.board[rowIndex][columnIndex + i] = ship;
        }
        return true;
      }
    }

    if (!isHorizontal) {
      let canPlaceVertically = true;
      for (let i = 0; i < ship.shipLength; i++) {
        if (
          rowIndex + i >= this.rows ||
          this.board[rowIndex + i][columnIndex] !== null
        ) {
          canPlaceVertically = false;
          break;
        }
      }

      if (canPlaceVertically) {
        for (let i = 0; i < ship.shipLength; i++) {
          this.board[rowIndex + i][columnIndex] = ship;
        }
        return true;
      }
    }

    return false;
  }

  // helper method for placeShip & receiveAttack to check out of bounds
  isValidPlacement(rowIndex, columnIndex) {
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
