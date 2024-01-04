/* eslint-disable no-plusplus */
import Ship from "./ship";

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

  getShipCoordinates() {
    const shipCoordinates = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j] instanceof Ship) {
          shipCoordinates.push({ row: i, col: j });
        }
      }
    }
    return shipCoordinates;
  }

  isAttackValid(rowIndex, columnIndex) {
    return (
      rowIndex >= 0 &&
      rowIndex < this.rows &&
      columnIndex >= 0 &&
      columnIndex < this.columns
    );
  }

  markCellAsAttacked(rowIndex, columnIndex, result) {
    this.board[rowIndex][columnIndex] = result;
  }

  receiveAttack(rowIndex, columnIndex) {
    if (!this.isAttackValid(rowIndex, columnIndex)) {
      return true;
    }

    const target = this.board[rowIndex][columnIndex];

    if (target === "hit" || target === "miss") {
      return false;
    }

    if (target instanceof Ship) {
      target.hit();
      this.markCellAsAttacked(rowIndex, columnIndex, "hit");
      return true;
    }
    this.markCellAsAttacked(rowIndex, columnIndex, "miss");
    return true;
  }

  areAllShipsSunk() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const cell = this.board[i][j];
        if (cell instanceof Ship && !cell.isSunk) {
          return false;
        }
      }
    }
    return true;
  }
}
