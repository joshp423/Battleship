import { GridSquare } from "./gridClass";
import { occupiedGrid, Ship } from "./shipClass";

function createGrid(){
            let gridArray = [];
            let y = 0;
            while (y < 10) {
                let x = 0;
                while (x < 10) {
                    gridArray.push(new GridSquare(x, y))
                    x++
                }
                y++;
            }
            return gridArray;
        }     
export class Gameboard {
    constructor() {
        //grid of objects - occupied, hit, x, y
        this.grid = createGrid();
        this.ships = [];
    }

    receiveAttack(y, x) {

        this.grid.forEach((square) => {
            if (square.x === x && square.y === y) {
                square.hit = true;

                if (square.occupied === true) {

                    //search for ship by searching ship.gridCoords then send hit function to ship and check for sunk status.
                    this.ships.forEach((ship) => {

                        ship.occupiedGrid.forEach((squareOccupied) => {

                            if (squareOccupied[0] === y && squareOccupied[1] === x) {
                                ship.hit()

                                //if ship sunk remove from gameboard array - might be better to use array method to remove.
                                if (ship.sunk === true) {
                                    ship = "";
                                }
                            }
                        }) 
                    })
                    
                }
            }
        })

    }

    placeShip(length, direction, coords) {
        // call new ship object and add it to this.ships
        this.ships.push(new Ship (length, direction, coords))
        let gridPosition;
        if (direction === "vertical") {
            for (let y = coords[0]; y < length + coords[0]; y++) {
                if (y + length >= 10) {
                    return "Ship out of bounds, ships will always face north when set vertically.";
                }
                gridPosition = this.grid.findIndex(cell => cell.x === coords[1] && cell.y === y)
                this.grid[gridPosition].occupied = true;
            }
        }
        else if (direction === "horizontal") {
            for (let x = coords[1]; x < length + coords[1]; x++) {
                if (x + length >= 10) {
                    return "Ship out of bounds, ships will always face right when set horizontally.";
                }
                gridPosition = this.grid.findIndex(cell => cell.x === x && cell.y === coords[0])
                this.grid[gridPosition].occupied = true;
            }
        }
    };



}
