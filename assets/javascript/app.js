


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
    var monsterName;
    var description = "";
    var damageDice;
    var playerhitPoints;


})

//function if player is still living
function hitPoints(Object) {
    if (Object.hitPoints > 0) {
        return true;
    }
    else return false;
    }

//need to create player listing
function playerList () {
    var goro = character("goro");
    var scorpion = character("scorpion");
    var vader = character("vader");
    var yoda = character("yoda");
    var stephen = character("stephen");
    var karsten = character("karsten");
    var joe = character("joe");
    var austin = character("austin");
    var brendan = character("bredan");

    playerArray.push (goro,scorpion,vader,yoda,stephen,karsten,joe,austin,brendan);

}
console.log(playerList);

//see if players have won
function Winner() {
    if(player.Array.length ===0 && player.hitPoints > 0)
    return true;
    else return false;
}
console.log(Winner);

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
    //setting the initial player and opponent objects. we can add more attributes to pass in as needed.
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
        var userImage = $("#user-image-holder").attr("src");
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
                setTimeout (userGoogleRetrieve, 1000);
                $("#player-name").text("Your body has become that of a " + player.name.split("+").join(' ') + ".").css("visibility", "visible");

            })
        }
    })
//on click event for generating opponent's character

$("#generate-opponent-character").on("click", function (event) {
    event.preventDefault();
    generator = "opponent";
    var opponentImage = $("#opponent-image-holder").attr("src");
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
            setTimeout (opponentGoogleRetrieve, 1000);
            $("#opponent-name").text("The " + opponent.name.split('+').join(' ') + " has entered the arena.").css("visibility", "visible");


        })
    }
})



    //setting google retrieve as a separate function to be called one second after first api call- to prevent .then problems.
function userGoogleRetrieve(){
    
    var googleUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU&cx=008788128101746337676:gz0k2znll90&q=dnd+" + player.name + "=1&searchType=image&num=2";
    console.log(googleUrl, player.name);
    $.ajax({
        url: googleUrl,
        method: "GET"

    }).then(function(googleresponse){
        console.log(googleresponse);
        console.log(googleresponse.items[0].link);
        player.stillImageUrl = googleresponse.items[0].link;
        $("#user-image-holder").attr("src", player.stillImageUrl);
       // console.log(giphyresponse.data.images.fixed_height_still.url);
    });
    
}
function opponentGoogleRetrieve(){
    
    var googleUrl = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU&cx=008788128101746337676:gz0k2znll90&q=dnd+" + opponent.name + "=1&searchType=image&num=2";
    console.log(googleUrl, opponent.name);
    $.ajax({
        url: googleUrl,
        method: "GET"

    }).then(function(googleresponse){
        console.log(googleresponse);
        console.log(googleresponse.items[0].link);
        opponent.stillImageUrl = googleresponse.items[0].link;
        $("#opponent-image-holder").attr("src", opponent.stillImageUrl);
       // console.log(giphyresponse.data.images.fixed_height_still.url);
    });
    
}
// google api or bing api info
// google:
// https://www.googleapis.com/customsearch/v1?key= + yourapikey + &cx=+ custom search engine id + &q= + player/monster.name + &num=1.
// api key generated for google custom search: AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU
// search engine id: 008788128101746337676:gz0k2znll90

// bing api stuff:
// Key 1: 0ba45ac78f5043529fb7f70fb4687509
// Key 2: 251d6748f3fd4dc8953688dee8ad66b1
// https://api.cognitive.microsoft.com/bing/v7.0/images/visualsearch


})