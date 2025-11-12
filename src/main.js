//hide both boards until the start button is clicked
//

//When DOM is loaded listen for start game Button

import { ShipEvents } from "./placeShipEvents.js";
import { renderContent } from "./renderContent.js";
import './style.css';

let gameStatus = "notStarted";
export const placeShip = new ShipEvents();
const startResetButton = document.getElementById('startReset');
startResetButton.addEventListener('click', () => {
    if (gameStatus === "notStarted") {
        gameStatus = "started";
        startResetButton.innerText = "Reset Game";
        renderContent.renderPlaceCarrier();
    }
    else {
        window.location.reload();
    }
})