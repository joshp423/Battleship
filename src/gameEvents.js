import { occupiedCheck } from "./occupiedCheck";
import { Player } from "./playerClass";
import { discoveredCheck } from "./discoveredCheck";
import { renderContent } from "./renderContent";

export class GameEvents {
    constructor(playerHuman){
        this.playerHuman = playerHuman;
        this.playerCPU = new Player("CPU");
        this.discoveredSquaresHuman = null;
        this.discoveredSquaresCPU = [];
        this.turn = "Player";
    }

    setUpEventListenersOpponentBoard(){
        const opponentGameBoardDivs = document.querySelectorAll('.opponentGameBoardDivs');
        for (let i = 0; i < opponentGameBoardDivs.length; i++) {
            let squareArray = opponentGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);
            let discovered = null;
            
            opponentGameBoardDivs[i].addEventListener('mouseenter', () => {
                if (this.discoveredSquaresHuman) {
                    discovered = discoveredCheck(this.discoveredSquaresHuman, squareArray)
                }
                if (this.turn === "Player") {
                    //change border style?
                    if (discovered === false || discovered === null) {
                        opponentGameBoardDivs[i].style.backgroundColor = "orange";
                    }
                }
            })
            opponentGameBoardDivs[i].addEventListener('mouseout', () => {
                if (this.discoveredSquaresHuman) {
                    discovered = discoveredCheck(this.discoveredSquaresHuman, squareArray)
                }
                if (this.turn === "Player") {
                    if (discovered === false || discovered === null) {
                        opponentGameBoardDivs[i].style.backgroundColor = "white";
                    }
                }
            })
            opponentGameBoardDivs[i].addEventListener('click', () => {
                let turnResult = null;
                if (this.discoveredSquaresHuman) {
                    discovered = discoveredCheck(this.discoveredSquaresHuman, squareArray)
                }
                if (this.turn === "Player") {
                    
                    const occupied = occupiedCheck(this.playerCPU.gameBoard.ships, squareArray, 1, "Vertical");
                    if (!occupied) {
                        opponentGameBoardDivs[i].style.backgroundColor = "blue";
                        turnResult = "Miss";
                    }
                    else {
                        opponentGameBoardDivs[i].style.backgroundColor = "red";
                        this.playerCPU.gameBoard.receiveAttack(squareArray[0], squareArray[1]);
                        turnResult = "Make";
                    }
                    if (!this.discoveredSquaresHuman) {
                        this.discoveredSquaresHuman = [];
                        this.discoveredSquaresHuman.push(opponentGameBoardDivs[i].id.split(",").map(Number));
                    }
                    else {
                        if (discovered === false) {
                            this.discoveredSquaresHuman.push(opponentGameBoardDivs[i].id.split(",").map(Number));
                        }
                    }
                    this.turn === "CPU";

                    renderContent.renderGameTurns(this.turn, this.GameEvents, turnResult)
                    
                }
            })
        }
    }
    CPUgameTurn() {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs');
        let turnResult = null;
        let y = Math.floor(Math.random() * 10);
        let x = Math.floor(Math.random() * 10);
        const squareArray = [y, x];
        const occupied = occupiedCheck(this.playerHuman.gameBoard.ships, squareArray, 1, "Horizontal");
        this.discoveredSquaresCPU.forEach((square) => {
            if (!square[0] === y && square[1] === x) {

            }
        })
        if (!occupied) {
            opponentGameBoardDivs[i].style.backgroundColor = "blue";
            turnResult = "Miss";
            this.discoveredSquaresCPU.push([y, x])
        }
        else {
            opponentGameBoardDivs[i].style.backgroundColor = "red";
            this.playerCPU.gameBoard.receiveAttack(squareArray[0], squareArray[1]);
            turnResult = "Make";
        }
        if (!this.discoveredSquares) {
            this.discoveredSquares = [];
            this.discoveredSquares.push(opponentGameBoardDivs[i].id.split(",").map(Number));
        }
        else {
            if (discovered === false) {
                this.discoveredSquares.push(opponentGameBoardDivs[i].id.split(",").map(Number));
            }
        }
        this.turn === "CPU";

        renderContent.renderGameTurns(this.turn, this.GameEvents, turnResult)
                    
    }
}
