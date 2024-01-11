let random;
let thm = false;
let wilson = false;
let hatch = false;

// https://de.wikipedia.org/wiki/Monkey_Island#Running_Gags
const findTHM = () => {
    if (random == 50) {
        newStoryPart(`Als du durch den Wald irrst, entdeckst du plötzlich etwas, das sich zwischen den Blättern bewegt. Warte mal, ist das etwa... EIN DREIKÖPFIGER AFFE?!`);
    }
    thm = true;
};

// https://de.wikipedia.org/wiki/Cast_Away_%E2%80%93_Verschollen#Handlung
const findWilson = () => {
    if (random == 25) {
        newStoryPart(`Du schlenderst durch den Wald, die Arme voller Items, als du plötzlich stolperst und alles verlierst. Schnell sammelst du alles wieder auf. Aber was ist das? Ein Volleyball der Marke Wilson, dem jemand ein Gesicht gemalt hat?`);
    }
    wilson = true;
};

// https://de.wikipedia.org/wiki/Lost_(Fernsehserie)#Bedeutung_der_Zahlen
const findHatch = () => {
    if (random == 75) {
        newStoryPart(`Auf der Suche nach Steinen schiebst du etwas Laub beiseite. Du entdeckst eine Luke im Boden. Jemand hat Zahlen darauf eingekratzt: 4 8 15 16 23 42...`);
    }
    hatch = true;
};

const findEasterEggs = () => {
    random = createNumber (0,100);
    console.log(`Easteregg Random Number: ${random}`); //DEBUG
    if (!thm) findTHM();
    if (!wilson) findWilson();
    if (!hatch) findHatch();
};
