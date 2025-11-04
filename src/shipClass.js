
export function occupiedGrid(coords, length, direction) {
    let grid = [];
    if (direction === "Vertical") {
        for (let y = coords[0]; y < length + coords[0]; y++) {
            grid.push([y, coords[1]]);
        }
    }
    else if (direction === "Horizontal") {
        for (let x = coords[1]; x < length + coords[1]; x++) {
            grid.push([coords[0], x]);
        }
    }
    return grid;
};

export class Ship {
    constructor(length, direction, coords) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.direction = direction;
        this.occupiedGrid = occupiedGrid(coords, this.length, this.direction);
    }

    hit(){
        this.hits += 1;
        this.isSunk()
    }

    isSunk() {
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }
}