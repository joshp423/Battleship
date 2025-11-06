import { occupiedCheck } from "./occupiedCheck";
import { Player } from "./playerClass";

export class GameEvents {
    constructor(playerHuman){
        this.playerHuman = playerHuman;
        this.playerCPU = new Player("CPU");
        this.turn = "Player";
    }

    setUpEventListenersOpponentBoard(){
        const opponentGameBoardDivs = document.querySelectorAll('.opponentGameBoardDivs');
        for (let i = 0; i < opponentGameBoardDivs.length; i++) {
            opponentGameBoardDivs[i].addEventListener('mouseenter', () => {
                //change border style?
                opponentGameBoardDivs[i].style.backgroundColor = "orange";
            })
            opponentGameBoardDivs[i].addEventListener('mouseout', () => {
                opponentGameBoardDivs[i].style.backgroundColor = "white";
            })
            opponentGameBoardDivs[i].addEventListener('click', () => {
                if (this.turn === "Player") {
                    let squareArray = opponentGameBoardDivs[i].id.split(",");
                    squareArray = squareArray.map(Number);
                    const occupied = occupiedCheck(this.playerCPU.gameBoard.ships, squareArray, 1, "Vertical");
                    if (!occupied) {
                        opponentGameBoardDivs[i].style.backgroundColor = "blue";
                    }
                    else {
                        this.playerCPU.gameBoard.receiveAttack(squareArray[0], squareArray[1]);
                    }
                    
                }
            })
        }
    }
}
