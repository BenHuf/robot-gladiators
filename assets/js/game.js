// My Code
// Player variables

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 1000;
var playerAttack = 10;
var playerMoney = 10;

// Log player variables
    console.log("Player name = " + playerName, "\n" +  "Player health = " + playerHealth, "\n" + "Player attack = " + playerAttack)

// Enemy variables
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyAttack = 12;

/* Log enemy variables
    console.log(enemyNames);
    console.log(enemyNames[0]);
    console.log(enemyNames[1]);
    console.log(enemyNames[2]);
    console.log(enemyNames.length);
    for(var i = 0; i < enemyNames.length; i++) {
        console.log(enemyNames[i]);
        console.log(i);
        console.log(enemyNames[i] + " is at " + i + " index.");
    }
*/

var fight = function(enemyName) {
    while(playerHealth > 0 && enemyHealth > 0) {
        // Ask player if they would like to fight or skip this battle
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // If player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("Your remaining money = " + playerMoney);
                break;
            }
        }
        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + " . " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
        }

        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // remove players's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + " . " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave while() loop if player is dead
            break;
        }

        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    } // end of while loop
}; // end of fight function

var startGame = function() {
    // reset player stats
    playerHealth = 1000;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round -" + (i + 1) + "- Start!");

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = 50;

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
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
    if (playerHealth > 0) {
        window.alert("Great job, you survived!\nYour score: " + playerMoney + ".");
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

// start the game when the page loads
startGame();