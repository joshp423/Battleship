import { ShipEvents } from "./placeShipEvents";

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
        ShipEvents.keydownEventSetup();
        ShipEvents.placeCarrierEvents();
        
    }

    renderPlaceRemaining(shipsArray, currentShip){
        const playerContainerHeader = document.getElementById('playerHeader');
        const PlayerInstruction = document.getElementById('playerInstruction');
        PlayerInstruction.innerText = `Click to place ${currentShip}`;
        const playerGameBoard = document.getElementById('playerGameBoard');

        let protectedSquares;
        let i = 0;

        while (i < 10) {
            let j = 0;
            while (j < 10) {
                const square = document.createElement('div');
                square.classList.add('playerGameBoardDivs');
                square.id = [i, j];
                playerGameBoard.append(square);
                shipsArray.forEach((ship) => {
                    ship.occupiedGrid.forEach((square) => {
                        if (square[0] === i && square[1] === j) {
                            square.style.backgroundColor = "grey";
                            protectedSquares.push(square)
                        }
                    })
                })
                j++;
            }
            i++;
        };
        console.log(protectedSquares);

    }
}

export const renderContent = (() => {
    return new ContentRender();
})();