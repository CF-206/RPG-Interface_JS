// Classe Item simplifiee : creer un item + le mettre au localStorage
class Item {
    static TYPES = ["equipement", "consommable", "temporaire"];
    static RARETES = ["commun", "peu commun", "rare", "epique", "legendaire"];
    static SLOTS = ["tete", "torse", "jambiere", "botte", "arme"];
    // Nom de la cle dans le localStorage
    static STORAGE_KEY = "rpg_items";

    constructor({ id = null, nom, visuel = "", description = "", stats = {}, puissance = 0, rarete = "commun", type, slot = null, dureeMs = null }) {
        // Verifs de base
        if (typeof nom !== "string" || nom === "") {
            throw new TypeError("nom doit etre une chaine non vide");
        }
        if (!Item.TYPES.includes(type)) {
            throw new RangeError(`type invalide : ${Item.TYPES.join(", ")}`);
        }
        if (type === "equipement" && !Item.SLOTS.includes(slot)) {
            throw new RangeError(`slot invalide : ${Item.SLOTS.join(", ")}`);
        }

        this.id = id ?? nom; // si pas d'id, on utilise le nom
        this.nom = nom;
        this.visuel = visuel;
        this.description = description;
        this.stats = stats;
        this.puissance = puissance;
        this.rarete = rarete;
        this.type = type;
        this.slot = slot;
        this.dureeMs = dureeMs;
    }

    // Recupere tous les items depuis le localStorage
    static getAll() {
        const texte = localStorage.getItem(Item.STORAGE_KEY);
        if (!texte) return []; // rien stocke pour l'instant
        return JSON.parse(texte);
    }

    // Affiche la liste complete dans la console
    static logAll() {
        console.log(Item.getAll());
    }

    // Ajoute CET item au localStorage
    save() {
        // 1. On recupere la liste deja stockee (ou [] si vide)
        const liste = Item.getAll();
        // 2. On ajoute l'item actuel (en version simple, sans methodes)
        liste.push({ ...this });
        // 3. On re-ecrit toute la liste en texte JSON
        localStorage.setItem(Item.STORAGE_KEY, JSON.stringify(liste));
    }

    // Ajoute une liste d'items au localStorage
    SaveAll(datas){
        for (const data of datas) {
            const item = new Item(data);
            item.save();
        }
    }
}

export default Item;
