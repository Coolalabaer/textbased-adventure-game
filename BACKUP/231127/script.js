let jsonData;
const items = ['wood', 'leaves', 'sticks', 'stone', 'fish', 'coco', 'spear', 'plank', 'rope', 'pole', 'sail'];


// Lädt die Daten der JSON-Datei, speichert sie in jsonData und löst loadInventory aus
const loadData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', './variables.json');
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            jsonData = JSON.parse(xhr.response);
            loadInventory();
        } else {
            console.warn(`Error ${xhr.status}: ${xhr.responseURL} nicht gefunden.`);
        }
    });
    xhr.send();
};


// Lädt das Inventar, muss nach jeder Runde aufgerufen werden
const loadInventory = () => {
    // Bei jedem Aufruf wird erstmal davon ausgegangen, dass das Inventar leer ist
    let empty = true;

    for (let item of items) {
        // Wenn ein Item im Inventar ist, wird es ausgegeben und empty auf false gesetzt
        if (jsonData.inventory[item] > 0) {
            document.querySelector(`#${item}Inv`).innerHTML = `${jsonData.inventory[item]} ${jsonData.translation[item]}`;
            empty = false;
        };
    };

    // Wenn empty true ist, kann also kein einziges Item gefunden worden sein bzw. wenn eines gefunden wurde muss empty false sein
    if (empty) {
        const p = document.createElement('p');
        p.innerHTML = 'Dein Inventar ist leer';
        p.id = 'emptyInventory';
        document.querySelector('#inventory').append(p);
    } else if (document.querySelector('#emptyInventory')) {
        document.querySelector('#emptyInventory').remove();
    };
};


// Hintergrund-Funktionen ---------------------------------------------------------------------------------
const newStoryPart = (text) => {
    let li = document.createElement('li');
    li.innerHTML = text;
    document.querySelector('#txtSctn ul').append(li);
};    


// Gibt den Buttons die Klasse activeButton wenn genug Materialien vorhanden sind
const activateButtons = (button) => {
    if (jsonData.inventory.wood > 0) document.querySelector('#fireBtn').className = 'activeButton';
    if (jsonData.inventory.fish > 0) document.querySelector('#fishBtn').className = 'activeButton';
    if (jsonData.inventory.coco > 0) document.querySelector('#cocoBtn').className = 'activeButton';
    if (jsonData.inventory.stone > 0 && jsonData.inventory.sticks > 0) document.querySelector('#spearBtn').className = 'activeButton';
    if (jsonData.inventory.wood > 2) document.querySelector('#plankBtn').className = 'activeButton';
    if (jsonData.inventory.leaves > 4) document.querySelector('#ropeBtn').className = 'activeButton';
    if (jsonData.inventory.wood > 19) document.querySelector('#poleBtn').className = 'activeButton';
    if (jsonData.inventory.rope > 19) document.querySelector('#sailBtn').className = 'activeButton';
};

// Gibt den Buttons die Klasse inactiveButton wenn nicht genug Materialien vorhanden sind
const deactivateButtons = (button) => {
    if (jsonData.inventory.wood < 1) document.querySelector('#fireBtn').className = 'inactiveButton';
    if (jsonData.inventory.fish < 1) document.querySelector('#fishBtn').className = 'inactiveButton';
    if (jsonData.inventory.coco < 1) document.querySelector('#cocoBtn').className = 'inactiveButton';
    if (jsonData.inventory.stone < 1 && jsonData.inventory.sticks < 1) document.querySelector('#spearBtn').className = 'inactiveButton';
    if (jsonData.inventory.wood < 3) document.querySelector('#plankBtn').className = 'inactiveButton';
    if (jsonData.inventory.leaves < 5) document.querySelector('#ropeBtn').className = 'inactiveButton';
    if (jsonData.inventory.wood < 20 || jsonData.inventory.pole == 1) document.querySelector('#poleBtn').className = 'inactiveButton';
    if (jsonData.inventory.rope < 20 || jsonData.inventory.sail == 1) document.querySelector('#sailBtn').className = 'inactiveButton';
};


// Wird am Ende jeder Runde ausgeführt
const endRound = () => {
    jsonData.player.rounds++;
    jsonData.player.hunger--;
    jsonData.player.thirst--;
    if (jsonData.player.rounds % 3 == 0) {
        jsonData.player.fire--;
        jsonData.player.health++;
    }
    // if (false) die();
    loadInventory();
    activateButtons();
    deactivateButtons();
};


// Funktionen der Buttons ---------------------------------------------------------------------------------
const searchForest = () => {
    const addedItems = {
        wood: createNumber(3, 7),
        leaves: createNumber(4, 8),
        sticks: createNumber(2, 4),
        stone: createNumber(0, 2),
        coco: createNumber(1, 3),
    };    

    for (const item in addedItems) {
        jsonData.inventory[item] += addedItems[item];
    }    

    newStoryPart(`Du hast im Wald ${addedItems.wood} Holz, ${addedItems.leaves} Palmblätter, ${addedItems.sticks} Stöcke, ${addedItems.stone} Steine und ${addedItems.coco} Kokosnüsse gefunden.`);
    findEasterEggs();
    endRound();
};   


const stokeFire = () => {

    if (jsonData.inventory.wood > 0 && jsonData.player.fire < 3) {
        jsonData.inventory.wood--;
        jsonData.player.fire++;
    };
    endRound();
};


const eatFish = () => {
    if (jsonData.inventory.fish > 0) {
        jsonData.inventory.fish--;
        hunger += 6;
    }
    endRound();
};


const drinkCoco = () => {
    if (jsonData.inventory.coco > 0) {
        jsonData.inventory.coco--;
        thirst += 4;
    }
    endRound();
};


const huntFish = () => {
    endRound();
};


const makeSpear = () => {
    endRound();
};


const makePlank = () => {
    endRound();
};


const makeRope = () => {
    endRound();
};


const makePole = () => {
    endRound();
};


const makeSail = () => {
    endRound();
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














// const die = (reason) => {
//     // You died from reason
// };









// DEBUG, gibt Problem wenn zB Feuer nicht geschürt werden kann
// document.addEventListener('click', endRound);


