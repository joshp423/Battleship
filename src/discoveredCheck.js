//checking if a square is discovered then using return to change or retain colour
export function discoveredCheck(discoveredSquares, squareArray) {
    for (const square of discoveredSquares) {
        if (square[0] === squareArray[0] && square[1] === squareArray[1]) {
            return true;
        }
    }
    return false;
}