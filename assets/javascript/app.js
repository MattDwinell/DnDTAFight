
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
        hitpoints: 0,
        damageDice: "1d4",
        attackBonus: 0,
        stillImageUrl: "",
        activeImageUrl: ""
    }

var giphyURL = "";
    $("#generate-user-character").on("click", function (event) {

        event.preventDefault();
        var userImage = $("#user-image-holder").html().trim();

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
                }
                console.log(player);
                console.log(player.name);
                player.name = player.name.split(' ').join('+');
                console.log(player.name);
                giphyURL = "https://api.giphy.com/v1/gifs/random?apikey=ZyUXN606XVdEZHZ5sk3RWjOKSzOOFOyk&tag=" + player.name;
                setTimeout (giphyRetrieve, 1000);

            })
        }
    })
function giphyRetrieve(){
    console.log(giphyURL);
    $.ajax({
        url: giphyURL,
        method: "GET"

    }).then(function(giphyresponse){
        console.log(giphyresponse);
        console.log(giphyresponse.data.images.fixed_height.url);
        console.log(giphyresponse.data.images.fixed_height_still.url);
    });
    
}
//google api or bing api info
//google:
//https://www.googleapis.com/customsearch/v1?key= + yourapikey + &cx=+ custom search engine id + &q= + player/monster.name + &num=1.
// api key generated for google custom search: AIzaSyAaUUgoWlaZBGGzG4HNuQUN3Jcrw4NH7zU
// search engine id: 008788128101746337676:gz0k2znll90

//bing api stuff:
//Key 1: 0ba45ac78f5043529fb7f70fb4687509
//Key 2: 251d6748f3fd4dc8953688dee8ad66b1
//https://api.cognitive.microsoft.com/bing/v7.0/images/visualsearch


})
