let maxlimit = 10;
const enemy = [{name:"loup", money:2, force:1, magie:0, img:"🐺"},{name:"fantome", money:2, force:0, magie:1,img:"👻"},{name:"paladin", money:1, force:1, magie:1, img:"🛡️"}]
const name = "Alpha";
let force = 1;
let magie = 3;
let money = 0;
let classe = setclasse();
let inventory = [];

function setclasse() {
    if (force > 0 && force >= magie*2) {
        return "guerrier";
    }else if (magie > 0 && magie >= force*2) {
        return "magicien";
    }
}

function calculerniveau() {
    return force + magie;
}


function characterintegrity(){
    if(typeof(name) === "string" && typeof(force) === "number" && force > 0 && force <=maxlimit && typeof(magie) === "number" && magie > 0 && magie <=maxlimit && typeof(money) === "number" && money >= 0){
        if(calculerniveau() > 0 && money >= 0){
            return "Le personnage est valide";
        }
        return "Le personnage n'est pas valide";
    }
    return "Le personnage n'est pas valide";
}

function limiterValeurs(valeur,seconde,maxlimit){
    if(valeur + seconde > maxlimit){
        return maxlimit;
    }
    return valeur + seconde;
}

function affronter(enemy) {
    switch(enemy.name) {
        case "fantome":
            magie = limiterValeurs(magie, enemy.magie, maxlimit);
        case "loup":
            force = limiterValeurs(force, enemy.force, maxlimit);
        case "paladin":
            force = limiterValeurs(force, enemy.force, maxlimit);
            magie = limiterValeurs(magie, enemy.magie, maxlimit);
        money = limiterValeurs(money, enemy.money, maxlimit);
    }
    return (`Vous avez affronté un ${enemy.name} et vous avez maintenant ${money} pièces, ${force} de force et ${magie} de magie.`);
}

function CheckItemInventory(item) {
    if(inventory.includes(item)){
        return true;
    }
    return false;
}

let marchandise = {"clée":3, "chapeau":5};
function acheter(item) {
    if(marchandise[item] <= money ){
        if (CheckItemInventory(item) === false) {
            inventory.push(item);
            money = limiterValeurs(money, -marchandise[item], maxlimit);
            return `vous avez acheté ${item} pour ${marchandise[item]} pièces. il vous reste ${money} pièces.`;
        }
        return "vous n'avez pas pu acheter cet item car vous l'avez déjà";
    }
    return `vous n'avez pas assez d'argent pour acheter ${item} pour ${marchandise[item]} pièces.`;
}


function affronterboss() {
    if(CheckItemInventory("clée") && calculerniveau() === 20){
        inventory = inventory.filter(item => item !== "clée");  
        money += 10;
        return "vous n'avez plus de clée";
    }else if(CheckItemInventory("clée") === false){
        return "vous n'avez pas de clée";
    }else if(calculerniveau() < 20){
       return ("vous n'avez pas le niveau requis pour vaincre le boss");
    }
}

function credits() {
    console.log("Merci d'avoir joué à ce jeu !");
    console.log("Créé par Raven");
    console.log("Version 1.0");
}

function printretour(information) {
    let retour = document.getElementById("retour");
    retour.children[1].innerHTML = information;
}
let PlayerInfo = document.getElementById("player-info");
PlayerInfo.children[0].src="./sources/hero-magicien.png";
PlayerInfo.children[1].innerHTML = name;
PlayerInfo.children[2].innerHTML = classe;

function updateaffichagestatistics() {
    let Stats = document.getElementById("stats");
    Stats.children[1].innerHTML = "💪" + " " + "force: " + force;
    Stats.children[2].innerHTML = "⚡️" + " " + "magie: " + magie;
    Stats.children[3].innerHTML = "💰" + " " + "argent: " + money;    
    let inventoryaffichage = document.getElementById("inventory");
    // Clear the inventory display
    inventoryaffichage.innerHTML = "";
    for (let i = 0; i < inventory.length; i++) {
        let item = document.createElement("p");
        item.innerHTML = inventory[i];
        inventoryaffichage.appendChild(item);
    }
}
updateaffichagestatistics();

let combats = document.getElementById("combats");
for (let i = 0; i < enemy.length; i++) {
    let button = document.createElement("button");
    button.innerHTML = "affronter " + enemy[i].name + " " + enemy[i].img;
    button.addEventListener("click", function() {
        printretour(affronter(enemy[i]));
        updateaffichagestatistics();
    })
    combats.appendChild(button);
}

let magasin = document.getElementById("magasin");
for (let item in marchandise) {
    let button = document.createElement("button");
    button.innerHTML = "acheter " + item + " pour " + marchandise[item] + " pièces";
    button.addEventListener("click", function() {
        printretour(acheter(item));
        updateaffichagestatistics();
    })
    magasin.appendChild(button);
}

let boss = document.getElementById("boss");
let button = document.createElement("button");
button.innerHTML = "⚠️☠️ affronter le boss ☠️⚠️";
button.addEventListener("click", function() {
    printretour(affronterboss());
    updateaffichagestatistics();
})
boss.appendChild(button);