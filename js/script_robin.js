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
    var playerHp = 1000;
    var playerHpBar;
    var attack;
    var hp;
    var name;
    var type;
    var id;
    var hpBar;

    var enemyHp = 1000;
    var enemyHpBar;
    var pcCard = deck2[Math.floor(Math.random() * deck2.length)];
    var pcAttack;
    var pcHp = pcCard.card.hp;
    var pcName;
    var pcType;
    var pcId;
    var pcHpBar;

    var combat;

    var count = 5;

    for(var i = 0; i < handSize; i++){
        var imageUrlHuman = humanCards[i].card.imageUrl;
        var imageUrlPc = pcCards[i].card.imageUrl;

        //console.log(imageUrlHuman, humanHand[i].firstChild);

        humanHand[i].innerHTML = '<img class="card-img-top" src="'+imageUrlHuman+'" alt="Card image cap">';
        //console.log(humanCards[i]);

        humanHand[i].addEventListener("click", function() {
            hpBar = 100;
            document.getElementById("humanPokeHp").style.width = hpBar + "%";

            var newCard = deck1[count];
            count++;
            if(count == 29){
                count = 0;
            }
            var newCardImg = newCard.card.imageUrl;
            this.innerHTML = '<img class="card-img-top" src="'+newCardImg+'" alt="Card image cap">';

            document.getElementById("clickZone").classList.remove("doClick");
            document.getElementById("humanStats").classList.remove("gone");
            document.getElementById("pcStats").classList.remove("gone");

            if(this == humanHand[0]){
                index = 0;
            }

            if(this == humanHand[1]){
                index = 1;
            }

            if(this == humanHand[2]){
                index = 2;
            }
        
            if(this == humanHand[3]){
                index = 3;
            }

            if(this == humanHand[4]){
                index = 4;
            }

            attack = /*humanCards[0].card.attacks*/30;
            hp = humanCards[index].card.hp;
            name = humanCards[index].card.name;
            type = humanCards[index].card.types;
            id = humanCards[index].card.nationalPokedexNumber;

            document.getElementById("humanAtk").innerHTML = attack;
            document.getElementById("humanType").innerHTML = type;
            //console.log(name);

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

            //console.log(pcName, hp, pcHp);


            function computerAttack () {
                hp = hp-pcAttack;
                playerHp = playerHp-pcAttack;
                if(hp<=0){
                    hp = 0;
                }
                playerHpBar = (playerHp / 1000) * 100;
                hpBar = (hp / humanCards[index].card.hp) * 100;
                document.getElementById("humanPokeHp").style.width = hpBar + "%";
                document.getElementById("humanHp").style.width = playerHpBar + "%";
                console.log(playerHp)
                
                //console.log(hp, pcHp, hpBar);
                if (hp>0) { 
                    setTimeout(humanAttack, 2000);
                }
                else{
                    hpBar = 100;
                    humanCards[index] = newCard;
                    document.getElementById("clickZone").classList.add("doClick");
                    document.getElementById("player-card-choice-img").src = "./img/ball.png";
                }
                if(playerHp<=0){
                    alert("You lose, try again!");
                    location.reload();
                }    
            }


            function humanAttack () {
                pcHp = pcHp-attack;
                enemyHp = enemyHp-attack;
                if(pcHp<=0){
                    pcHp = 0;
                }
                enemyHpBar = (enemyHp / 1000) * 100;
                pcHpBar = (pcHp / pcCard.card.hp) * 100;
                document.getElementById("pcPokeHp").style.width = pcHpBar + "%";
                document.getElementById("pcHp").style.width = enemyHpBar + "%";

                //console.log(hp, pcHp, pcHpBar);
                setTimeout(computerAttack, 2000);
                if (pcHp<=0){
                    pcHpBar = 100;
                    document.getElementById("pcPokeHp").style.width = pcHpBar + "%";
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
                    });
                }
                if(enemyHp<=0){
                    alert("You win, another round?");
                    location.reload();
                }     
            }

            setTimeout(humanAttack, 2000);
        });
    }

});

function createPlayerDeck(){

    //console.log(deck1, deck2, cards, hand1, hand2);
}