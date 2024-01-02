import GameBoard from "./gameBoard";

export default class GameController {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
  }

  initializeGame() {
    this.player1.setGameBoard(new GameBoard());
    this.player2.setGameBoard(new GameBoard());
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  checkWin() {
    if (this.player1.gameBoard.areAllShipsSunk()) {
      return this.player2.name;
    }
    if (this.player2.gameBoard.areAllShipsSunk()) {
      return this.player1.name;
    }
    return null;
  }
}
