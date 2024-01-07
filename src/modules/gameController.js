import GameBoard from "./gameBoard";
import Ship from "./ship";

export default class GameController {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
  }

  initializeGame() {
    this.player1.setGameBoard(new GameBoard());
    this.player2.setGameBoard(new GameBoard());
    this.placeAiShips();
  }

  placeAiShips() {
    const ships = [
      new Ship("Carrier", 5),
      new Ship("Battleship", 4),
      new Ship("Destroyer", 3),
      new Ship("Submarine", 3),
      new Ship("Patrol Boat", 2),
    ];
    ships.forEach((ship) => {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const isHorizontal = Math.random() > 0.5;
        placed = this.player2.gameBoard.placeShip(ship, row, col, isHorizontal);
      }
    });
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
