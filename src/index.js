import "./style.css";
import Ship from "./modules/ship";
import {
  createBoard,
  setupCellClickHandler,
  colorPlayerShips,
  setupRestartButtonListener,
} from "./modules/uiController";
import { Player, AiPlayer } from "./modules/player";
import GameController from "./modules/gameController";

// Game Setup
const player1 = new Player("Human Player");
const player2 = new AiPlayer("Ai Player");
const gameController = new GameController(player1, player2);
gameController.initializeGame();

// UI Setup
createBoard("p1-gameboard", 10, 10, player1.gameBoard);
createBoard("p2-gameboard", 10, 10);
setupCellClickHandler("p2-gameboard", player1, player2, gameController);

// p1 manual ship placement for testing
const carrier = new Ship("Carrier", 5);
player1.gameBoard.placeShip(carrier, 0, 0, true);

const battleship = new Ship("Battleship", 4);
player1.gameBoard.placeShip(battleship, 2, 0, false);

const cruiser = new Ship("cruiser", 3);
player1.gameBoard.placeShip(cruiser, 2, 5, true);

const submarine = new Ship("submarine", 3);
player1.gameBoard.placeShip(submarine, 6, 2, false);

const patrolBoat = new Ship("patrol boat", 2);
player1.gameBoard.placeShip(patrolBoat, 8, 7, false);

colorPlayerShips("p1-gameboard", player1.gameBoard);

// p2 manual ship placement for testing
const carrier2 = new Ship("Carrier", 5);
player2.gameBoard.placeShip(carrier2, 0, 0, true);

const battleship2 = new Ship("Battleship", 4);
player2.gameBoard.placeShip(battleship2, 2, 0, false);

const cruiser2 = new Ship("cruiser", 3);
player2.gameBoard.placeShip(cruiser2, 2, 5, true);

const submarine2 = new Ship("submarine", 3);
player2.gameBoard.placeShip(submarine2, 6, 2, false);

const patrolBoat2 = new Ship("patrol boat", 2);
player2.gameBoard.placeShip(patrolBoat2, 8, 7, false);

setupRestartButtonListener(player1, player2);
