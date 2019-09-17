// Robin js
var cardDeck = [];
var playerDeck = [];
var lastCard = 69;
var howManyTimesHaveICalledFetch = 0;

function allCards(callback){
    for (let i = 1 ; i <= 69; i++){
        howManyTimesHaveICalledFetch++;
        fetch("https://api.pokemontcg.io/v1/cards/base1-" + i )
            .then(function(response) {
                return response.json();
            })
            .then(function(card) {
                howManyTimesHaveICalledFetch--;
                cardDeck.push(card);
                if (howManyTimesHaveICalledFetch == 0) {
                    callback();
                }
            });
    }
}

allCards(function () {
    createPlayerDeck();
    console.log(playerDeck);
});

function createPlayerDeck(){

    for (let i = 0 ; i <= 5; i++){
        let random = Math.floor(Math.random() * lastCard);
        playerDeck.push(cardDeck[random])
    }
}





