
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
            var randomIndex = Math.ceil(Math.random() * 325);
            var dndURL = "https://cors.io/?http://dnd5eapi.co/api/monsters/" + randomIndex + "/";
            $.ajax({
                url: dndURL,
                method: "GET"
            }).then(function (response) {
                var result = JSON.parse(response);
                console.log(result, result.name);
                player.name = result.name;
                player.armorClass = result.armor_class;
                player.hitPoints = result.hit_points;
                if (result.actions[0].damage_dice) {
                    player.damageDice = result.actions[0].damage_dice;
                    player.attackBonus = result.actions[0].attack_bonus;
                    player.damageBonus = result.actions[0].damage_bonus;
                } else if (result.actions[1].damage_dice) {
                    player.damageDice = result.actions[1].damage_dice;
                    player.attackBonus = result.actions[1].attack_bonus;
                    player.damageBonus = result.actions[1].damage_bonus;
                } else if (result.actions[2].damage_dice) {
                    player.damageDice = result.actions[2].damage_dice;
                    player.attackBonus = result.actions[2].attack_bonus;
                    player.damageBonus = result.actions[2].damage_bonus;
                } else {
                    player.damageDice = "1d4"
                    player.attackBonus = 0;
                    player.damageBonus = 0;
                }
                console.log(player);
                console.log(player.name);
                player.name = player.name.split(' ').join('+');
                console.log(player.name);
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
            var randomIndex = Math.ceil(Math.random() * 325);
            var dndURL = "https://cors.io/?http://dnd5eapi.co/api/monsters/" + randomIndex + "/";
            $.ajax({
                url: dndURL,
                method: "GET"
            }).then(function (response) {
                var result = JSON.parse(response);
                console.log(result, result.name);
                opponent.name = result.name;
                opponent.armorClass = result.armor_class;
                opponent.hitPoints = result.hit_points;
                if (result.actions[0].damage_dice) {
                    opponent.damageDice = result.actions[0].damage_dice;
                    opponent.attackBonus = result.actions[0].attack_bonus;
                    opponent.damageBonus = result.actions[0].damage_bonus;
                } else if (result.actions[1].damage_dice) {
                    opponent.damageDice = result.actions[1].damage_dice;
                    opponent.attackBonus = result.actions[1].attack_bonus;
                    opponent.damageBonus = result.actions[1].damage_bonus;
                } else if (result.actions[2].damage_dice) {
                    opponent.damageDice = result.actions[2].damage_dice;
                    opponent.attackBonus = result.actions[2].attack_bonus;
                    opponent.damageBonus = result.actions[2].damage_bonus;
                } else {
                    opponent.damageDice = "1d4"
                    opponent.attackBonus = 0;
                    opponent.damageBonus = 0;
                }
                console.log(opponent);
                console.log(opponent.name);
                opponent.name = opponent.name.split(' ').join('+');
                console.log(opponent.name);
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
        console.log(googleUrl, player.name);
        $.ajax({
            url: googleUrl,
            method: "GET"

        }).then(function (googleresponse) {
            console.log(googleresponse);
            console.log(googleresponse.items[0].link);
            player.stillImageUrl = googleresponse.items[0].link;
            $("#user-image-holder").attr("src", player.stillImageUrl);
            player.name = player.name.split('+').join(" ")
            // console.log(giphyresponse.data.images.fixed_height_still.url);
        });

    }
    //setting a separate function for opponent google retrieve. we will try and combine the two functions when we DRY up the code
    function opponentGoogleRetrieve() {
        var googleUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU&cx=008788128101746337676:gz0k2znll90&q=dnd+" + opponent.name + "=1&searchType=image&num=2";
        console.log(googleUrl, opponent.name);
        $.ajax({
            url: googleUrl,
            method: "GET"

        }).then(function (googleresponse) {
            console.log(googleresponse);
            console.log(googleresponse.items[0].link);
            opponent.stillImageUrl = googleresponse.items[0].link;
            $("#opponent-image-holder").attr("src", opponent.stillImageUrl);
            player.name = player.name.split('+').join(" ");
        });

    }
    //coding the on'click button for fighting.
    $("#attack").on("click", function (event) {
        event.preventDefault();
        console.log(userImage, opponentImage, player.damageDice);
        if (player.hitPoints > 0 && opponent.hitPoints > 0) {
            console.log(player, opponent); 
            var playerAttackMessage = "";
            var d4 = Math.ceil(Math.random()*4);
            var d6 = Math.ceil(Math.random()*6);
            var d8 = Math.ceil(Math.random()*8);
            var d10 = Math.ceil(Math.random()*10);
            var d12 = Math.ceil(Math.random()*12);
            var d20 = Math.ceil(Math.random()*20);
            var playerAttackRoll = d20 + player.attackBonus;
            if (playerAttackRoll >= opponent.armorClass){
                playerAttackMessage += "You rolled a " + playerAttackRoll + " and hit the " + opponent.name;
               

            } else {
                playerAttackMessage += "You rolled a " + playerAttackRoll + " and you were unable to hit the " + opponent.name;
            }
            var playerDialogMessage = $("<p>").text(playerAttackMessage).attr("class", "green accent-1");
            $("#dialog-box").prepend(playerDialogMessage);
            messageCount ++;
            dialogScrubber();
            console.log(playerAttackRoll, playerAttackMessage);







        }
    })

    function dialogScrubber(){
        if (messageCount > 6){
            var dialogBox = document.getElementById("dialog-box");
            dialogBox.removeChild(dialogBox.childNodes[6]);
        }

    }




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
