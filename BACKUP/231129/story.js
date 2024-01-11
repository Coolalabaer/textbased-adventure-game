// Start ---------------------------------------------------------------------------------------------------
setTimeout(() => newStoryPart('Als du zu dir kommst hörst du das Rauschen des Meeres. Dein Kopf fühlt sich an, als ob du die wildeste Nacht deines Lebens hattest. Du öffnest die Augen.'), 1000);
setTimeout(() => newStoryPart('Es müss wohl wirklich eine wilde Nacht gewesen sein. Du siehst dich um: Sand, Palmen und der endlos scheinende Ozean. Wie zur Hölle bist du da hingekommen?'), 6000);
setTimeout(() => newStoryPart('Du musst hier weg! Aber du bist vorbereitet, du hast alle Inselfilme gesehen, du weißt, was zu tun ist: Baue ein Floß und bleibe am Leben!'), 11000);


// Warnungen -----------------------------------------------------------------------------------------------
let warnedFire = false;
let warnedHunger = false;
let warnedThirst = false;
let warnedHealth = false;
let warnedAge = false;
let warnedAge2 = false;

// Wird nach jeder Runde aufgerufen, warnt den Spieler rechtzeitig vor dem Tod
const warn = () => {
    if (jsonData.player.fire < 1) {
        if (!warnedFire) {
            newStoryPart('Es ist ganz schön kalt. Vielleicht solltest du ein Lagerfeuer entfachen.');
            warnedFire = true;
        }
    } else warnedFire = false;

    if (jsonData.player.hunger < 1) {
        if (!warnedHunger) {
            newStoryPart('Dein Magen knurrt. Du solltest dringend etwas essen!');
            warnedHunger = true;
        }
    } else warnedHunger = false;

    if (jsonData.player.thirst < 1) {
        if (!warnedThirst) {
            newStoryPart('Du dehydrierst! Trinke besser schnell etwas.');
            warnedThirst = true;
        }
    } else warnedThirst = false;

    if (jsonData.player.health < 1) {
        if (!warnedHealth) {
            newStoryPart('Du bist schwer verletzt, jetzt darf dir nichts mehr passieren. Stelle sicher, dass dein Feuer brennt und bewaffne dich, falls dich ein Tier angreift!');
            warnedHealth = true;
        }
    } else warnedHealth = false;

    if (jsonData.player.rounds > 130) {
        if (!warnedAge) {
            newStoryPart('Du spielst schon eine ganze Weile. Beeile dich besser, nicht dass du auf der Insel alt wirst...');
            warnedAge = true;
        }
    };

    if (jsonData.player.rounds > 140) {
        if (!warnedAge2) {
            newStoryPart('Du solltest dich beeilen. Du hast nicht mehr viel Zeit...');
            warnedAge = true;
        }
    };
};


// Angriffe
const getAttacked = () => {
    let random = -1;

    // Wenn das Feuer brennt (nicht glüht) dann ist die Wahrscheinlichkeit angegriffen zu werden geringer
    if (jsonData.player.fire > 1) random = createNumber(0, 30)
    else random = createNumber(0, 10);

    if (random == 1) {
        let output = 'Mitten in der Nacht wachst du von einem Geräusch auf. Als du die Augen öffnest siehst du einem Bären ins Gesicht. ';

        if (jsonData.inventory.spear > 0) {
            jsonData.player.health -= 2;
            output += 'Zum Glück hast du einen Speer, mit dem du ihn in die Flucht jagen kannst, bevor er dich gefährlich verletzt. Du kommst mit ein paar Kratzern davon.';
        }
        else {
            jsonData.player.health -= 5;
            output += 'Du suchst verzweifelt etwas, um dich zu verteidigen, doch du findest nichts. Der Bär versucht deine Nase zu fressen. ';
            
            if (jsonData.inventory.fish > 0) {
                jsonData.inventory.fish--;
                output += 'In deiner Verzweiflung versuchst du dich mit dem einzigen Item in deiner Nähe zu verteidigen: einem Fisch. Es funktioniert, der Bär zieht mit dem Fisch davon. Du hast aber einige Bisse und Prellungen abbekommen.';
            } else {
                output += 'Erst als er merkt, dass dein Gesicht nicht schmeckt, lässt er von dir ab. Du hast starke Verletzungen und einige Knochenbrüche.';
            };

    };
        
        newStoryPart(output);
    };
};


// Vorgehen fürs Entkommen von der Insel
const escape = () => {
    if (jsonData.inventory.sail > 0 && jsonData.inventory.pole > 0 && jsonData.inventory.plank > 19 && jsonData.inventory.rope > 9 && jsonData.inventory.fish > 2 && jsonData.inventory.coco > 2) {
        setTimeout(() => newStoryPart('Du hast alles, was du für deine Flucht von dieser Insel benötigst.'), 1000);
        setTimeout(() => newStoryPart('Du legst die Bretter aus, bindest sie zusammen, befestigst dein Segel am Mast und stellst ihn auf. Darunter finden Fische und Kokosnüsse für die Reise Platz.'), 6000);
        setTimeout(() => newStoryPart('Es kann losgehen! Du schiebst das Floß mit Anlauf ins Wasser und springst drauf, als du nicht mehr stehen kannst. Du hisst das Segel.'), 1100);
        setTimeout(() => newStoryPart('Drei Tage später...'), 1600);
        setTimeout(() => newStoryPart('Am Horizont erblickst du einen Leuchtturm. Du hast es geschafft! Du bist frei!'), 2100);
        setTimeout(alert('Das Spiel hat dir hoffentlich viel Spaß gemacht. Aber es gibt etwas, das keinen Spaß macht: Tatsächlich mit einem klapprigen Boot über das Meer flüchten zu müssen.\nAllein im Mittelmeer sind in den letzten 10 Jahren über 28.000 Menschen bei dem Versuch, Krieg, Hunger und bitterer Armut zu entkommen, ertrunken.\nDie UNO Flüchtlingshilfe versucht diese Zustände zu verbessern. Mehr Infos findest du unter uno-fluechtlingshilfe.de.'), 2600);
    }
};



// Hier wenn noch Zeit ist Anleitung einbauen