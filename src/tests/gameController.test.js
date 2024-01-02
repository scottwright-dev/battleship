import { Player, AiPlayer } from "../modules/player";
import GameController from "../modules/gameController";
import Ship from "../modules/ship";

test("gameController is correctly initialized with two players (one human and one AI) and their game boards", () => {
  const humanPlayer = new Player("Human PLayer");
  const aiPlayer = new AiPlayer("Ai Player");
  const gameController = new GameController(humanPlayer, aiPlayer);

  gameController.initializeGame();

  expect(humanPlayer.gameBoard).toBeDefined();
  expect(aiPlayer.gameBoard).toBeDefined();
});

test("gameController sets up game with human player to be player 1", () => {
  const humanPlayer = new Player("Human PLayer");
  const aiPlayer = new AiPlayer("Ai Player");
  const gameController = new GameController(humanPlayer, aiPlayer);

  gameController.initializeGame();

  expect(gameController.currentPlayer).toBe(humanPlayer);
});

test("GameController allows players to take turns, alternating between one turn each", () => {
  const humanPlayer = new Player("Human PLayer");
  const aiPlayer = new AiPlayer("Ai Player");
  const gameController = new GameController(humanPlayer, aiPlayer);

  gameController.initializeGame();
  expect(gameController.currentPlayer).toBe(humanPlayer);

  gameController.switchPlayer();
  expect(gameController.currentPlayer).toBe(aiPlayer);
  gameController.switchPlayer();
  expect(gameController.currentPlayer).toBe(humanPlayer);
});

test("checkWin method returns null after each round if no player has sunk all opponent's ships", () => {
  const humanPlayer = new Player("Human Player");
  const aiPlayer = new AiPlayer("AI Player");
  const gameController = new GameController(humanPlayer, aiPlayer);

  gameController.initializeGame();

  const humanShip = new Ship("patrol boat", 2);
  humanPlayer.gameBoard.placeShip(humanShip, 0, 0, true);

  const aiShip = new Ship("patrol boat", 2);
  aiPlayer.gameBoard.placeShip(aiShip, 1, 0, true);

  humanPlayer.sendAttack(1, 0, aiPlayer.gameBoard);
  expect(gameController.checkWin()).toBeNull();
});

test("checkWin method returns human player after a round where all AI ships are sunk", () => {
  const humanPlayer = new Player("Human Player");
  const aiPlayer = new AiPlayer("AI Player");
  const gameController = new GameController(humanPlayer, aiPlayer);

  gameController.initializeGame();

  const aiShip = new Ship("patrol boat", 2);
  aiPlayer.gameBoard.placeShip(aiShip, 1, 0, true);

  const humanShip = new Ship("patrol boat", 2);
  humanPlayer.gameBoard.placeShip(humanShip, 0, 0, true);

  humanPlayer.sendAttack(1, 0, aiPlayer.gameBoard);
  humanPlayer.sendAttack(1, 1, aiPlayer.gameBoard); 

  const winner = gameController.checkWin();

  expect(winner).toBe("Human Player");
});

test("checkWin method returns AI player after a round where all human player's ships are sunk", () => {
  const humanPlayer = new Player("Human Player");
  const aiPlayer = new AiPlayer("AI Player");
  const gameController = new GameController(humanPlayer, aiPlayer);

  gameController.initializeGame();

  const aiShip = new Ship("patrol boat", 2);
  aiPlayer.gameBoard.placeShip(aiShip, 1, 0, true);

  const humanShip = new Ship("patrol boat", 2);
  humanPlayer.gameBoard.placeShip(humanShip, 0, 0, true);

  aiPlayer.sendAttack(0, 0, humanPlayer.gameBoard);
  aiPlayer.sendAttack(0, 1, humanPlayer.gameBoard);

  const winner = gameController.checkWin();

  expect(winner).toBe("AI Player");
});
