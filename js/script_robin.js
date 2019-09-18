//Script Robin
var cards = [];
var lastCard = 69;
var fetchCount = 0;

function allCards(callback){
    for (var i = 1 ; i <= lastCard; i++){
        // Don't want these
        if(i == 5 || i == 39 || i == 50){
            i++;
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

    var shuffled = cards.sort(() => 0.5 - Math.random());

    var deck1 = shuffled.slice(0, 30);
    var deck2 = shuffled.slice(30, 60);

    var humanCards = deck1.slice(0,5);
    var pcCards = deck2.slice(0,5);

    const handSize = 5  ;
    var humanHand = Array.from(document.getElementById("player-cards").getElementsByClassName("card"));
    var pcHand = Array.from(document.getElementById("pc-cards").getElementsByClassName("card"));

    //console.log(humanHand[2].innerHTML, humanCards);
    var attack;
    var hp;
    var name;
    var type;

    var pcCard = deck2[Math.floor(Math.random() * deck2.length)];
    var pcAttack;
    var pcHp = pcCard.card.hp;
    var pcName;
    var pcType;

    var combat;

    for(var i = 0; i < handSize; i++){
        var imageUrlHuman = humanCards[i].card.imageUrl;
        var imageUrlPc = pcCards[i].card.imageUrl;

        //console.log(imageUrlHuman, humanHand[i].firstChild);

        humanHand[i].innerHTML = '<img class="card-img-top" src="'+imageUrlHuman+'" alt="Card image cap">';
        console.log(humanCards[i]);

        humanHand[i].addEventListener("click", function() {
            document.getElementById("clickZone").classList.remove("doClick");

            if(this == humanHand[0]){
                attack = /*humanCards[0].card.attacks*/30;
                hp = humanCards[0].card.hp;
                name = humanCards[0].card.name;
                type = humanCards[0].card.types;
                id = humanCards[0].card.nationalPokedexNumber;
                console.log(name);
            }

            if(this == humanHand[1]){
                attack = /*humanCards[1].card.attacks*/30;
                hp = humanCards[1].card.hp;
                name = humanCards[1].card.name;
                type = humanCards[1].card.types;
                id = humanCards[1].card.nationalPokedexNumber;
                console.log(name);
            }

            if(this == humanHand[2]){
                attack = /*humanCards[2].card.attacks*/30;
                hp = humanCards[2].card.hp;
                name = humanCards[2].card.name;
                type = humanCards[2].card.types;
                id = humanCards[2].card.nationalPokedexNumber;
                console.log(name);
            }
        
            if(this == humanHand[3]){
                attack = /*humanCards[3].card.attacks*/30;
                hp = humanCards[3].card.hp;
                name = humanCards[3].card.name;
                type = humanCards[3].card.types;
                id = humanCards[3].card.nationalPokedexNumber;
                console.log(name);
            }

            if(this == humanHand[4]){
                attack = /*humanCards[4].card.attacks*/30;
                hp = humanCards[4].card.hp;
                name = humanCards[4].card.name;
                type = humanCards[4].card.types;
                id = humanCards[4].card.nationalPokedexNumber;
                console.log(name);
            }

            //console.log(name);
            fetch("https://pokeapi.co/api/v2/pokemon/" + id)
                .then(function(response) {
                    return response.json();
                })
                .then(function(pokemon) {

                    var picture = pokemon.sprites.front_default;
                    document.getElementById("player-card-choice-img").src = picture;

                })

            pcAttack = /*pcCard.card.attacks*/20;
            pcName = pcCard.card.name;
            pcType = pcCard.card.types;
            pcId = pcCard.card.nationalPokedexNumber;

            fetch("https://pokeapi.co/api/v2/pokemon/" + pcId)
                .then(function(response) {
                    return response.json();
                })
                .then(function(pokemon) {
                    pcPicture = pokemon.sprites.front_default;
                    document.getElementById("pc-card-choice-img").src = pcPicture;
                })

            console.log(pcName, hp, pcHp);

            combat = setInterval(function(){ 
                pcHp = pcHp-attack;
                hp = hp-pcAttack; 
                if(pcHp <= 0){
                    document.getElementById("pc-card-choice-img").src = "./img/ball.png";
                    setTimeout(function(){ 
                        pcCard = deck2[Math.floor(Math.random() * deck2.length)];
                        pcId = pcCard.card.nationalPokedexNumber;
                        fetch("https://pokeapi.co/api/v2/pokemon/" + pcId)
                            .then(function(response) {
                                return response.json();
                            })
                            .then(function(pokemon) {
                                pcPicture = pokemon.sprites.front_default;
                                document.getElementById("pc-card-choice-img").src = pcPicture;
                            })
                        pcAttack = /*pcCard.card.attacks*/20;
                        pcHp = pcCard.card.hp;
                        pcName = pcCard.card.name;
                        pcType = pcCard.card.types;
                    }, 1000);
                }
                if(hp <= 0){
                    clearInterval(combat);
                    document.getElementById("clickZone").classList.add("doClick");
                    document.getElementById("player-card-choice-img").src = "./img/ball.png";
                }
                console.log(hp, pcHp, pcName);  
            }, 2000);           
        });
    }

});

function createPlayerDeck(){

    //console.log(deck1, deck2, cards, hand1, hand2);
}