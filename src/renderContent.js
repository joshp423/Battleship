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
    renderPlaceRemaining
}

export const renderContent = (() => {
    return new ContentRender();
})();