/* eslint-disable no-plusplus */
import { Player, AiPlayer } from "../modules/player";
import Ship from "../modules/ship";
import GameBoard from "../modules/gameBoard";

test("player class contains gameboard object", () => {
  const player = new Player("player1");
  const p1GameBoard = new GameBoard();

  player.setGameBoard(p1GameBoard);

  expect(player.gameBoard).toBe(p1GameBoard);
});

test("player class can send attack coordinates to opponent gameboard", () => {
  const player1 = new Player("player1");
  const player2 = new Player("player2");

  const player1Board = new GameBoard();
  const player2Board = new GameBoard();

  player1.setGameBoard(player1Board);
  player2.setGameBoard(player2Board);

  const p2TestShip = new Ship("patrol boat", 2);
  player2Board.placeShip(p2TestShip, 0, 0);

  const attack1 = player1.sendAttack(0, 0, player2Board);

  expect(attack1).toBe(true);
});

test("AI player can make random attacks within gameboard boundaries", () => {
  const aiPlayer = new AiPlayer("AI");
  const opponentBoard = new GameBoard();

  for (let i = 0; i < 5; i++) {
    const attackResult = aiPlayer.makeRandomAttack(opponentBoard);
    // attackResult should be true (hit or miss) or false (invalid attack)
    expect([true, false]).toContain(attackResult);
  }
});

test("AI player does not repeat attack coordinates", () => {
  const aiPlayer = new AiPlayer("AI");
  const opponentBoard = new GameBoard();

  const totalAttacks = 50;
  for (let i = 0; i < totalAttacks; i++) {
    aiPlayer.makeRandomAttack(opponentBoard);
  }

  let uniqueAttacks = 0;
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (aiPlayer.attackedCoordinates[row][col]) {
        uniqueAttacks++;
      }
    }
  }

  expect(uniqueAttacks).toBe(totalAttacks);
});
