import { Player, AiPlayer } from "../modules/player";
import GameController from "../modules/gameController";

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

test('gameController checks for win conditions after each players turn', () => {
    const humanPlayer = new Player("Human Player");
    const aiPlayer = new AiPlayer("AI Player");
    const gameController = new GameController(humanPlayer, aiPlayer);

    gameController.initializeGame();
    
    // Place ships and simulate attacks that lead to one player winning
    // ...

    // Assert that the gameController recognizes the win condition
    expect(gameController.checkWin()).toBe(true);
    expect(gameController.winningPlayer).toBe(humanPlayer); // or aiPlayer, depending on your test setup
});
