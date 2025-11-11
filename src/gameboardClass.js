import { GridSquare } from "./gridClass";
import { occupiedCheck } from "./occupiedCheck";
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

                                //if ship sunk turn red on board instead of deleting - WIP
                                if (ship.sunk === true) {
                                    
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
        if (direction === "Vertical") {
            for (let y = coords[0]; y < length + coords[0]; y++) {
                if (y + length >= 10) {
                    return "Ship out of bounds, ships will always face downwards when set vertically.";
                }
                gridPosition = this.grid.findIndex(cell => cell.x === coords[1] && cell.y === y)
                this.grid[gridPosition].occupied = true;
            }
        }
        else if (direction === "Horizontal") {
            for (let x = coords[1]; x < length + coords[1]; x++) {
                if (x + length >= 10) {
                    return "Ship out of bounds, ships will always face right when set horizontally.";
                }
                gridPosition = this.grid.findIndex(cell => cell.x === x && cell.y === coords[0])
                this.grid[gridPosition].occupied = true;
            }
        }
    };

    createFleetRandom(gameBoardShips) {
        const self = this;
        let counter = 0;
        while (counter < 5) {
            let y = Math.floor(Math.random() * 10);
            let x = Math.floor(Math.random() * 10);
            let length;
            let directionDecider = Math.floor(Math.random() * 2);
            let direction;
            if (directionDecider === 0) {
                direction = "Horizontal";
            }
            else {
                direction = "Vertical";
            }
            if (counter === 0 ) {
                length = 5;
                placeShipRandom(length, direction, y, x);
            }
            else if (counter === 1) {
                length = 4;
                placeShipRandom(length, direction, y, x);
                
            }
            else if (counter === 2 || counter === 3) {
                length = 3;
                placeShipRandom(length, direction, y, x);
            }
            else if (counter === 4) {
                length = 2;
                placeShipRandom(length, direction, y, x);
            }
        }
        function existingCheck(gameBoardShips, shipDirection, length, y, x) {
            let shipCheckArray = [];
            if (shipDirection === "Vertical") {
                for (let i = 0; i < length; i++) {
                    shipCheckArray.push([y + i, x])
                }
            }
            else {
                for (let i = 0; i < length; i++) {
                    shipCheckArray.push([y, x + i])
                }
            }
            //have to use for of instead of for each to exit function immediately with return
            for (const ship of gameBoardShips) {
                for (const grid of ship.occupiedGrid) {
                    for (const squares of shipCheckArray) {
                        if (grid[0] === squares[0] && grid[1] === squares[1]) {
                                return true;
                        }
                    }
                }
            }
            return false;
        }
        function placeShipRandom(length, direction, y, x) {
            if (direction === "Horizontal") {
                    if (x + length < 10) {
                        const occupied = existingCheck(gameBoardShips, direction, length, y, x);
                        if (occupied === false) {
                            self.placeShip(length, direction, [y, x]);
                            counter++;
                        }
                    }
                }
            else {
                if (y + length < 10) {
                    const occupied = existingCheck(gameBoardShips, direction, length, y, x);
                    if (occupied === false) {
                        self.placeShip(length, direction, [y, x]);
                        counter++;
                    }
                }
            }
        }
    }



}
