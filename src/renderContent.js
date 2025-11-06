import { placeShip } from "./main";
import { occupiedCheck } from "./occupiedCheck";
import { GameEvents } from "./gameEvents";
class ContentRender {
    constructor(){}

    renderPlaceCarrier(){
        const playerContainer = document.getElementById('playerContainer');
        playerContainer.style.display = "flex";
        playerContainer.style.alignItems = "center";

        const playerContainerHeaderTitle = document.querySelectorAll("#playerHeader>h3");
        playerContainerHeaderTitle[0].innerText = "Press C to Rotate Ship"
        const playerContainerHeader = document.getElementById('playerHeader');
        const PlayerInstruction = document.createElement('h3');
        PlayerInstruction.innerText = "Click to place Carrier";
        PlayerInstruction.id = "playerInstruction";
        const playerGameBoard = document.getElementById('playerGameBoard');
        playerContainerHeader.append(PlayerInstruction);
        let i = 0; 

        while (i < 10) {
            let j = 0;
            while (j < 10) {
                const square = document.createElement('div');
                square.classList.add('playerGameBoardDivs');
                square.id = [i, j];
                playerGameBoard.append(square);
                j++;
            }
            i++;
        }
        placeShip.keydownEventSetup();
        placeShip.placeShipEvents();
        
    }

    renderPlaceRemaining(shipsArray, currentShip){
        const PlayerInstruction = document.getElementById('playerInstruction');
        PlayerInstruction.innerText = `Click to place ${currentShip}`;
        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs')
        let i = 0;

        for (let i = 0; i < playerGameBoardDivs.length; i++) {
                            
            playerGameBoardDivs[i].style.backgroundColor = "white";
            let squareArray = playerGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);
            const occupied = occupiedCheck(shipsArray, squareArray, 1, this.shipDirection)
            if (occupied){ 
                playerGameBoardDivs[i].style.backgroundColor = "grey";
            }
        }
    }

    renderStartGame(shipsArray, Game){

        //wipe board and event listeners
        const playerGameBoard = document.getElementById('playerGameBoard');
        playerGameBoard.innerHTML = "";

        //add new gameBoard and colour occupied cells
        let i = 0; 
        while (i < 10) {
            let j = 0;
            while (j < 10) {
                const square = document.createElement('div');
                square.classList.add('playerGameBoardDivs');
                square.id = [i, j];

                playerGameBoard.append(square);
                j++;
            }
            i++;
        }

        const playerGameBoardDivs = document.querySelectorAll('.playerGameBoardDivs') 
        for (let i = 0; i < playerGameBoardDivs.length; i++) {
                            
            playerGameBoardDivs[i].style.backgroundColor = "white";
            let squareArray = playerGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);
            const occupied = occupiedCheck(shipsArray, squareArray, 1, this.shipDirection)
            if (occupied){ 
                playerGameBoardDivs[i].style.backgroundColor = "grey";
            }
        }

        //make hidden divs visible
        const opponentContainer = document.getElementById("opponentContainer");
        opponentContainer.style.display = "flex";

        const playerBoardTable = document.getElementById("playerShipTable");
        playerBoardTable.style.display = "flex";

        const playerHeader = document.getElementById("playerHeader")
        const playerHeaderInstruction = document.querySelector("#playerHeader>h3")

        playerHeaderInstruction.innerText = "Battle Begins! Click on enemy grid to launch an attack"
        const PlayerInstruction = document.getElementById('playerInstruction');
        PlayerInstruction.innerText = "";

        //create new opponent game board
        const opponentGameBoard = document.getElementById('opponentGameBoard')
        let k = 0;
        while (k < 10) {
            let l = 0;
            while (l < 10) {
                const square = document.createElement('div');
                square.classList.add('opponentGameBoardDivs');
                square.id = [k, l];
                opponentGameBoard.append(square);
                l++;
            }
            k++;
        }
        Game.setUpEventListenersOpponentBoard();
    }
}

export const renderContent = (() => {
    return new ContentRender();
})();