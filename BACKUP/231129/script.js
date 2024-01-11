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
            loadPlayer();
        } else {
            console.warn(`Error ${xhr.status}: ${xhr.responseURL} nicht gefunden.`);
        }
    });
    xhr.send();
};


// Lädt das Player-Menü, muss nach jeder Runde aufgerufen werden
const loadPlayer = () => {
    let firePercentage = jsonData.player.fire/3*100;
    let hungerPercentage = jsonData.player.hunger/20*100;
    let thirstPercentage = jsonData.player.thirst/15*100;
    let healthPercentage = jsonData.player.health/15*100;

    document.querySelector('#fireIcon').style.background = `linear-gradient(to top, yellow ${firePercentage}%, var(--mid) ${firePercentage}%)`;
    document.querySelector('#fishIcon').style.background = `linear-gradient(to top, yellow ${hungerPercentage}%, var(--mid) ${hungerPercentage}%)`;
    document.querySelector('#dropIcon').style.background = `linear-gradient(to top, yellow ${thirstPercentage}%, var(--mid) ${thirstPercentage}%)`;
    document.querySelector('#heartIcon').style.background = `linear-gradient(to top, yellow ${healthPercentage}%, var(--mid) ${healthPercentage}%)`;

    console.log(`Player: ${firePercentage}% Feuer, ${hungerPercentage}% Hunger, ${thirstPercentage}% Durst, ${healthPercentage}% Gesundheit`);
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
    document.querySelector('#txtSctn ul').prepend(li);
};

// Gibt den Buttons die Klasse activeButton wenn genug Materialien vorhanden sind
const activateButtons = (button) => {
    if (jsonData.inventory.wood > 0) document.querySelector('#fireBtn').className = 'activeButton';
    if (jsonData.inventory.fish > 0) document.querySelector('#fishBtn').className = 'activeButton';
    if (jsonData.inventory.coco > 0) document.querySelector('#cocoBtn').className = 'activeButton';
    if (jsonData.inventory.spear > 0) document.querySelector('#huntBtn').className = 'activeButton';
    if (jsonData.inventory.stone > 0 && jsonData.inventory.sticks > 0) document.querySelector('#spearBtn').className = 'activeButton';
    if (jsonData.inventory.wood > 2) document.querySelector('#plankBtn').className = 'activeButton';
    if (jsonData.inventory.leaves > 4) document.querySelector('#ropeBtn').className = 'activeButton';
    if (jsonData.inventory.wood > 19 && jsonData.inventory.rope > 9) document.querySelector('#poleBtn').className = 'activeButton';
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
    if (jsonData.inventory.wood < 20 || jsonData.inventory.rope == 1) document.querySelector('#poleBtn').className = 'inactiveButton';
    if (jsonData.inventory.rope < 20 || jsonData.inventory.sail == 1) document.querySelector('#sailBtn').className = 'inactiveButton';
};


// Falls eine lebensnotwendige Ressouce verbraucht ist stirbt der Spieler innerhalb der nächsten 1-3 Runden
const checkForCorpses = () => {
    if (jsonData.player.fire < 0) die('freeze');
    if (jsonData.player.thirst < 0) die('thirst');
    if (jsonData.player.hunger < 0) die('starve');
    if (jsonData.player.health < 0) die('health');
    if (jsonData.player.rounds > 150) die('old');
};


// Wird am Ende jeder Runde ausgeführt
const endRound = () => {
    jsonData.player.rounds++;
    jsonData.player.hunger--;
    jsonData.player.thirst--;
    if (jsonData.player.rounds % 5 == 0) {
        jsonData.player.fire--;
        jsonData.player.health++;
    }
    loadInventory();
    loadPlayer();
    activateButtons();
    deactivateButtons();

    escape();
    checkForCorpses();
    setTimeout(() => getAttacked(),500);
    setTimeout(() => warn(),1000);
};


