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
        this.ships = null;
    }
    receiveAttack(x, y) {

        this.grid.forEach((square) => {
            if (square.x === x && square.y === y) {
                square.hit = true;

                if (square.occupied === true) {

                    //search for ship by searching ship.gridCoords then send hit function to ship and check for sunk status.
                    this.ships.forEach((ship) => {
                        ship.occupiedGrid.forEach((squareOccupied) => {
                            if (squareOccupied[0] === y && squareOccupied[1] === x) {
                                ship.hit()
                                //if ship sunk remove from gameboard array - might be better to use array method.
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
    }


}
