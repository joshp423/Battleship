import { placeShipEvents } from "./placeShipEvents";

class ContentRender {
    constructor(){}

    renderPlaceShips(){
        const playerContainer = document.getElementById('playerContainer');
        playerContainer.style.display = "flex";
        playerContainer.style.alignItems = "center";

        const playerContainerHeader = document.querySelectorAll("#playerHeader>h3");
        playerContainerHeader[0].innerText = "Press C to Rotate"
        
        placeShipEvents();
    }
}

export const renderContent = (() => {
    return new ContentRender();
})();