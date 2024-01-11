let jsonData;
const items = ['wood', 'leaves', 'sticks', 'stone', 'fish', 'coco', 'spear', 'plank', 'rope', 'pole', 'sail'];

const handleLoadData = (event) => {
    const xhr = event.target;
    if (xhr.status == 200) {
        jsonData = JSON.parse(xhr.response);
        story.init();
        loadInventory();
        loadPlayer();
    } else {
        console.warn(`Error ${xhr.status}: ${xhr.responseURL} nicht gefunden.`);
    }
};


// Lädt die Daten der JSON-Datei, speichert sie in jsonData und löst loadInventory aus
const loadData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', './variables.json');
    xhr.addEventListener('load', handleLoadData);
    xhr.send();
};


// Event Listener -----------------------------------------------------------------------------------------
document.querySelector('#fishBtn').addEventListener('click', eatFish);
document.querySelector('#cocoBtn').addEventListener('click', drinkCoco);
document.querySelector('#fireBtn').addEventListener('click', stokeFire);
document.querySelector('#searchBtn').addEventListener('click', searchForest);
document.querySelector('#huntBtn').addEventListener('click', huntFish);
document.querySelector('#spearBtn').addEventListener('click', makeSpear);
document.querySelector('#plankBtn').addEventListener('click', makePlank);
document.querySelector('#ropeBtn').addEventListener('click', makeRope);
document.querySelector('#poleBtn').addEventListener('click', makePole);
document.querySelector('#sailBtn').addEventListener('click', makeSail);


// Ist sozusagen meine init
document.addEventListener('DOMContentLoaded', loadData);