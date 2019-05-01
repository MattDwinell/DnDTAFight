
$(document).ready(function () {
    //firebase initialize
    var config = {
        apiKey: "AIzaSyA4ctncoxGe-phiWA-RCJkrXccGxDBoep4",
        authDomain: "dnd-fight.firebaseapp.com",
        databaseURL: "https://dnd-fight.firebaseio.com",
        projectId: "dnd-fight",
        storageBucket: "dnd-fight.appspot.com",
        messagingSenderId: "702540590326"
    };
    firebase.initializeApp(config);
    database = firebase.database();
    var generator = "null";
    var messageCount = 0;
    var defeatedOpponents = 0;
    var defeatedPlayer = 0;

    //setting the initial player and opponent objects. we can add more attributes to pass in as needed.
    var opponentImage = "";
    var userImage = "";
    var player = {
        name: "bob",
        armorClass: 0,
        hitPoints: 0,
        damageDice: "1d4",
        attackBonus: 0,
        damageBonus: 0,
        stillImageUrl: "",
        activeImageUrl: ""
    }
    var opponent = {
        name: "",
        armorClass: 0,
        hitPoints: 0,
        damageDice: "1d4",
        attackBonus: 0,
        stillImageUrl: "",
        activeImageUrl: ""
    }
    // on click event for generating user character
    $("#generate-user-character").on("click", function (event) {
        event.preventDefault();
        generator = "player"
        userImage = $("#user-image-holder").attr("src");
        if (userImage == "") {
            $("#generate-user-character").css("visibility", "hidden");
            $("#user-image-holder").css("visibility", "visible");
            $("#player-name").css("visibility", "visible");
            $("#player-hp").css("visibility", "visible");
            var randomIndex = Math.ceil(Math.random() * 325);
            var dndURL = "https://cors.io/?http://dnd5eapi.co/api/monsters/" + randomIndex + "/";
            $.ajax({
                url: dndURL,
                method: "GET"
            }).then(function (response) {
                var result = JSON.parse(response);
                player.name = result.name;
                player.armorClass = result.armor_class;
                player.hitPoints = result.hit_points;
                console.log(player, result);
                if (result.actions) {
                    for (var i = 0; i < result.actions.length; i++) {
                        if (result.actions[i].damage_dice) {
                            player.damageDice = result.actions[i].damage_dice;
                            player.attackBonus = result.actions[i].attack_bonus;
                            player.damageBonus = result.actions[i].damage_bonus;
                            i = result.actions.length;
                        } else {
                            player.damageDice = "1d4"
                            player.attackBonus = 0;
                            player.damageBonus = 0;
                        }
                    }
                } else {
                    player.damageDice = "1d4"
                    player.attackBonus = 0;
                    player.damageBonus = 0;
                }

                player.name = player.name.split(' ').join('+');

                giphyURL = "https://api.giphy.com/v1/gifs/random?apikey=ZyUXN606XVdEZHZ5sk3RWjOKSzOOFOyk&tag=" + player.name;
                setTimeout(userGoogleRetrieve, 1000);
                $("#player-name").text("Your body has become that of a " + player.name.split("+").join(' ') + ".").css("visibility", "visible");
                $("#player-hp").text("Current HP: " + player.hitPoints);

            })
        }
    })
    //on click event for generating opponent's character

    $("#generate-opponent-character").on("click", function (event) {
        event.preventDefault();
        generator = "opponent";
        opponentImage = $("#opponent-image-holder").attr("src");
        if (opponentImage == "") {
            $("#generate-opponent-character").css("visibility", "hidden");
            $("#opponent-image-holder").css("visibility", "visible");
            $("#opponent-name").css("visibility", "visible");
            $("#opponent-hp").css("visibility", "visible");
            var randomIndex = Math.ceil(Math.random() * 325);
            var dndURL = "https://cors.io/?http://dnd5eapi.co/api/monsters/" + randomIndex + "/";
            $.ajax({
                url: dndURL,
                method: "GET"
            }).then(function (response) {
                var result = JSON.parse(response);
                opponent.name = result.name;
                opponent.armorClass = result.armor_class;
                opponent.hitPoints = result.hit_points;
                console.log(opponent, result);
                if (result.actions) {
                    for (var i = 0; i < result.actions.length; i++) {
                        if (result.actions[i].damage_dice) {
                            opponent.damageDice = result.actions[i].damage_dice;
                            opponent.attackBonus = result.actions[i].attack_bonus;
                            opponent.damageBonus = result.actions[i].damage_bonus;
                            i = result.actions.length;
                        } else {
                            opponent.damageDice = "1d4"
                            opponent.attackBonus = 0;
                            opponent.damageBonus = 0;
                        }
                    }
                } else {
                    opponent.damageDice = "1d4"
                    opponent.attackBonus = 0;
                    opponent.damageBonus = 0;
                }

                opponent.name = opponent.name.split(' ').join('+');
                giphyURL = "https://api.giphy.com/v1/gifs/random?apikey=ZyUXN606XVdEZHZ5sk3RWjOKSzOOFOyk&tag=" + opponent.name;
                setTimeout(opponentGoogleRetrieve, 1000);
                $("#opponent-name").text("The " + opponent.name.split('+').join(' ') + " has entered the arena.").css("visibility", "visible");
                $("#opponent-hp").text("Current HP: " + opponent.hitPoints);


            })
        }
    })



    //setting google retrieve as a separate function to be called one second after first api call- to prevent .then problems.
    function userGoogleRetrieve() {

        var googleUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU&cx=008788128101746337676:gz0k2znll90&q=dnd+" + player.name + "=1&searchType=image&num=2";
        $.ajax({
            url: googleUrl,
            method: "GET"

        }).then(function (googleresponse) {
            console.log(googleresponse.items[0].link);
            player.stillImageUrl = googleresponse.items[0].link;
            $("#user-image-holder").attr("src", player.stillImageUrl);
            player.name = player.name.split('+').join(" ")

        });

    }
    //setting a separate function for opponent google retrieve. we will try and combine the two functions when we DRY up the code
    function opponentGoogleRetrieve() {
        var googleUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU&cx=008788128101746337676:gz0k2znll90&q=dnd+" + opponent.name + "=1&searchType=image&num=2";
        $.ajax({
            url: googleUrl,
            method: "GET"

        }).then(function (googleresponse) {
            console.log(googleresponse.items[0].link);
            opponent.stillImageUrl = googleresponse.items[0].link;
            $("#opponent-image-holder").attr("src", opponent.stillImageUrl);
            opponent.name = opponent.name.split('+').join(" ");
        });

    }
    //coding the on'click button for fighting.
    $("#attack").on("click", function (event) {
        event.preventDefault();
        console.log(userImage, opponentImage, player.damageDice);
        if (player.hitPoints > 0 && opponent.hitPoints > 0) {
            $("#opponent-image-holder").effect("shake");
            console.log(player, opponent);
            var playerAttackMessage = "";
            var d20 = Math.ceil(Math.random() * 20);
            var playerAttackRoll = d20 + player.attackBonus;
            if (playerAttackRoll >= opponent.armorClass) {
                var damageDiceArray = player.damageDice.split('');
                var numDice = damageDiceArray[0];
                if (damageDiceArray.length == 3) {
                    var diceSides = parseInt(damageDiceArray[2], 10);
                // } else if (damageDiceArray.length == 4) {
                //     var diceSides = parseInt(damageDiceArray[2] + damageDiceArray[3], 10);
                // 
                }else {
                    //temporary, need to code something to address formats like 1d10 + 1d8
                    var diceSides = 6;
                }
                if (player.damageBonus == "undefined"){
                    player.damageBonus = 0;
                }
                var playerAttackDamage = player.damageBonus;
                for (var i = 0; i < numDice; i++) {
                    playerAttackDamage += Math.ceil(Math.random() * diceSides);
                }
                console.log(damageDiceArray);


                playerAttackMessage += "You rolled a " + playerAttackRoll + " and hit the " + opponent.name + " for " + playerAttackDamage + " damage.";
                opponent.hitPoints -= playerAttackDamage
                $("#opponent-hp").text("Current HP: " + opponent.hitPoints);


            } else {
                playerAttackMessage += "You rolled a " + playerAttackRoll + " and you were unable to hit the " + opponent.name;
            }
            var playerDialogMessage = $("<p>").text(playerAttackMessage).attr("class", "green accent-1");
            $("#dialog-box").prepend(playerDialogMessage);
            messageCount++;
            dialogScrubber();
            console.log(playerAttackRoll, playerAttackMessage);
            if (opponent.hitPoints <= 0) {
                opponentDeath();
            } else {
                setTimeout(opponentAttack, 800);
            }






        }

    })
    function opponentAttack() {
        $("#user-image-holder").effect("shake");
        console.log("opponent attack is working");
        var opponentAttackMessage = "";
        var d20 = Math.ceil(Math.random() * 20);
        var opponentAttackRoll = d20 + opponent.attackBonus;
        if (opponentAttackRoll >= player.armorClass) {
            var damageDiceArray = opponent.damageDice.split('');
            var numDice = damageDiceArray[0];
            if (damageDiceArray.length == 3) {
                var diceSides = damageDiceArray[2];
            } else {
                //temporary, need to code something to address formats like 1d10 + 1d8
                var diceSides = 6;
            }
            if (opponent.damageBonus == "undefined"){
            opponent.damageBonus = 0;
            }
            var opponentAttackDamage = opponent.damageBonus;
            for (var i = 0; i < numDice; i++) {
                opponentAttackDamage += Math.ceil(Math.random() * diceSides);
            }
            console.log(damageDiceArray);
            damageDiceArray.splice(0, 6);
            console.log(damageDiceArray);
            if (typeof damageDiceArray[0] !== "undefined") {
                numDice = damageDiceArray[0];
                diceSides = damageDiceArray[2];
                for (var i = 0; i < numDice; i++) {
                    opponentAttackDamage += Math.ceil(Math.random() * diceSides);
                }
            }
            opponentAttackMessage += "the " + opponent.name + " rolled a " + opponentAttackRoll + " and hit you for " + opponentAttackDamage + " damage.";
            player.hitPoints -= opponentAttackDamage;
            $("#player-hp").text("Current HP: " + player.hitPoints);


        } else {
            opponentAttackMessage += "the " + opponent.name + " rolled a " + opponentAttackRoll + " and missed you.";
        }
        var opponentDialogMessage = $("<p>").text(opponentAttackMessage).attr("class", "green accent-1");
        $("#dialog-box").prepend(opponentDialogMessage);
        messageCount++;
        dialogScrubber();
        console.log(opponentAttackRoll, opponentAttackMessage);
        if (player.hitPoints <= 0) {
            playerDeath();
        }

    }

    function opponentDeath() {
        defeatedPlayer = 0;
        defeatedOpponents++;
        console.log(defeatedOpponents);
        var victoryMessage = $("<p>").text("You have destroyed the " + opponent.name + "! You take a moment to rest before your next battle");
        player.hitPoints += 5;
        $("#player-hp").text("current HP: " + player.hitPoints);
        $("#dialog-box").prepend(victoryMessage);
        dialogScrubber();
        opponentDeathAnimation();
        if (defeatedOpponents == 5){
            playerImmortalize();
        }
            
        
    }
function opponentImageClear(){
    $("#opponent-image-holder").attr("src", "").css("visibility", "hidden");
    $("#generate-opponent-character").css("visibility", "visible");
    $("#opponent-hp").css("visibility", "hidden");
    $("#opponent-name").css("visibility", "hidden");
    if (defeatedOpponents == 5) {
        playerImmortalize();
    }
}
function opponentDeath(){
    console.log('working');
  
    setTimeout(opponentImageClear, 1000);
}

    function playerDeath() {
        defeatedOpponents = 0;
        defeatedPlayer++;
        opponent.hitPoints += 5;
        $("#opponent-hp").text("current HP: " + opponent.hitPoints);
        var defeatMessage = $("<p>").text("Your world goes black as the " + opponent.name.split('+').join(' ') + " destroys you. you have " + (3 - defeatedPlayer) + " tries remaining before the opponent monster is immortalized.");
        $("#dialog-box").prepend(defeatMessage);
        dialogScrubber();
        $("#user-image-holder").attr("src", "").css("visibility", "hidden");
        $("#generate-user-character").css("visibility", "visible");
        $("#player-hp").css("visibility", "hidden");
        $("#player-name").css("visibility", "hidden");
        if (defeatedPlayer == 3) {
            monsterImmortalize();
        }

    }


    function dialogScrubber() {
        if (messageCount > 5) {
            var dialogBox = document.getElementById("dialog-box");
            dialogBox.removeChild(dialogBox.childNodes[6]);
        }
    }

    function playerImmortalize() {

    }
    function monsterImmortalize() {

    }



    //firebase authentication stuff:
    $("#sign-in").on("click", function (event) {
        event.preventDefault();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        console.log(email, password);
        if (!email || !password) {
            $("#sign-in-message").text("please input both email and password to sign in, or create one by registering an account.");
        } else {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {  //telling users what they need to fix to sign in
                $("#sign-in-message").text(error.message);
            });



        }
    })

    $("#register").on("click", function (event) {
        event.preventDefault();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        console.log(email, password);
        if (!email || !password) {
            $("#sign-in-message").text("please input both email and password to sign in, or create one by registering an account.");
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) { // telling users what they need to fix to register
                $("#sign-in-message").text(error.message);
            });

        }
    })


    $(".sign-out").on("click", function () {
        firebase.auth().signOut();
    })
    //when the user logs in, we want to save their display name, hide the sign-in form, and show the train scheduler. if they sign out, we don't want them to have access to the train form until they sign back in.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            console.log(user);
            $("#sign-in-wrapper").css("display", "none");
            $("#app-wrapper").css("display", "block");
        } else {
            console.log("test");
            $("#sign-in-wrapper").css("display", "block");
            $("#app-wrapper").css("display", "block");

        }

    })
})
//google api or bing api info
//google:
//https://www.googleapis.com/customsearch/v1?key= + yourapikey + &cx=+ custom search engine id + &q= + player/monster.name + &num=1.
// api key generated for google custom search: AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU
// search engine id: 008788128101746337676:gz0k2znll90

//bing api stuff:
//Key 1: 0ba45ac78f5043529fb7f70fb4687509
//Key 2: 251d6748f3fd4dc8953688dee8ad66b1
//https://api.cognitive.microsoft.com/bing/v7.0/images/visualsearch
