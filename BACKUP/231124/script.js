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
    let empty = true;

    for (let item of items) {
        if (jsonData.inventory[item] > 0) {
            document.querySelector(`#${item}Inv`).innerHTML = `${jsonData.inventory[item]} ${jsonData.translation[item]}`;
            empty = false;
        };
    };

    if (empty) {
        const p = document.createElement('p');
        p.innerHTML = 'Dein Inventar ist leer';
        p.className = 'emptyInventory';
        document.querySelector('#inventory').append(p);
    };
};

// Ist sozusagen meine init
document.addEventListener('DOMContentLoaded', loadData);
















// const newStoryPart = (text) => {
//     let li = document.createElement('li');
//     li.innerHTML = text;
//     document.querySelector('#txtSctn ul').append(li);
// };

// const endRound = () => {
//     rounds++;
//     hunger--;
//     thirst--;
//     if (rounds % 3 == 0) {
//         fire--;
//         health++;
//     }
//     if (false) die();
//     activateButtons();
//     deactivateButtons();
//     loadInventory();
// };

// const die = (reason) => {
//     // You died from reason
// };

// const activateButtons = (button) => {
//     if (inventory["wood"] > 0) document.querySelector('#fireBtn').className = 'activeButton';
//     if (inventory["fish"] > 0) document.querySelector('#fishBtn').className = 'activeButton';
//     if (inventory["coco"] > 0) document.querySelector('#cocoBtn').className = 'activeButton';
//     if (inventory["stone"] > 0 && inventory["sticks"] > 0) document.querySelector('#spearBtn').className = 'activeButton';
//     if (inventory["wood"] > 2) document.querySelector('#plankBtn').className = 'activeButton';
//     if (inventory["leaves"] > 4) document.querySelector('#ropeBtn').className = 'activeButton';
//     if (inventory["wood"] > 19) document.querySelector('#poleBtn').className = 'activeButton';
//     if (inventory["rope"] > 19) document.querySelector('#sailBtn').className = 'activeButton';
// };

// const deactivateButtons = (button) => {
//     if (inventory["wood"] < 1) document.querySelector('#fireBtn').className = 'activeButton';
//     if (inventory["fish"] < 1) document.querySelector('#fishBtn').className = 'activeButton';
//     if (inventory["coco"] < 1) document.querySelector('#cocoBtn').className = 'activeButton';
//     if (inventory["stone"] < 1 && inventory["sticks"] < 1) document.querySelector('#spearBtn').className = 'activeButton';
//     if (inventory["wood"] < 3) document.querySelector('#plankBtn').className = 'activeButton';
//     if (inventory["leaves"] < 5) document.querySelector('#ropeBtn').className = 'activeButton';
//     if (inventory["wood"] < 20 || inventory[pole] == 1) document.querySelector('#poleBtn').className = 'activeButton';
//     if (inventory["rope"] < 20 || inventory[sail] == 1) document.querySelector('#sailBtn').className = 'activeButton';
// };


// // Funktionen der Buttons ----------------------------------------------------------------------------
// const stokeFire = () => {
//     if (inventory["wood"] > 0 && fire < 3) {
//         inventory["wood"]--;
//         fire++;
//     }
// };

// const eatFish = () => {
//     if (inventory["fish"] > 0) {
//         inventory["fish"]--;
//         hunger += 6;
//     }
//     endRound();
// };

// const drinkCoco = () => {
//     if (inventory["coco"] > 0) {
//         inventory["coco"]--;
//         thirst += 4;
//     }
//     endRound();
// };

// const searchForest = () => {
//     const addedItems = {
//         wood: createNumber(3, 7),
//         leaves: createNumber(4, 8),
//         sticks: createNumber(2, 4),
//         stone: createNumber(0, 2),
//         coco: createNumber(1, 3),
//     };

//     for (const item in addedItems) {
//         jsonData.inventory.item += addedItems[item];
//     }

//     newStoryPart(`Du hast im Wald ${addedItems.wood} Holz, ${addedItems.leaves} Palmblätter, ${addedItems.sticks} Stöcke, ${addedItems.stone} Steine und ${addedItems.coco} Kokosnüsse gefunden.`);
//     loadInventory();
//     findEasterEggs();
// };

// const huntFish = () => {
//     endRound();
// };

// const makeSpear = () => {
//     endRound();
// };

// const makePlank = () => {
//     endRound();
// };

// const makeRope = () => {
//     endRound();
// };

// const makePole = () => {
//     endRound();
// };

// const makeSail = () => {
//     endRound();
// };


// // Event Listener ------------------------------------------------------------------------------------
// document.querySelector('#fishBtn').addEventListener('click', eatFish);
// document.querySelector('#cocoBtn').addEventListener('click', drinkCoco);
// document.querySelector('#fireBtn').addEventListener('click', stokeFire);
// document.querySelector('#searchBtn').addEventListener('click', searchForest);
// document.querySelector('#huntBtn').addEventListener('click', huntFish);
// document.querySelector('#spearBtn').addEventListener('click', makeSpear);
// document.querySelector('#plankBtn').addEventListener('click', makePlank);
// document.querySelector('#ropeBtn').addEventListener('click', makeRope);
// document.querySelector('#poleBtn').addEventListener('click', makePole);
// document.querySelector('#sailBtn').addEventListener('click', makeSail);


// DEBUG, gibt Problem wenn zB Feuer nicht geschürt werden kann
// document.addEventListener('click', endRound);


