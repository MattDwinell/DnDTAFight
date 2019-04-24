
var monsterName;
var description = "";
var damageDice;

var dndURL = "https://cors.io/?http://dnd5eapi.co/api/monsters/"+ Math.floor(Math.random()*325) + "/";

$.ajax({
    url: dndURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    var monsterName = response.name;
    console.log(monsterName);
  });