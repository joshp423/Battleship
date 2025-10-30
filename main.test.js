import { Ship } from "./shipClass";

test('ship throws an error when going over game board', () => {
    expect(new Ship(2, "horizontal", [8, 9])).toBe(console.error("Ship out of bounds, ships will always face north when set vertically."));
});