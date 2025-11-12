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

    setUpEventListenersOpponentBoard(Game){
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
                        turnResult = "Hit";
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
                    //needs to be win check function
                    let playerWin = this.checkWinCondition(this.playerCPU.gameBoard.ships);
                    let cpuWin = this.checkWinCondition(this.playerHuman.gameBoard.ships);
                    if (playerWin === true){

                    }
                    if (cpuWin === true) {
                        
                    }
                    renderContent.renderTurnFeedback(turnResult);
                    this.turn = "CPU";
                    window.setTimeout(() => {
                        this.CPUgameTurn();
                        renderContent.renderGameTurns(this.turn, Game, turnResult);
                        
                        
                        this.turn = "Player";
                        renderContent.renderGameTurns(this.turn, Game, turnResult);
                    }, 2000);


                }
            })
        }
    }

    CPUgameTurn() {
        const self = this;
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs');
        let turnResult = null;
        let y = Math.floor(Math.random() * 10);
        let x = Math.floor(Math.random() * 10);
        let squareArray = [y, x];
        let discovered = discoveredCheck(this.discoveredSquaresCPU, squareArray);
        let binaryDone = 0;
        

        while(binaryDone < 1) {
            if (!discovered){
                const occupied = occupiedCheck(this.playerHuman.gameBoard.ships, squareArray, 1, "Horizontal");
                this.discoveredSquaresCPU.push([y, x]);
                for (let i = 0; i < playerGameBoardDivs.length; i++) {
                    let divArray = playerGameBoardDivs[i].id.split(",").map(Number);
                    if (divArray [0] === y && divArray[1] === x) {
                        if (occupied) {
                                playerGameBoardDivs[i].style.backgroundColor = "red";
                                self.playerHuman.gameBoard.receiveAttack(y, x);
                                turnResult = "Hit";
                                binaryDone++;
                            }
                        else {
                            playerGameBoardDivs[i].style.backgroundColor = "blue";
                            turnResult = "Miss";
                            binaryDone++;
                        }
                    }
                }
            }
            else {
                y = Math.floor(Math.random() * 10);
                x = Math.floor(Math.random() * 10);
                squareArray = [y, x];
                discovered = discoveredCheck(this.discoveredSquaresCPU, squareArray);
            }
        }
    }

    checkWinCondition(entityShips) {
        for (let i = 0; i < 5; i++) {
                if (entityShips[i].sunk === false) {
                    return false;
                }
        }
        return true;    
    }
}
