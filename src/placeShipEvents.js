import { Player } from "./playerClass";
import { renderContent } from "./renderContent";
import { occupiedCheck } from "./occupiedCheck";
import { GameEvents } from "./gameEvents";

export class ShipEvents {
    constructor () {
        this.shipDirection = "Horizontal";
        this.activeShip = "Carrier";
        this.player = new Player("player");
        this.isToggling = false;
    }

    keydownEventSetup() {
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')

        addEventListener('keydown', (event) => {
            
            if (event.key === 'c') {
                if (this.shipDirection === "Vertical") {
                    this.shipDirection = "Horizontal";
                    if (!this.player.gameBoard.ships) {
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
                    if (!this.player.gameBoard.ships) {
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

    placeShipEvents() {
        console.log(this.activeShip)
       
        console.log(this.player.gameBoard.ships)
        
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')
        for (let i = 0; i < playerGameBoardDivs.length; i++) {
            
            const length = () => {
                if (this.activeShip === "Carrier") {
                    return 5;
                }
                if (this.activeShip === "Battleship") {
                    return 4;
                }
                if (this.activeShip === "Destroyer" || this.activeShip === "Submarine" ) {
                    return 3;
                }
                return 2;
            }

            //calculate row start and row end so horizontals dont overflow
            const rowStart = Math.floor(i /10) * 10;
            const rowEnd = rowStart + 9;

            //turn string id into array for comparison
            let squareArray = playerGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);

            playerGameBoardDivs[i].addEventListener('mouseenter', () => {
                let occupied = null;
                if (this.player) {
                    occupied = occupiedCheck(this.player.gameBoard.ships, squareArray, length(), this.shipDirection);
                }
                if (!occupied) {
                    if (this.shipDirection === "Vertical") {
                        switch (this.activeShip) {
                            case "Carrier":
                                if (playerGameBoardDivs[i + 40]){
                                    playerGameBoardDivs[i].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 20].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 30].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 40].style.backgroundColor = "black";
                                }
                                break;
                            
                            case "Battleship":
                                if (playerGameBoardDivs[i + 30]){
                                        playerGameBoardDivs[i].style.backgroundColor = "black";
                                        playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                                        playerGameBoardDivs[i + 20].style.backgroundColor = "black";
                                        playerGameBoardDivs[i + 30].style.backgroundColor = "black";
                                }
                                break;

                            case "Destroyer":
                            case "Submarine":
                                if (playerGameBoardDivs[i + 20]){
                                        playerGameBoardDivs[i].style.backgroundColor = "black";
                                        playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                                        playerGameBoardDivs[i + 20].style.backgroundColor = "black";
                                }
                                break;

                            case "Patrol Boat":
                                if (playerGameBoardDivs[i + 10]){
                                        playerGameBoardDivs[i].style.backgroundColor = "black";
                                        playerGameBoardDivs[i + 10].style.backgroundColor = "black";
                                }
                                break;
                        }
                    }
                    else {
                        switch (this.activeShip) {
                            case "Carrier":
                                if (playerGameBoardDivs[i + 4] && i + 4 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 2].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 3].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 4].style.backgroundColor = "black";
                                }
                                break;
                            
                            case "Battleship":
                                if (playerGameBoardDivs[i + 3] && i + 3 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 2].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 3].style.backgroundColor = "black";
                                }
                                break;

                            case "Destroyer":
                            case "Submarine":
                                if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 2].style.backgroundColor = "black";
                                }
                                break;

                            case "Patrol Boat":
                                if (playerGameBoardDivs[i + 1] && i + 1 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "black";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "black";
                                }
                                break;
                        }
                    }
                }
            });

            playerGameBoardDivs[i].addEventListener('mouseout', () => {
                let occupied = null;
                if (this.player) {
                    occupied = occupiedCheck(this.player.gameBoard.ships, squareArray, length(), this.shipDirection);
                }
                if (!occupied) {
                    if (this.shipDirection === "Vertical") {
                        switch (this.activeShip) {
                            case "Carrier":
                                if (playerGameBoardDivs[i + 40]){
                                    playerGameBoardDivs[i].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 20].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 30].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 40].style.backgroundColor = "white";
                                }
                                break;
                            
                            case "Battleship":
                                if (playerGameBoardDivs[i + 30]){
                                        playerGameBoardDivs[i].style.backgroundColor = "white";
                                        playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                                        playerGameBoardDivs[i + 20].style.backgroundColor = "white";
                                        playerGameBoardDivs[i + 30].style.backgroundColor = "white";
                                }
                                break;

                            case "Destroyer":
                            case "Submarine":
                                if (playerGameBoardDivs[i + 20]){
                                        playerGameBoardDivs[i].style.backgroundColor = "white";
                                        playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                                        playerGameBoardDivs[i + 20].style.backgroundColor = "white";
                                }
                                break;

                            case "Patrol Boat":
                                if (playerGameBoardDivs[i + 10]){
                                        playerGameBoardDivs[i].style.backgroundColor = "white";
                                        playerGameBoardDivs[i + 10].style.backgroundColor = "white";
                                }
                                break;
                        }
                    }
                    else {
                        switch (this.activeShip) {
                            case "Carrier":
                                if (playerGameBoardDivs[i + 4] && i + 4 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 2].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 3].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 4].style.backgroundColor = "white";
                                }
                                break;
                            
                            case "Battleship":
                                if (playerGameBoardDivs[i + 3] && i + 3 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 2].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 3].style.backgroundColor = "white";
                                }
                                break;

                            case "Destroyer":
                            case "Submarine":
                                if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 2].style.backgroundColor = "white";
                                }
                                break;

                            case "Patrol Boat":
                                if (playerGameBoardDivs[i + 1] && i + 1 <= rowEnd){
                                    playerGameBoardDivs[i].style.backgroundColor = "white";
                                    playerGameBoardDivs[i + 1].style.backgroundColor = "white";
                                }
                                break;
                        }
                    }
                }
            });
            playerGameBoardDivs[i].addEventListener('click', () => {
                //gatekeep the clickfunction for valid clicks
                if (this.shipDirection === "Vertical") {
                    switch (this.activeShip) {
                        case "Carrier":
                            if (playerGameBoardDivs[i + 40]){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                console.log(squareArray);

                                this.player.gameBoard.placeShip(5, this.shipDirection, squareArray)
                                console.log(this.player.gameBoard.ships);

                                //update class to hold info
                                this.activeShip = "Battleship"
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;

                        case "Battleship":
                            if (playerGameBoardDivs[i + 30]){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                
                                this.player.gameBoard.placeShip(4, this.shipDirection, squareArray)

                                this.activeShip = "Destroyer";
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;

                        case "Destroyer":
                            if (playerGameBoardDivs[i + 20]){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                this.player.gameBoard.placeShip(3, this.shipDirection, squareArray)
                                this.activeShip = "Submarine";
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;
                        
                        case "Submarine":
                            if (playerGameBoardDivs[i + 20]){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                
                                this.player.gameBoard.placeShip(3, this.shipDirection, squareArray)
                                this.activeShip = "Patrol Boat";
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;

                        case "Patrol Boat":
                            if (playerGameBoardDivs[i + 10]){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                this.player.gameBoard.placeShip(2, this.shipDirection, squareArray)
                                renderContent.renderStartGame(this.player.gameBoard.ships)
                                const Game = new GameEvents(this.player);
                                Game.playerCPU.gameBoard.createFleetRandom(Game.playerCPU.gameBoard.ships);
                                console.log(Game.playerCPU.gameBoard.ships);
                                renderContent.renderStartGame(this.player.gameBoard.ships, Game)
                            }
                            break;
                    }
                }

                else {
                    switch (this.activeShip) {
                        case "Carrier":
                            if (playerGameBoardDivs[i + 4] && i + 4 <= rowEnd){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                console.log(squareArray);

                                this.player.gameBoard.placeShip(5, this.shipDirection, squareArray)
                                console.log(this.player.gameBoard.ships);

                                //update class to hold info
                                this.activeShip = "Battleship"
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;

                        case "Battleship":
                            if (playerGameBoardDivs[i + 3] && i + 3 <= rowEnd){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                
                                this.player.gameBoard.placeShip(4, this.shipDirection, squareArray);
                                this.activeShip = "Destroyer";
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;

                        case "Destroyer":
                            if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                
                                this.player.gameBoard.placeShip(3, this.shipDirection, squareArray)
                                this.activeShip = "Submarine";
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;
                        
                        case "Submarine":
                            if (playerGameBoardDivs[i + 2] && i + 2 <= rowEnd){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                
                                this.player.gameBoard.placeShip(3, this.shipDirection, squareArray)
                                this.activeShip = "Patrol Boat";
                                renderContent.renderPlaceRemaining(this.player.gameBoard.ships, this.activeShip);
                            }
                            break;

                        case "Patrol Boat":
                            if (playerGameBoardDivs[i + 1] && i + 1 <= rowEnd){
                                let squareArray = playerGameBoardDivs[i].id.split(",");
                                squareArray = squareArray.map(Number);
                                this.player.gameBoard.placeShip(2, this.shipDirection, squareArray)
                                const Game = new GameEvents(this.player);
                                Game.playerCPU.gameBoard.createFleetRandom(Game.playerCPU.gameBoard.ships);
                                console.log(Game.playerCPU.gameBoard.ships);
                                renderContent.renderStartGame(this.player.gameBoard.ships, Game);  
                            }
                            break;
                    }
                }
            });
        }
    }
}
 