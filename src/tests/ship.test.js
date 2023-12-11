/* eslint-disable no-plusplus */

import Ship from "../modules/ship";

test("createShip creates objects with properties: shipType, shipLength, hitCount, isSunk", () => {
  const battleShip = new Ship("battleship", 3);

  expect(battleShip).toEqual({
    shipType: "battleship",
    shipLength: 3,
    hitCount: 0,
    isSunk: false,
  });
});

test("hit method increments hitCount on a ship object by one", () => {
  const battleship = new Ship("battleship", 3);

  battleship.hit();

  expect(battleship.hitCount).toBe(1);
});

test("hit method does not increment hitCount beyond shipLength", () => {
  const patrolBoat = new Ship("patrol boat", 2);

  for (let i = 0; i < patrolBoat.shipLength + 1; i++) {
    patrolBoat.hit();
  }

  expect(patrolBoat.hitCount).toBeLessThanOrEqual(patrolBoat.shipLength);
});

test("isSunk returns true when hitCount === shipLength", () => {
  const sunkenShip = new Ship("carrier", 5);

  for (let i = 0; i < sunkenShip.shipLength; i++) {
    sunkenShip.hit();
  }

  sunkenShip.updateSunkStatus();

  expect(sunkenShip.isSunk).toBe(true);
});
