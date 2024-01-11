let jsonData;
const items = ['wood', 'leaves', 'sticks', 'stone', 'fish', 'coco', 'spear', 'plank', 'rope', 'pole', 'sail'];

const handleLoadData = (event) => {
    const xhr = event.target;
    if (xhr.status == 200) {
        if (localStorage.getItem('save') == null) jsonData = JSON.parse(xhr.response)
        else jsonData = JSON.parse(localStorage.getItem('save'));
        func.loadPlayer();
        func.loadInventory();
        func.activateButtons();
        func.deactivateButtons();
        if (localStorage.getItem('story') != null) document.querySelector('#txtSctn').innerHTML = localStorage.getItem('story');
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
// Witzige Sache: Sobald ich hinter die Methoden Klammern mache funktionieren sie nicht mehr... idkw
document.querySelector('#fishBtn').addEventListener('click', func.eatFish);
document.querySelector('#cocoBtn').addEventListener('click', func.drinkCoco);
document.querySelector('#fireBtn').addEventListener('click', func.stokeFire);
document.querySelector('#searchBtn').addEventListener('click', func.searchForest);
document.querySelector('#huntBtn').addEventListener('click', func.huntFish);
document.querySelector('#spearBtn').addEventListener('click', func.makeSpear);
document.querySelector('#plankBtn').addEventListener('click', func.makePlank);
document.querySelector('#ropeBtn').addEventListener('click', func.makeRope);
document.querySelector('#poleBtn').addEventListener('click', func.makePole);
document.querySelector('#sailBtn').addEventListener('click', func.makeSail);


// Ist sozusagen meine init
document.addEventListener('DOMContentLoaded', loadData);