import { placeShip } from "./main";
import { occupiedCheck } from "./occupiedCheck";
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
        placeShip.placeShipEvents();
    }
}

export const renderContent = (() => {
    return new ContentRender();
})();