//checking if a square is occupied then using return to change or retain colour
export function occupiedCheck(gameBoardShips, squareArray, length, shipDirection){

    let shipCheckArray = [];
    if (shipDirection === "Vertical") {
        for (let i = 0; i < length; i++) {
            shipCheckArray.push([squareArray[0] + i, squareArray[1]])
        }
    }
    else {
        for (let i = 0; i < length; i++) {
            shipCheckArray.push([squareArray[0], squareArray[1] + i])
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