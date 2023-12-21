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

test("receiveAttack: returns true for out-of-bounds attacks", () => {
  const newBoard = new GameBoard();
  expect(newBoard.receiveAttack(-1, 15)).toBe(true);
  expect(newBoard.receiveAttack(0, 11)).toBe(true);
  expect(newBoard.receiveAttack(10, 0)).toBe(true);
});

test("receiveAttack: registers hit on ship and increments hitCount", () => {
  const newBoard = new GameBoard();
  const patrolBoat = new Ship("patrol boat", 2);

  newBoard.placeShip(patrolBoat, 2, 2);
  const attack = newBoard.receiveAttack(2, 2);

  expect(attack).toBe(true);
  expect(patrolBoat.hitCount).toBe(1);
});

test("Repeated attacks on the same cell are not allowed", () => {
  const gameBoard = new GameBoard();
  const patrolBoat = new Ship("patrol boat", 2);
  gameBoard.placeShip(patrolBoat, 0, 0);

  expect(gameBoard.receiveAttack(0, 0)).toBe(true);
  expect(gameBoard.receiveAttack(0, 0)).toBe(false);
});

test("Cells are marked as 'miss' if the attack misses a ship", () => {
  const gameBoard = new GameBoard();
  gameBoard.receiveAttack(0, 0);

  expect(gameBoard.board[0][0]).toBe("miss");
});

test("GameBoard can report if all ships have been sunk", () => {
  const gameBoard = new GameBoard();
  const ship1 = new Ship("carrier", 5);
  const ship2 = new Ship("battleship", 4);
  const ship3 = new Ship("destroyer", 3);
  const ship4 = new Ship("submarine", 3);
  const ship5 = new Ship("patrol boat", 2);

  gameBoard.placeShip(ship1, 0, 0);
  gameBoard.placeShip(ship2, 2, 0);
  gameBoard.placeShip(ship3, 4, 0);
  gameBoard.placeShip(ship4, 6, 0);
  gameBoard.placeShip(ship5, 8, 0);

  // Sink all 5 ships
  for (let i = 0; i < ship1.shipLength; i++) {
    gameBoard.receiveAttack(0, i);
  }

  for (let i = 0; i < ship2.shipLength; i++) {
    gameBoard.receiveAttack(2, i);
  }

  for (let i = 0; i < ship3.shipLength; i++) {
    gameBoard.receiveAttack(4, i);
  }

  for (let i = 0; i < ship4.shipLength; i++) {
    gameBoard.receiveAttack(6, i);
  }

  for (let i = 0; i < ship5.shipLength; i++) {
    gameBoard.receiveAttack(8, i);
  }

  ship1.updateSunkStatus();
  ship2.updateSunkStatus();
  ship3.updateSunkStatus();
  ship4.updateSunkStatus();
  ship5.updateSunkStatus();

  expect(gameBoard.areAllShipsSunk()).toBe(true);
});
