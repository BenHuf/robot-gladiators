// My Code

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var fight = function(enemy) {

    while(playerInfo.health > 0 && enemy.health > 0) {
        // Ask player if they would like to fight or skip this battle
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("Your remaining money = " + playerInfo.money);
                break;
            }
        }
        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);

        console.log(
            playerInfo.name + " attacked " + enemy.name + " for " + damage + " HP. " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // Check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() loop since enemy is dead
            break;
        }

        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // remove players's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        console.log(
            enemy.name + " attacked " + playerInfo.name + " for " + damage + " HP. " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // leave while() loop if player is dead
            break;
        }

        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    } // end of while loop
}; // end of fight function

var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round -" + (i + 1) + "- Start!");

            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health with a random number before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {

                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, thake them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! GAME OVER.")
            break;
        }
    }  
    endGame();
};

var endGame = function() {
    // if the player is still alive
    if (playerInfo.health > 0) {
        window.alert("Great job, you survived!\nYour score: " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    
    else {
        window.alert("Thank you for playing Robot Gladiators!")
    }
}

var shop = function() {
    console.log("entered the shop");

    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE.'");

    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            playerInfo.refillHealth();
            break;
    
        case "upgrade":
        case "UPGRADE":
            playerInfo.upgradeAttack();
            break;

        case "leave":
        case "LEAVE":
            window.alert("Leaving the shop.")

            // do nothing so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.")

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
}

// Player Object
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 credits.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough credits!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 credits.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough credits!")
        }
    },
};

// Log player variables
console.log("Player name = " + playerInfo.name, "\n" +  "Player health = " + playerInfo.health, "\n" + "Player attack = " + playerInfo.attack, "\nPlayer money = " + playerInfo.money);

// Enemy Object
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },

    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },

    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start the game when the page loads
startGame();