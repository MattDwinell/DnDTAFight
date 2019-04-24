


// var giphyURL = 'https://api.giphy.com/v1/gifs/search?q=' + monsterName + '&api_key=sGjLADT3bdnIMSop6gpni810478I6pJ6&limit=1';

// $.ajax({
//     url: giphyURL,
//     method: "GET"
//   })


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


    $("#generate-user-character").on("click", function (event) {
        console.log("click is working");
        event.preventDefault();
        var userImage = $("#user-image-holder").html().trim();
        console.log(userImage);
        if (userImage == "") {
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
                if (result.actions[0].damage_dice){
                    player.damageDice = result.actions[0].damage_dice;
                } else if (result.actions[1].damage_dice){
                    player.damageDice = result.actions[1].damage_dice;
                } else {
                    player.damageDice = "1d6";
                }
            console.log(player);

          });
        }
    })
    var player = {
        name: "",
        armorClass: 0,
        hitPoints: 0,
        damageDice: "1d4"
    }
    var playerArmorClass;
    var playerName;
    var playerDamageDice;
    var playerHitPoints;
    var monsterName;
    var description = "";
    var damageDice;


})
