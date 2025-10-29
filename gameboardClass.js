import { GridSquare } from "./gridClass";

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
        this.shipsRemaining = 0;
    }
    receiveAttack(x, y) {

        this.grid.forEach((square) => {
            if (square.x === x && square.y === y) {
                square.hit = true;
            }
        })
    }


}
