/* eslint-disable no-plusplus */

export default class Ship {
  constructor(shipType, shipLength) {
    this.shipType = shipType;
    this.shipLength = shipLength;
    this.hitCount = 0;
    this.isSunk = false;
  }

  hit() {
    if (this.hitCount < this.shipLength) {
      this.hitCount++;

      if (this.hitCount === this.shipLength) {
        this.isSunk = true;
      }
    }
  }

  updateSunkStatus() {
    if (this.hitCount === this.shipLength) {
      this.isSunk = true;
    }
  }
}
