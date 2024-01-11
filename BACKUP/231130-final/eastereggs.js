let random;
let thm = false;
let wilson = false;
let hatch = false;

const eastereggs = {
    // https://de.wikipedia.org/wiki/Monkey_Island#Running_Gags
    findTHM() {
        thm = true;
        return (`Als du durch den Wald irrst, entdeckst du plötzlich etwas, das sich zwischen den Blättern bewegt. Warte mal, ist das etwa... EIN DREIKÖPFIGER AFFE?!`);
    },

    // https://de.wikipedia.org/wiki/Cast_Away_%E2%80%93_Verschollen#Handlung
    findWilson() {
        wilson = true;
        return (`Du schlenderst durch den Wald, die Arme voller Items, als du plötzlich stolperst und alles verlierst. Schnell sammelst du alles wieder auf. Aber was ist das? Ein Volleyball der Marke Wilson, dem jemand ein Gesicht gemalt hat?`);
    },

    // https://de.wikipedia.org/wiki/Lost_(Fernsehserie)#Bedeutung_der_Zahlen
    findHatch() {
        hatch = true;
        return (`Auf der Suche nach Steinen schiebst du etwas Laub beiseite. Du entdeckst eine Luke im Boden. Jemand hat Zahlen darauf eingekratzt: 4 8 15 16 23 42...`);
    },

    findEasterEggs() {
        random = createNumber(0, 100);
        // console.log(`Eastereggs:\nthm=${thm}, wilson=${wilson}, hatch=${hatch}, random=${random}`); //DEBUG
        if (!thm && random == 1) return (eastereggs.findTHM());
        if (!wilson && random == 2) return (eastereggs.findWilson());
        if (!hatch && random == 3) return (eastereggs.findHatch());
    }
}