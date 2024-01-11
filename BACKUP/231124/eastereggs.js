let random;
let thm = false;
let wilson = false;
let hatch = false;

const findTHM = () => {
    if (random == 50) {
        newStoryPart(`Als du durch den Wald irrst, entdeckst du plötzlich etwas, das sich zwischen den Blättern bewegt. Warte mal, ist das etwa... EIN DREIKÖPFIGER AFFE?!`);
    }
    thm = true;
};

const findWilson = () => {
    if (random == 25) {
        newStoryPart(`Du schlenderst durch den Wald, die Arme voller Items, als du plötzlich stolperst und alles verlierst. Schnell sammelst du alles wieder auf. Aber was ist das? Ein Volleyball der Marke Wilson, dem jemand ein Gesicht gemalt hat?`);
    }
    wilson = true;
};

const findHatch = () => {
    if (random == 75) {
        newStoryPart(`Auf der Suche nach Steinen schiebst du etwas Laub beiseite. Du entdeckst eine Luke im Boden. Jemand hat Zahlen darauf eingekratzt: 4 8 15 16 23 42...`);
    }
    hatch = true;
};

const findEasterEggs = () => {
    random = createNumber (0,100);
    if (!Boolean(thm)) findTHM();
    if (!Boolean(wilson)) findWilson();
    if (!Boolean(hatch)) findHatch();
};
