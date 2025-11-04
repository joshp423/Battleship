
export function occupiedGrid(coords, length, direction) {
    let grid = [];
    if (direction === "Vertical") {
        for (let y = coords[0]; y < length + coords[0]; y++) {
            if (y + length >= 10) {
                return "Ship out of bounds, ships will always face down when set vertically.";
            }
            grid.push([y, coords[1]]);
        }
    }
    else if (direction === "Horizontal") {
        for (let x = coords[0]; x < length + coords[1]; x++) {
            if (x + length >= 10) {
                return "Ship out of bounds, ships will always face right when set horizontally.";
            }
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