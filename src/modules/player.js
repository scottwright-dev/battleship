/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
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
    // 2D array to keep track of the coords already attacked
    this.attackedCoordinates = Array(10)
      .fill(null)
      .map(() => Array(10).fill(false));
  }

  makeRandomAttack(opponentsBoard) {
    let rowIndex;
    let colIndex;
    do {
      rowIndex = Math.floor(Math.random() * 10);
      colIndex = Math.floor(Math.random() * 10);
    } while (this.attackedCoordinates[rowIndex][colIndex]); // Checks if coord was already attacked

    this.attackedCoordinates[rowIndex][colIndex] = true; // Mark coord as attacked
    return this.sendAttack(rowIndex, colIndex, opponentsBoard);
  }
}
