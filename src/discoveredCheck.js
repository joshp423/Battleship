//checking if a square is discovered then using return to change or retain colour
export function discoveredCheck(discoveredSquares, squareArray){

    let squareCheckArray = [squareArray[0], squareArray[1]];
    //have to use for of instead of for each to exit function immediately with return
    for (const square of discoveredSquares) {
        for (const squares of squareCheckArray) {
            if (square[0] === squares[0] && square[1] === squares[1]) {
                    return true;
            }
        }
    }
    return false;
}