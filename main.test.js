import { occupiedGrid } from "./shipClass";
import { Gameboard } from "./gameboardClass";

test('ship is recording its coords correctly', () => {
    expect(occupiedGrid([5, 5], 2, "horizontal")).toMatchObject([[5, 5], [5, 6]]);
});

test('ship throws an error when going over game board', () => {
    expect(occupiedGrid([8, 8], 2, "vertical")).toBe("Ship out of bounds, ships will always face north when set vertically.");
});

describe('creating new gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
        gameboard.placeShip(2, "horizontal", [5, 5],);
    });

    test('when ship is placed shows up in gameboard.ships array', () => {
        expect(gameboard.ships.length).toBe(1);
    });

    test('when ship is placed shows up correctly in gameboard.ships array', () => {
        expect(gameboard.ships).toMatchObject([{"direction": "horizontal", "hits": 0, "length": 2, "occupiedGrid": [[5, 5], [5, 6]], "sunk": false}]);
    });

    
});

describe('creating new gameboard', () => {
    let gameboard;

    beforeEach(() => {
        gameboard = new Gameboard();
        gameboard.placeShip(2, "horizontal", [4, 4],);
        gameboard.receiveAttack(4, 4);
    });

    test('Grid to be initialised correctly', () => {
        expect(gameboard.grid[44]).toMatchObject({"hit": true,"occupied": true,"x": 4,"y": 4,})
    });

});