// Vorgehen wenn Spieler stirbt
const die = (reason) => {
    if (reason == 'freeze') {
        alert('Es wird immer kälter und kälter - du hast vergessen, dein Feuer zu schüren. Du schläfst ein und wachst nicht mehr auf.\n\nDu bist tot!\nGrund: Erfrieren');
    };
    if (reason == 'thirst') {
        alert('Der Durst wird unerträglich! Aus der Not heraus trinkst du etwas Meerwasser, es beschleunigt aber nur deinen Tod.\n\nDu bist tot!\nGrund: Verdursten');
    };
    if (reason == 'starve') {
        alert('Dein Magen knurrt, doch es ist nichts zu essen da. Du wirst immer schwächer, bis du plötzlich umkippst.\n\nDu bist tot!\nGrund: Verhungern');
    };
    if (reason == 'health') {
        alert('Du wurdest schwer verletzt.\n\nDu bist tot!\nGrund: Verbluten');
    };
    if (reason == 'old') {
        alert('Du sammelst und baust und merkst dabei gar nicht, wie die Zeit verrinnt. Ehe du es merkst, bist du alt geworden.\n\nDu bist tot!\nGrund: Alter');
    };
    location.reload;
};


// Funktionen der Buttons ---------------------------------------------------------------------------------
// Wald durchsuchen
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
    setTimeout(() => findEasterEggs(),2000);
    endRound();
};


// Feuer schüren
const stokeFire = () => {

    if (jsonData.inventory.wood > 0 && jsonData.player.fire < 3) {
        jsonData.inventory.wood--;
        jsonData.player.fire = 3;
        newStoryPart('Dein Feuer lodert.');
    };
    endRound();
};


// Fisch essen
const eatFish = () => {
    if (jsonData.inventory.fish > 0) {
        jsonData.inventory.fish--;
        jsonData.player.hunger += 8;
    }
    endRound();
};


// Kokoswasser trinken
const drinkCoco = () => {
    if (jsonData.inventory.coco > 0) {
        jsonData.inventory.coco--;
        jsonData.player.thirst += 8;
    }
    endRound();
};


// Fisch jagen
const huntFish = () => {
    const addedFish = createNumber(0, 1);
    if (addedFish == 0) {
        newStoryPart(`Du hast versucht, mit deinem Speer einen Fisch zu fangen, aber warst nicht erfolgreich. Versuch es weiter, auch ein blindes Huhn fängt irgendwann einen Fisch!`)
    } else {
        jsonData.inventory.fish++;
        newStoryPart(`Du hast mit deinem Speer einen Fisch erlegt. Nicht schlecht!`);
        jsonData.inventory.spear--;
    };
    endRound();
};


// Speer herstellen
const makeSpear = () => {
    jsonData.inventory.spear++;
    jsonData.inventory.stone--;
    jsonData.inventory.sticks--;
    newStoryPart(`Du hast einen spitzen Stein an einem Stock befestigt. Lange wird das sicher nicht halten, aber vielleicht kannst du damit ja den ein oder anderen Fisch fangen.`)
    endRound();
};


// Brett herstellen
const makePlank = () => {
    jsonData.inventory.plank++;
    jsonData.inventory.wood -= 3;
    newStoryPart(`Du hast etwas Holz genutzt, um ein Brett herzustellen... Oder zumindest etwas, das danach aussieht. Bete besser, dass das hält!`)
    endRound();
};


// Seil knüpfen
const makeRope = () => {
    jsonData.inventory.rope++;
    jsonData.inventory.leaves -= 5;
    newStoryPart(`Mit etwas Geschick und viel Geduld hast du Palmblätter ineinander geflochten. Was du in den Händen hältst sieht aus, wie ein relativ stabiles Seil.`)
    endRound();
};


// Mast herstellen
const makePole = () => {
    jsonData.inventory.pole++;
    jsonData.inventory.wood -= 20;
    jsonData.inventory.rope -= 10;
    newStoryPart(`Du hast viel Holz mit Seilen zusammengebunden. Jetzt hast du etwas, was aussieht wie ein billiger Marterpfahl. Da du niemanden zum martern hast, wird er sich aber auch als Mast eignen.`)
    endRound();
};


// Segel herstellen
const makeSail = () => {
    jsonData.inventory.sail++;
    jsonData.inventory.rope -= 20;
    newStoryPart(`Es ist vielleicht nicht schön oder stabil oder effizient... Aber es taugt als Segel für dein Floß!`)
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