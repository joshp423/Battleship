import { Player } from "./playerClass";
import { renderContent } from "./renderContent";

export class ShipEvents {
    constructor () {
        this.shipDirection = "Horizontal";
        this.activeShip = "Carrier";
        this.player = null;
    }

    keydownEventSetup() {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')

        addEventListener('keydown', (event) => {
            
            if (event.key === 'c') {
                if (this.shipDirection === "Vertical") {
                    this.shipDirection = "Horizontal";
                    for (let i = 0; i < playerGameBoardDivs.length; i++) {
                        let squareArray = playerGameBoardDivs[i].id.split(",");
                        squareArray = squareArray.map(Number);
                        this.player.gameBoard.ships.forEach((ship) => {
                            ship.occupiedGrid.forEach((grid) => {
                                if (grid[0] === squareArray[0] && grid[1] === squareArray[1]) {
                                   return;
                                }
                            })
                        })
                        playerGameBoardDivs[i].style.backgroundColor = "white";   
                    }
                }
                else {
                    this.shipDirection = "Vertical";
                    for (let i = 0; i < playerGameBoardDivs.length; i++) {
                        let squareArray = playerGameBoardDivs[i].id.split(",");
                        squareArray = squareArray.map(Number);
                        this.player.gameBoard.ships.forEach((ship) => {
                            ship.occupiedGrid.forEach((grid) => {
                                if (grid[0] === squareArray[0] && grid[1] === squareArray[1]) {
                                   return;
                                }
                            })
                        })
                        playerGameBoardDivs[i].style.backgroundColor = "white";   
                    }
                }
            }
            console.log(this.shipDirection)

        });
    }

    placeCarrierEvents() {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')
    
        for (let i = 0; i < playerGameBoardDivs.length; i++) {

            //calculate row start and row end so horizontals dont overflow

            const rowStart = Math.floor(i /10) * 10;
            const rowEnd = rowStart + 10;

            playerGameBoardDivs[i].addEventListener('mouseenter', () => {
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
                        let playerBoard = document.getElementById("playerGameBoard");
                        playerBoard.innerHTML = ""; 
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
                        let playerBoard = document.getElementById("playerGameBoard");
                        playerBoard.innerHTML = "";

                        //update class to hold info
                        this.player = playerHuman;
                        this.activeShip = "Battleship"
                        renderContent.renderPlaceRemaining(playerHuman.gameBoard.ships, "Battleship");
                        console.log(this.activeShip, this.player)
                    }
                }
            })
        }
    }

    placeRemainingEvents(selectedShip) {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')
    
        for (let i = 0; i < playerGameBoardDivs.length; i++) {

            //calculate row start and row end so horizontals dont overflow

            const rowStart = Math.floor(i /10) * 10;
            const rowEnd = rowStart + 10;

            //turn string id into array for comparison
            let squareArray = playerGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);

            playerGameBoardDivs[i].addEventListener('mouseenter', () => {
                this.player.gameBoard.ships.forEach((ship) => {
                    ship.occupiedGrid.forEach((grid) => {
                        if (grid[0] === squareArray[0] && grid[1] === squareArray[1]) {
                            return;
                        }
                    })
                })
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
                this.player.gameBoard.ships.forEach((ship) => {
                    ship.occupiedGrid.forEach((grid) => {
                        if (grid[0] === squareArray[0] && grid[1] === squareArray[1]) {
                            return;
                        }
                    })
                })
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
        }
    }

    remainingKeydownEventSetup() {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')

        addEventListener('keydown', (event) => {
            
            if (event.key === 'c') {
                if (this.shipDirection === "Vertical") {
                    this.shipDirection = "Horizontal";
                    for (let i = 0; i < playerGameBoardDivs.length; i++) {
                        let squareArray = playerGameBoardDivs[i].id.split(",");
                        squareArray = squareArray.map(Number);
                        this.player.gameBoard.ships.forEach((ship) => {
                            ship.occupiedGrid.forEach((grid) => {
                                if (grid[0] === squareArray[0] && grid[1] === squareArray[1]) {
                                   return;
                                }
                            })
                        })
                        playerGameBoardDivs[i].style.backgroundColor = "white";   
                    }
                }
                else {
                    this.shipDirection = "Vertical";
                    for (let i = 0; i < playerGameBoardDivs.length; i++) {
                        let squareArray = playerGameBoardDivs[i].id.split(",");
                        squareArray = squareArray.map(Number);
                        this.player.gameBoard.ships.forEach((ship) => {
                            ship.occupiedGrid.forEach((grid) => {
                                if (grid[0] === squareArray[0] && grid[1] === squareArray[1]) {
                                   return;
                                }
                            })
                        })
                        playerGameBoardDivs[i].style.backgroundColor = "white";   
                    }
                }
            }
            console.log(this.shipDirection)

        });
    }
}
 


