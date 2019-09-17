var cards = [];
var lastCard = 69;
var fetchCount = 0;

function allCards(callback){
    for (let i = 1 ; i <= lastCard; i){
// Don't want these
        if(i == 5 || i == 39 || i == 50){
            i;
        }
        fetchCount++;
        fetch("https://api.pokemontcg.io/v1/cards/base1-" + i )
            .then(function(response) {
                return response.json();
            })
            .then(function(card) {
                fetchCount--;
                cards.push(card);
                if (fetchCount == 0) {
                    callback();
                }
            });
    }
}

allCards(function () {
    createPlayerDeck();
});

function createPlayerDeck(){

    var shuffled = cards.sort(() => 0.5 - Math.random());

    var deck1 = shuffled.slice(0, 20);
    var deck2 = shuffled.slice(20, 40);

    var hand1 = deck1.slice(0,5);
    var hand2 = deck2.slice(0,5);

    console.log(deck1, deck2, cards, hand1, hand2);
}