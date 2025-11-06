import { Player } from "./playerClass";
import { renderContent } from "./renderContent";
import { occupiedCheck } from "./occupiedCheck";

export class ShipEvents {
    constructor () {
        this.shipDirection = "Horizontal";
        this.activeShip = "Carrier";
        this.player = null;
        this.isToggling = false;
    }

    keydownEventSetup() {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')

        addEventListener('keydown', (event) => {
            
            if (event.key === 'c') {
                if (this.shipDirection === "Vertical") {
                    this.shipDirection = "Horizontal";
                    if (!this.player) {
                        for (let i = 0; i < playerGameBoardDivs.length; i++) {
                            playerGameBoardDivs[i].style.backgroundColor = "white";   
                        }
                    }
                    else {
                        for (let i = 0; i < playerGameBoardDivs.length; i++) {
                            
                            playerGameBoardDivs[i].style.backgroundColor = "white";
                            let squareArray = playerGameBoardDivs[i].id.split(",");
                            squareArray = squareArray.map(Number);
                            const occupied = occupiedCheck(this.player.gameBoard.ships, squareArray, 1, this.shipDirection)
                            if (occupied){ 
                                playerGameBoardDivs[i].style.backgroundColor = "grey";
                            }
                        }
                    }
                }

                else {
                    this.shipDirection = "Vertical";
                    if (!this.player) {
                        for (let i = 0; i < playerGameBoardDivs.length; i++) {
                            playerGameBoardDivs[i].style.backgroundColor = "white";   
                        }
                    }
                    else {
                    
                        for (let i = 0; i < playerGameBoardDivs.length; i++) {
                            
                            playerGameBoardDivs[i].style.backgroundColor = "white";
                            let squareArray = playerGameBoardDivs[i].id.split(",");
                            squareArray = squareArray.map(Number);
                            const occupied = occupiedCheck(this.player.gameBoard.ships, squareArray, 1, this.shipDirection)
                            if (occupied){ 
                                playerGameBoardDivs[i].style.backgroundColor = "grey";
                            }
                        }
                    }   
                }
            }
            console.log(this.shipDirection)

        });
    }

