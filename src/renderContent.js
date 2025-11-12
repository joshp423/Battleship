import { placeShip } from "./main";
import { occupiedCheck, occupiedCheckSingular } from "./occupiedCheck";
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

        for (let i = 0; i < playerGameBoardDivs.length; i++) {
                            
            playerGameBoardDivs[i].style.backgroundColor = "white";
            let squareArray = playerGameBoardDivs[i].id.split(",");
            squareArray = squareArray.map(Number);
            const occupied = occupiedCheckSingular(shipsArray, squareArray)
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
            const occupied = occupiedCheckSingular(shipsArray, squareArray)
            if (occupied){ 
                playerGameBoardDivs[i].style.backgroundColor = "grey";
            }
        }

        //make hidden divs visible
        const opponentContainer = document.getElementById("opponentContainer");
        opponentContainer.style.display = "flex";

        const playerBoardTable = document.getElementById("playerShipTable");
        playerBoardTable.style.display = "flex";

        const playerHeader = document.getElementById("playerHeader");
        const playerHeaderInstruction = document.querySelector("#playerHeader>h3");

        playerHeaderInstruction.innerText = "Battle Begins! Click on enemy grid to launch an attack";
        const PlayerInstruction = document.getElementById('playerInstruction');
        PlayerInstruction.innerText = "";

        //create new opponent game board
        const opponentGameBoard = document.getElementById('opponentGameBoard');
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
        Game.setUpEventListenersOpponentBoard(Game);
    }


    renderGameTurns(turn, gameState, turnResult){
        const opponentBoardTable = document.getElementById('opponentBoardTable');
        const playerBoardTable = document.getElementById('playerBoardTable');
        const playerHeaderInstruction = document.querySelector("#playerHeader>h3")

        const opponentCarrierStatus = document.getElementById('opponentCarrierShipStatus');
        const opponentBattleshipStatus = document.getElementById('opponentBattleshipShipStatus');
        const opponentDestroyerStatus = document.getElementById('opponentDestroyerShipStatus');
        const opponentSubmarineStatus = document.getElementById('opponentSubmarineShipStatus');
        const opponentPBStatus = document.getElementById('opponentPatrol-boatShipStatus');

        const playerCarrierStatus = document.getElementById('carrierShipStatus');
        const playerCarrierHits = document.getElementById('carrierHits');
        const playerBattleshipStatus = document.getElementById('battleshipShipStatus');
        const playerBattleshipHits = document.getElementById('battleshipHits');
        const playerDestroyerStatus = document.getElementById('destroyerShipStatus');
        const playerDestroyerHits = document.getElementById('destroyerHits');
        const playerSubmarineStatus = document.getElementById('submarineShipStatus');
        const playerSubmarineHits = document.getElementById('submarineHits');
        const playerPBStatus = document.getElementById('patrol-boatShipStatus');
        const playerPBSHits = document.getElementById('patrol-boatHits');

        //check gameboardShips.player and gameboardShips.CPU for hits and sinks and reflect that in the appropriate div
        if (turn === "CPU") {
            for (let i = 0; i < 5; i++) {
                if (gameState.playerHuman.gameBoard.ships[i].sunk === true) {
                    console.log(gameState.playerHuman.gameBoard.ships[i].sunk)
                    switch (i) {
                        case 0:
                            playerCarrierStatus.innerText = "Sunk"
                            break;
                        case 1:
                            playerBattleshipStatus.innerText = "Sunk"
                            break;
                        case 2:
                            playerDestroyerStatus.innerText = "Sunk"
                            break;
                        case 3:
                            playerSubmarineStatus.innerText = "Sunk"
                            break;
                        case 4:
                            playerPBStatus.innerText = "Sunk"
                            break;
                        
                    }
                }
                const hits = gameState.playerHuman.gameBoard.ships[i].hits;
                switch (i) {
                        case 0:
                            playerCarrierHits.innerText = hits;
                            break;
                        case 1:
                            playerBattleshipHits.innerText = hits;
                            break;
                        case 2:
                            playerDestroyerHits.innerText = hits;
                            break;
                        case 3:
                            playerSubmarineHits.innerText = hits;
                            break;
                        case 4:
                            playerPBSHits.innerText = hits;
                            break;   
                }   
            }
        }
        if (turn === "Player") {
            for (let i = 0; i < 5; i++) {
                if (gameState.playerCPU.gameBoard.ships[i].sunk === true) {
                    //change css
                    switch (i) {
                        case 0:
                            opponentCarrierStatus.innerText = "Sunk";
                            break;
                        case 1:
                            opponentBattleshipStatus.innerText = "Sunk";
                            break;
                        case 2:
                            opponentDestroyerStatus.innerText = "Sunk";
                            break;
                        case 3:
                            opponentSubmarineStatus.innerText = "Sunk";
                            break;
                        case 4:
                            opponentPBStatus.innerText = "Sunk";
                            break;
                    }
                }
            }
            playerHeaderInstruction.innerText = "Your Turn, click to launch a strike";
        }
    }

    renderTurnFeedback(turnResult) {
        const playerHeaderInstruction = document.querySelector("#playerHeader>h3")
        if (turnResult === "Hit") {
            playerHeaderInstruction.innerText = "Your Attack was successful! Enemy attack inbound!";
        }
        else {
            playerHeaderInstruction.innerText = "Your attack missed... Enemy attack inbound!";
        }
    }
    renderWin(player) {
        const opponentContainer = document.getElementById('opponentContainer');
        const playerContainer = document.getElementById('playerContainer')
        opponentContainer.innerText = "";
        playerContainer.innerText = "";
        if (player === "CPU") {
            const CPUVictory = document.createElement('h1')
            CPUVictory.innerText = "Your fleet was destroyed.. YOU LOSE";
            opponentContainer.append(CPUVictory)
        }
        else {
            const playerVictory = document.createElement('h1')
            playerVictory.innerText = "You obliterated the enemy fleet... YOU WIN";
            opponentContainer.append(playerVictory)
        }
    }
}

export const renderContent = (() => {
    return new ContentRender();
})();