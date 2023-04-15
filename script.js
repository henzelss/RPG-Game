

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterName;
let monsterHealth;
let inventory = ['stick'];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const goldText = document.querySelector("#xpGold");
const healthText = document.querySelector("#xpHealth");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name :  "stick",
        power: 5
    },
    {
        name :  "dagger",
        power : 30
    },
    {
        name :  "claw hammer",
        power : 50
    },
    {
        name :  "sword",
        power : 100
    }

]

const monsters = [
    {
        name : "Slime",
        level : 2,
        health : 15
    },
    {
        name : "Fange beast",
        level : 8,
        health : 60
    },
    {
        name : "Dragon",
        level : 20,
        health : 300
    }
]

const newLocal = "kill monster";
const locations = [
    {
        name : "town square",
        "button text" : ['Go to Store', 'Go to Cave', 'Fight Dragon'],
        "button functions" : [goStore, goCave, fightDragon],
        text : "You are in the town you can see a sign \"store\"."    
    },
    {
        name : "store",
        "button text" : ['Buy 10 Health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
        "button functions" : [buyHealth, buyWeapon, goTown],
        text : "You Enter the Store"    
    },
    {
        name : "cave",
        "button text" : ['Fight Slime', 'Fight fanged Beast', 'Go to town square'],
        "button functions" : [fightSlime, fightBeast, goTown],
        text : "You Enter the Cave, you see some monsters" 
        
    },
    {
        name : "fight",
        "button text" : ['Attack', 'Dodge', 'Run'],
        "button functions" : [attack, dodge, goTown],
        text : "You are fighting a monster" 
        
    },
    {
        name : "kill monster",
        "button text" : ['Go to town Square', 'Go to town Square', 'Go to town Square'],
        "button functions" : [goTown, goTown, easterEgg],
        text : 'The monster screams "Arg!" as it dies. You gained experience points and find gold.' 
        
    },
    {
        name : "lose",
        "button text" : ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        "button functions" : [restart, restart, restart],
        text : 'You Die!!!.' 
        
    },
    {
        name : "win",
        "button text" : ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        "button functions" : [restart, restart, restart],
        text : 'You defeated the dragon you win the game!!!!!🥳🥳' 
        
    },
    {
        name : "easter egg",
        "button text" : ['3', '7', 'Go to town square?'],
        "button functions" : [pickThree, pickSeven, goTown],
        text : 'You find a secret game. Pick a number above. Ten numbers will berandombly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!'
    }

];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1]; 
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;

}

function goTown() {
    update(locations[0]);

}

function goStore() {
    update(locations[1]);

}

function goCave() {
    update(locations[2]);
}

function buyHealth() {

    if (gold < 10) {
        text.innerText ="You do not have enough gold to buy health";
    }else {
        health += 10;
        gold -= 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    
}

function buyWeapon() {

    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;   
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
            
        } else {
            text.innerText = "You do no have enough gold to buy another weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell Weapon for 15 gold.";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (weapons.length < 1) {
        text.innerText = "Don't sell your only weapon. "
    } else {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();   
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " You now have: " + inventory; 
    }
}

function fightSlime() {
    fighting = 0;
    goFight();

}

function fightBeast() {
    fighting = 1;
    goFight();

} 

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks!!";
    text.innerText += "\nYou attack it with your " + weapons[currentWeapon].name + " .";
    if (attackHit()) {
        let damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        monsterHealth -= damage;
        console.log("Your damage: " + damage);
    } else {
        text.innerText += "\nYou miss.";
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += "\nYour " + inventory.pop() + " breaks!!!!";
        text.innerText += "\nYou only have " + inventory + " in your inventory.";
        currentWeapon--;
    }
    let damage = getMonsterAttackValue(monsters[fighting].level);
    health -= damage;
    console.log("Monster's Damage : " + damage);
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose(); 
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();     
    }

}

function attackHit() {
    return Math.random() > .2 || health < 20;
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}

function dodge() {
    text.innerText = "You dodged the attack from " + monsters[fighting].name + "!";

}

function defeatMonster() {
    gold += Math.round(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);

}

function winGame(){
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['stick'];
    goldText.innerText = gold;
    xpText.innerText = xp;
    healthText.innerText = health;

    goTown();
    
}

function easterEgg() {
    update(locations[7]);
}

function pickThree() {
    pick(3);

}
function pickSeven() {
    pick(7);

}
function pick(guess) {
    let numbers = [];

    while (numbers.length < 10){
        
        numbers.push(Math.floor(Math.random() * 11))
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers: \n";
    
    for (let i = 0; i < 10; i++){
        text.innerText += numbers[i] + "\n"; 
    }

    if (numbers.indexOf(guess) !== -1 ){
        text.innerText += "Tangina nanalo pa nga ng 20 gold👏👏👀!!!";
        gold += 20;
        goldText.innerText = gold;
    }else {
        text.innerText += "Wrong you lose 30 health hahwhha😁😁😁!!!";
        health -= 30;
        healthText.innerText = health;

        health < 0 ? lose() : '';
    }

}