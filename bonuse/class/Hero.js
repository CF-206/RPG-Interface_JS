class Hero {
    constructor(nom, mana, force) {
        if (typeof nom !== "string") {
            throw new TypeError("nom doit être une chaîne de caractères");
        }
        if (!Number.isInteger(mana)) {
            throw new TypeError("mana doit être un entier");
        }
        if (!Number.isInteger(force)) {
            throw new TypeError("force doit être un entier");
        }

        this.nom = nom;
        this.mana = mana;
        this.force = force;
        this.pv = 10
        this.dexterity = 3
        this.puissance = null;
        this.money = 0;
        this.inventory = {
            sac: [],
            equipments: { tete: null, torse: null, jambiere: null, botte: null, arme: null },
        };
        this.level = 0
        this.classe = this.setClasse();
    }

    get mana() {
        return this._mana;
    }

    set mana(valeur) {
        if (!Number.isInteger(valeur)) {
            throw new TypeError("mana doit être un entier");
        }
        this._mana = valeur;
    }

    get force() {
        return this._force;
    }

    set force(valeur) {
        if (!Number.isInteger(valeur)) {
            throw new TypeError("force doit être un entier");
        }
        this._force = valeur;
    }

    get level() {
        return this._level;
    }

    set level(valeur) {
        if (!Number.isInteger(valeur)) {
            throw new TypeError("level doit être un entier");
        }
        this._level = valeur;
    }

    get money() {
        return this._money;
    }

    set money(valeur){
        if (typeof valeur !== "number" || Number.isNaN(valeur)) {
            throw new TypeError('money doit être un nombre')
        }
        this._money = valeur
    }

    get dexterity() {
        return this._dexterity;
    }

    set dexterity(valeur){
        if (!Number.isInteger(valeur)) {
            throw new TypeError("dexterity doit être un entier");
        }
        this._dexterity = valeur
    }

    get pv() {
        return this._pv;
    }

    set pv(valeur){
        if (!Number.isInteger(valeur)) {
            throw new TypeError("pv doit être un entier");
        }
        this._pv = valeur
    }

    setClasse() {
        if (this.force > 0 && this.force >= this.mana * 2) {
            return "guerrier";
        } else if (this.mana > 0 && this.mana >= this.force * 2) {
            return "magicien";
        }else {
            return "oublier";
        }
    }
}
export default Hero;