export class Ship {
    constructor(length, direction, coords) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.direction = direction;
        this.occupiedGrid = function occupiedGrid(coords) {
            if (direction = "vertical") {
                for (let y = coords[0]; y < this.length; y++) {
                    if (y + length > 10) {
                        throw console.error("Ship out of bounds, ships will always face north when set vertically.");
                    }
                    this.occupiedGrid.push([y, coords[1]])
                }
            }
            else if (direction = "horizontal") {
                for (let x = coords[0]; x < this.length; x++) {
                    if (x + length > 10) {
                        throw console.error("Ship out of bounds, ships will always face north when set vertically.");
                    }
                    this.occupiedGrid.push([coords[0], x])
                }
            }
        };
        
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