import {
  createBoard,
  setupCellClickHandler,
  colorPlayerShips,
  setupRestartButtonListener,
  setupShipPlacementModal,
} from "./uiController";
import GameController from "./gameController";
import { Player, AiPlayer } from "./player";

export default class GameSetup {
  constructor() {
    this.player1 = new Player("Human Player");
    this.player2 = new AiPlayer("Ai Player");
    this.gameController = new GameController(this.player1, this.player2);
  }

  initialize() {
    this.gameController.initializeGame();

    createBoard("p1-gameboard", 10, 10, this.player1.gameBoard);
    createBoard("p2-gameboard", 10, 10);

    setupShipPlacementModal(this.player1);
    const shipPlacementModal = document.getElementById("ship-placement-modal");
    shipPlacementModal.showModal();

    shipPlacementModal.addEventListener("close", () => {
      colorPlayerShips("p1-gameboard", this.player1.gameBoard);
    });

    setupCellClickHandler(
      "p2-gameboard",
      this.player1,
      this.player2,
      this.gameController,
    );
    setupRestartButtonListener(this);
  }
}