    placeCarrierEvents() {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')
    
        for (let i = 0; i < playerGameBoardDivs.length; i++) {
            

            console.log('carrier event')

            //calculate row start and row end so horizontals dont overflow

            const rowStart = Math.floor(i /10) * 10;
            const rowEnd = rowStart + 9;

            playerGameBoardDivs[i].addEventListener('mouseenter', () => {
                console.log('carrier event')
                if (this.shipDirection === "Vertical") {
                    if (playerGameBoardDivs[i + 40]){
                        playerGameBoardDivs[i].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 20].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 30].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 40].style.backgroundColor = "black";
                    }
                }
                else {
                    if (playerGameBoardDivs[i + 4] && i + 5 <= rowEnd){
                        playerGameBoardDivs[i].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 2].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 3].style.backgroundColor = "black";
                        playerGameBoardDivs[i + 4].style.backgroundColor = "black";
                    }
                }
            });

            playerGameBoardDivs[i].addEventListener('mouseout', () => {
                if (this.shipDirection === "Vertical") {
                    if (playerGameBoardDivs[i + 40]){
                        playerGameBoardDivs[i].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 20].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 30].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 40].style.backgroundColor = "white";
                    }
                }
                else {
                    if (playerGameBoardDivs[i + 4] && i + 5 <= rowEnd){
                        playerGameBoardDivs[i].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 2].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 3].style.backgroundColor = "white";
                        playerGameBoardDivs[i + 4].style.backgroundColor = "white";
                    }
                }
            });

            playerGameBoardDivs[i].addEventListener('click', () => {
                //gatekeep the clickfunction for valid clicks
                if (this.shipDirection === "Vertical") {
                    if (playerGameBoardDivs[i + 40]){
                        const playerHuman = new Player("player");
                        let squareArray = playerGameBoardDivs[i].id.split(",");
                        squareArray = squareArray.map(Number);
                        console.log(squareArray);

                        playerHuman.gameBoard.placeShip(5, this.shipDirection, squareArray)
                        console.log(playerHuman.gameBoard.ships);

                        //update class to hold info
                        this.player = playerHuman;
                        this.activeShip = "Battleship"
                        renderContent.renderPlaceRemaining(playerHuman.gameBoard.ships, "Battleship");
                    }
                }
                else {
                    if (playerGameBoardDivs[i + 4] && i + 5 <= rowEnd){
                        const playerHuman = new Player("player");
                        let squareArray = playerGameBoardDivs[i].id.split(",");
                        squareArray = squareArray.map(Number);
                        console.log(squareArray);

                        playerHuman.gameBoard.placeShip(5, this.shipDirection, squareArray)
                        console.log(playerHuman.gameBoard.ships);


                        //update class to hold info
                        this.player = playerHuman;
                        this.activeShip = "Battleship"
                        renderContent.renderPlaceRemaining(this.player.gameBoard.ships, "Battleship");
                        console.log(this.activeShip, this.player)
                    }
                }
            })
        }
    }

    placeRemainingEvents(selectedShip) {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')
        const length = () => {
            if (this.activeShip === "Battleship") {
                return 4;
            }
            if (this.activeShip === "Destroyer" || this.activeShip === "Submarine" ) {
                return 3;
            }
            return 2;
        }
    
        for (let i = 0; i < playerGameBoardDivs.length; i++) {
            
            //calculate row start and row end so horizontals dont overflow

            const rowStart = Math.floor(i /10) * 10;
            const rowEnd = rowStart + 9;

            //turn string id into array for comparison
            let squareArray = playerGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);
            playerGameBoardDivs[i].addEventListener('mouseenter', () => {

                
                const occupied = occupiedCheck(this.player.gameBoard.ships, squareArray, length(), this.shipDirection);
                console.log('remaining event')
                if (!occupied) {
                    if (this.shipDirection === "Vertical") {
                        if (selectedShip === "Battleship") {
                            if (playerGameBoardDivs[i + 30]){
                                playerGameBoardDivs[i].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 20].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 30].style.backgroundColor = "black";
                            }
                        }
                        if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
                            if (playerGameBoardDivs[i + 20]){
                                playerGameBoardDivs[i].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 20].style.backgroundColor = "black";
                            }
                        }
                        if (selectedShip === "Patrol Boat") {
                            if (playerGameBoardDivs[i + 10]){
                                playerGameBoardDivs[i].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                            }
                        }
                    }
                    else {
                        if (selectedShip === "Battleship") {
                            if (playerGameBoardDivs[i + 3] && i + 3 <= rowEnd){
                                playerGameBoardDivs[i].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 2].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 3].style.backgroundColor = "black";
                            }
                        }
                        if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
                            if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
                                playerGameBoardDivs[i].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 2].style.backgroundColor = "black";
                            }
                        }
                        if (selectedShip === "Patrol Boat") {
                            if (playerGameBoardDivs[i + 1] && i + 1 <= rowEnd){
                                playerGameBoardDivs[i].style.backgroundColor = "black";
                                playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                            }
                        }
                    }
                }
                
            });

            playerGameBoardDivs[i].addEventListener('mouseout', () => {
                //check if cell is occuped before overwriting
                const occupied = occupiedCheck(this.player.gameBoard.ships, squareArray, length(), this.shipDirection);

                if (!occupied) {
                    if (this.shipDirection === "Vertical") {
                        if (selectedShip === "Battleship") {
                            if (playerGameBoardDivs[i + 30]){
                                playerGameBoardDivs[i].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 20].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 30].style.backgroundColor = "white";
                            }
                        }
                        if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
                            if (playerGameBoardDivs[i + 20]){
                                playerGameBoardDivs[i].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 20].style.backgroundColor = "white";
                            }
                        }
                        if (selectedShip === "Patrol Boat") {
                            if (playerGameBoardDivs[i + 10]){
                                playerGameBoardDivs[i].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                            }
                        }
                    }
                    else {
                        if (selectedShip === "Battleship") {
                            if (playerGameBoardDivs[i + 3] && i + 3 <= rowEnd){
                                playerGameBoardDivs[i].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 2].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 3].style.backgroundColor = "white";
                            }
                        }
                        if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
                            if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
                                playerGameBoardDivs[i].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 2].style.backgroundColor = "white";
                            }
                        }
                        if (selectedShip === "Patrol Boat") {
                            if (playerGameBoardDivs[i + 1] && i + 1 <= rowEnd){
                                playerGameBoardDivs[i].style.backgroundColor = "white";
                                playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                            }
                        }
                    }
                }

            });
        }
    }
}
 