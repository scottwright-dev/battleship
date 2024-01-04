/* eslint-disable max-classes-per-file */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
export class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = null;
  }

  setGameBoard(gameBoard) {
    this.gameBoard = gameBoard;
  }

  sendAttack(rowIndex, colIndex, opponentsBoard) {
    return opponentsBoard.receiveAttack(rowIndex, colIndex);
  }
}

export class AiPlayer extends Player {
  constructor(name) {
    super(name);
    this.attackedCoordinates = Array(10)
      .fill(null)
      .map(() => Array(10).fill(false));
    this.lastAttack = null;
  }

  makeRandomAttack(opponentsBoard) {
    let rowIndex;
    let colIndex;
    do {
      rowIndex = Math.floor(Math.random() * 10);
      colIndex = Math.floor(Math.random() * 10);
    } while (this.attackedCoordinates[rowIndex][colIndex]);

    this.attackedCoordinates[rowIndex][colIndex] = true;
    this.lastAttack = [rowIndex, colIndex];
    return this.sendAttack(rowIndex, colIndex, opponentsBoard);
  }

  getLastAttack() {
    return this.lastAttack;
  }
}
