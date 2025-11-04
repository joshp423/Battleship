//start game through button - button turns to reset after
//hide both boards until the start button is clicked
//

//When DOM is loaded listen for start game Button

import { renderContent } from "./renderContent.js";
import './style.css';

let gameStatus = "notStarted"
const startResetButton = document.getElementById('startReset');
startResetButton.addEventListener('click', () => {
    if (gameStatus = "notStarted") {
        gameStatus = "startedPlacement";
        startResetButton.innerText = "Reset Game";
        renderContent.renderPlaceCarrier();
    }
})