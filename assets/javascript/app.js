


var giphyURL = 'https://api.giphy.com/v1/gifs/search?q=' + monsterName + '&api_key=sGjLADT3bdnIMSop6gpni810478I6pJ6&limit=1';

$.ajax({
    url: giphyURL,
    method: "GET"
  })


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
})
console.log("app is working");

var monsterName;
var description = "";
var damageDice;

var dndURL = "https://cors.io/?http://dnd5eapi.co/api/monsters/"+ Math.ceil(Math.random()*325) + "/";

$.ajax({
    url: dndURL,
    method: "GET"
  }).then(function(response){
    var result = JSON.parse(response);
    console.log(result.name);
    var monsterName = response.name;
    
  });

