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

test("Placed ships do not overlap on board", () => {
  const gameBoard = new GameBoard();
  const battleship = new Ship("battleship", 3);
  const carrier = new Ship("carrier", 5);

  gameBoard.placeShip(battleship, 0, 1);
  gameBoard.placeShip(carrier, 0, 1);

  expect(gameBoard.placeShip(carrier, 0, 1)).toBe(false);
});

test("Ships cannot be placed out of board boundary", () => {
  const gameBoard = new GameBoard();
  const battleship = new Ship("battleship", 4);

  const result = gameBoard.placeShip(battleship, 9, 9);

  expect(result).toBe(false);
});

/*
Gameboard should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
Gameboard should keep track of missed attacks so they can display them properly.
Gameboard should be able to report whether or not all of their ships have been sunk.
*/
