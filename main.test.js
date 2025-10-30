import { occupiedGrid } from "./shipClass";
import { Gameboard } from "./gameboardClass";
import { describe } from "yargs";

test('ship throws an error when going over game board', () => {
    expect(occupiedGrid([5, 5], 2, "horizontal")).toMatchObject([[5, 5], [6, 5]]);
});

test('ship throws an error when going over game board', () => {
    expect(occupiedGrid([8, 8], 2, "vertical")).toBe("Ship out of bounds, ships will always face north when set vertically.");
});

describe("creating new gameboard", () => {

    beforeEach(() => {
        return new Gameboard()
    });
    test('when ship is placed shows up correctly in gameboard.ships array', () => {
        expect(Gameboard.placeship(2, "horizontal", [5, 5],))

    });
});