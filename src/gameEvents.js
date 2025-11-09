import { occupiedCheck } from "./occupiedCheck";
import { Player } from "./playerClass";
import { discoveredCheck } from "./discoveredCheck";

export class GameEvents {
    constructor(playerHuman){
        this.playerHuman = playerHuman;
        this.playerCPU = new Player("CPU");
        this.discoveredSquares = null;
        this.turn = "Player";
    }

    setUpEventListenersOpponentBoard(){
        const opponentGameBoardDivs = document.querySelectorAll('.opponentGameBoardDivs');
        for (let i = 0; i < opponentGameBoardDivs.length; i++) {
            let squareArray = opponentGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);
            let discovered = false;
            if (this.discoveredSquares) {
                discovered = discoveredCheck(this.discoveredSquares, squareArray)
            }
            opponentGameBoardDivs[i].addEventListener('mouseenter', () => {
                if (this.turn === "Player") {
                    //change border style?
                    if (discovered === false) {
                        opponentGameBoardDivs[i].style.backgroundColor = "orange";
                    }
                }
            })
            opponentGameBoardDivs[i].addEventListener('mouseout', () => {
                if (this.turn === "Player") {
                    if (discovered === false) {
                        opponentGameBoardDivs[i].style.backgroundColor = "white";
                    }
                }
            })
            opponentGameBoardDivs[i].addEventListener('click', () => {
                if (this.turn === "Player") {
                    
                    const occupied = occupiedCheck(this.playerCPU.gameBoard.ships, squareArray, 1, "Vertical");
                    if (!occupied) {
                        opponentGameBoardDivs[i].style.backgroundColor = "blue";
                    }
                    else {
                        this.playerCPU.gameBoard.receiveAttack(squareArray[0], squareArray[1]);
                    }
                    this.discoveredSquares.push(opponentGameBoardDivs[i].id.split(",").map(Number))
                }
            })
        }
    }
}
