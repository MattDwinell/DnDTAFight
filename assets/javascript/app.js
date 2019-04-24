

var giphyURL = 'https://api.giphy.com/v1/gifs/search?q=' + monsterName + '&api_key=sGjLADT3bdnIMSop6gpni810478I6pJ6&limit=1';

$.ajax({
    url: giphyURL,
    method: "GET"
  })

