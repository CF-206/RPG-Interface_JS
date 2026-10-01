// Init simple du jeu : 1 item cree -> stocke -> affiche
import Item from "./class/Item.js";

// 1. On cree un item avec la classe
const epee = new Item({
    nom: "Epee en fer",
    visuel: "🗡️",
    description: "Arme de base",
    stats: { force: 2 },
    puissance: 4,
    rarete: "commun",
    type: "equipement",
    slot: "arme",
});

// 2. On l'ajoute au localStorage
epee.save();

// 3. On affiche la liste complete des items stockes
Item.logAll();
