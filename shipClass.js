export class Ship {
    constructor(length, occupiedGrid) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.occupiedGrid = occupiedGrid;
    }

    hit(){
        this.hits += 1;
    }

    isSunk() {
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }
}