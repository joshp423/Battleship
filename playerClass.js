import { Gameboard } from "./gameboardClass";

export class Player {
    constructor(playerType){
        this.playerType = playerType;
        this.gameBoard = new Gameboard();
    }
}