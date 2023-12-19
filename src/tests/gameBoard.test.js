/* eslint-disable no-plusplus */
import GameBoard from "../modules/gameBoard";
import Ship from "../modules/ship";

test("Gameboard class is defined", () => {
  const gameBoard = new GameBoard();
  expect(gameBoard).toBeDefined();
});

test("Gameboard is initialized as a 2d array with all null values", () => {
  const gameBoard = new GameBoard();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      expect(gameBoard.board[i][j]).toBe(null);
    }
  }
});

test("Ships can be placed at specific coordinates by calling Ship class", () => {
  const gameBoard = new GameBoard();
  const battleship = new Ship("battleship", 3);

  gameBoard.placeShip(battleship, 0, 1);

  expect(gameBoard.board[0][1]).toBe(battleship);
});

test("Ships do not overlap other ships", () => {
  const gameBoard = new GameBoard();
  const battleship = new Ship("battleship", 3);
  const carrier = new Ship("carrier", 5);

  gameBoard.placeShip(battleship, 0, 0, true);
  const overlap1 = gameBoard.placeShip(carrier, 0, 1, true);
  const overlap2 = gameBoard.placeShip(carrier, 0, 0, false);

  expect(overlap1).toBe(false);
  expect(overlap2).toBe(false);
});

test("Ships cannot be placed out of board boundary", () => {
  const gameBoard = new GameBoard();
  const battleship = new Ship("battleship", 4);

  const result = gameBoard.placeShip(battleship, 9, 9);

  expect(result).toBe(false);
});