//             }


//                     if (selectedShip === "Battleship") {
//                         if (playerGameBoardDivs[i + 30]){
//                             playerGameBoardDivs[i].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 10].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 20].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 30].style.backgroundColor = "black";
//                         }
//                     }
//                     if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
//                         if (playerGameBoardDivs[i + 20]){
//                             playerGameBoardDivs[i].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 10].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 20].style.backgroundColor = "black";
//                         }
//                     }
//                     if (selectedShip === "Patrol Boat") {
//                         if (playerGameBoardDivs[i + 10]){
//                             playerGameBoardDivs[i].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 10].style.backgroundColor = "black";
//                         }
//                     }
                        
//                 }
//                 if (shipDirection === "Horizontal") {
//                     if (selectedShip === "Carrier") {
//                         if (playerGameBoardDivs[i + 4] && i + 5 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 2].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 3].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 4].style.backgroundColor = "black";
//                         }
//                     }
//                     if (selectedShip === "Battleship") {
//                         if (playerGameBoardDivs[i + 3] && i + 3 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 2].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 3].style.backgroundColor = "black";
//                         }
//                     }
//                     if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
//                         if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 2].style.backgroundColor = "black";
//                         }
//                     }
//                     if (selectedShip === "Patrol Boat") {
//                         if (playerGameBoardDivs[i + 1] && i + 1 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "black";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "black";
//                         }
//                     }
                        
//                 }
//             });
//             playerGameBoardDivs[i].addEventListener('mouseout', () => {
//                 playerGameBoardDivs[i].style.backgroundColor = "white"
//                 if (shipDirection === "Vertical") {
//                     if (selectedShip === "Carrier") {
//                         if (playerGameBoardDivs[i + 40]){
//                             playerGameBoardDivs[i + 10].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 20].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 30].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 40].style.backgroundColor = "white";
//                         }
//                     }
//                     if (selectedShip === "Battleship") {
//                         if (playerGameBoardDivs[i + 30]){
//                             playerGameBoardDivs[i].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 10].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 20].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 30].style.backgroundColor = "white";
//                         }
//                     }
//                     if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
//                         if (playerGameBoardDivs[i + 20]){
//                             playerGameBoardDivs[i].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 10].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 20].style.backgroundColor = "white";
//                         }
//                     }
//                     if (selectedShip === "Patrol Boat") {
//                         if (playerGameBoardDivs[i + 10]){
//                             playerGameBoardDivs[i].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 10].style.backgroundColor = "white";
//                         }
//                     }
                    
//                 }
//                 if (shipDirection === "Horizontal") {
//                     if (selectedShip === "Carrier") {
//                         if (playerGameBoardDivs[i + 4] && i + 4 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 2].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 3].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 4].style.backgroundColor = "white";
//                         }
//                     }
//                     if (selectedShip === "Battleship") {
//                         if (playerGameBoardDivs[i + 3] && i + 3 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 2].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 3].style.backgroundColor = "white";
//                         }
//                     }
//                     if (selectedShip === "Destroyer" || selectedShip === "Submarine") {
//                         if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 2].style.backgroundColor = "white";
//                         }
//                     }
//                     if (selectedShip === "Patrol Boat") {
//                         if (playerGameBoardDivs[i + 1] && i + 1 <= rowEnd){
//                             playerGameBoardDivs[i].style.backgroundColor = "white";
//                             playerGameBoardDivs[i + 1].style.backgroundColor = "white";
//                         }
//                     }
                        
//                 }
//             })
//         }
//     }

    
// }