//Script Robin
var cards = [];
var lastCard = 69;
var fetchCount = 0;

function allCards(callback){
    for (var i = 1 ; i <= lastCard; i++){
        // Don't want these
        if(i === 5 || i === 39 || i === 50){
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
                if (fetchCount === 0) {
                    callback();
                }
            });
    }
}

allCards(function () {

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
    var attackOne;
    var attackTwo;
    var hp;
    var name;
    var type;
    var id;
    var hpBar;

    var enemyHp = 1000;
    var enemyHpBar;
    var pcCard = deck2[Math.floor(Math.random() * deck2.length)];
    var pcAttack;
    var pcAttackOne;
    var pcAttackTwo;
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
            if(count === 29){
                count = 0;
            }
            var newCardImg = newCard.card.imageUrl;
            this.innerHTML = '<img class="card-img-top" src="'+newCardImg+'" alt="Card image cap">';

            document.getElementById("clickZone").classList.remove("doClick");
            document.getElementById("humanStats").classList.remove("gone");
            document.getElementById("pcStats").classList.remove("gone");

            if(this === humanHand[0]){
                index = 0;
            }

            if(this === humanHand[1]){
                index = 1;
            }

            if(this === humanHand[2]){
                index = 2;
            }
        
            if(this === humanHand[3]){
                index = 3;
            }

            if(this === humanHand[4]){
                index = 4;
            }

            attackOne = humanCards[index].card.attacks[0].damage.replace(/[^0-9]/g,'');
            attackTwo = humanCards[index].card.attacks[1];

            if (attackOne === "" || attackOne === undefined){
                attackOne = 0;
            }

            if (attackTwo === "" || attackTwo === undefined){
                attackTwo = 0;
            }
            else{
                attackTwo = parseInt(attackTwo.damage.replace(/[^0-9]/g,''));
            }

            if (attackOne < attackTwo){
                attack = attackTwo;
            }
            else {
                attack = attackOne;
            }

            hp = humanCards[index].card.hp;
            name = humanCards[index].card.name;
            type = humanCards[index].card.types;
            id = humanCards[index].card.nationalPokedexNumber;

            document.getElementById("humanAtk").innerHTML = attack;
            document.getElementById("humanType").innerHTML = type;
            if(humanCards[index].card.weaknesses != undefined){
                document.getElementById("humanWeakness").innerHTML = humanCards[index].card.weaknesses[0].type;
            }
            else{
                document.getElementById("humanWeakness").innerHTML = "none";
            }
            //console.log(name);

            //console.log(name);
            fetch("https://pokeapi.co/api/v2/pokemon/" + id)
                .then(function(response) {
                    return response.json();
                })
                .then(function(pokemon) {

                    var picture = pokemon.sprites.front_default;
                    document.getElementById("player-card-choice-img").src = picture;

                });

            pcAttackOne = pcCard.card.attacks[0].damage.replace(/[^0-9]/g,'');
            pcAttackTwo = pcCard.card.attacks[1];

            if (pcAttackOne === "" || pcAttackOne === undefined){
                pcAttackOne = 0;
            }

            if (pcAttackTwo === "" || pcAttackTwo === undefined){
                pcAttackTwo = 0;
            }
            else{
                pcAttackTwo = pcAttackTwo.damage.replace(/[^0-9]/g,'');
            }

            if (pcAttackOne < pcAttackTwo){
                pcAttack = pcAttackTwo;
            }
            else {
                pcAttack = pcAttackOne;
            }

            pcName = pcCard.card.name;
            pcType = pcCard.card.types;
            pcId = pcCard.card.nationalPokedexNumber;

            document.getElementById("pcAtk").innerHTML = pcAttack;
            document.getElementById("pcType").innerHTML = pcType;
            if(pcCard.card.weaknesses != undefined){
                document.getElementById("pcWeakness").innerHTML = pcCard.card.weaknesses[0].type;
            }
            else{
                document.getElementById("pcWeakness").innerHTML = "none";
            }

            fetch("https://pokeapi.co/api/v2/pokemon/" + pcId)
                .then(function(response) {
                    return response.json();
                })
                .then(function(pokemon) {
                    pcPicture = pokemon.sprites.front_default;
                    document.getElementById("pc-card-choice-img").src = pcPicture;
                });

            //console.log(pcName, hp, pcHp);


            function computerAttack () {
                hp = hp-pcAttack;
                playerHp = playerHp-pcAttack;
                if(humanCards[index].card.weaknesses != undefined){
                    console.log(humanCards[index].card.weaknesses[0].type);
                    if(humanCards[index].card.weaknesses != undefined){
                        document.getElementById("humanWeakness").innerHTML = humanCards[index].card.weaknesses[0].type;
                    }
                    else{
                        document.getElementById("humanWeakness").innerHTML = "none";
                    }
                    if(humanCards[index].card.weaknesses[0].type === pcType){
                        hp = hp-(pcAttack/2);
                    }
                }
                if(hp<=0){
                    hp = 0;
                }
                playerHpBar = (playerHp / 1000) * 100;
                hpBar = (hp / humanCards[index].card.hp) * 100;
                document.getElementById("humanPokeHp").style.width = hpBar + "%";
                document.getElementById("humanHp").style.width = playerHpBar + "%";
                console.log(playerHp);
                
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
                    document.getElementById("endText").innerText = "YOU LOST THE BATTLE";
                    document.getElementById("endScreen").classList.remove("gone");
                }    
            }


            function humanAttack () {
                pcHp = pcHp-attack;
                enemyHp = enemyHp-attack;
                if(pcCard.card.weaknesses != undefined){
                    console.log(pcCard.card.weaknesses[0].type);
                    if(pcCard.card.weaknesses != undefined){
                        document.getElementById("pcWeakness").innerHTML = pcCard.card.weaknesses[0].type;
                    }
                    else{
                        document.getElementById("pcWeakness").innerHTML = "none";
                    }
                    if(pcCard.card.weaknesses[0].type == type){
                        pcHp = pcHp-(attack/2);
                    }
                }
                if(pcHp<=0){
                    pcHp = 0;
                }
                enemyHpBar = (enemyHp / 1000) * 100;
                pcHpBar = (pcHp / pcCard.card.hp) * 100;
                document.getElementById("pcPokeHp").style.width = pcHpBar + "%";
                document.getElementById("pcHp").style.width = enemyHpBar + "%";

                console.log(hp, pcHp, pcHpBar);
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
                            });
                        pcAttackOne = pcCard.card.attacks[0].damage.replace(/[^0-9]/g,'');
                        pcAttackTwo = pcCard.card.attacks[1];

                        if (pcAttackOne === "" || pcAttackOne === undefined){
                            pcAttackOne = 0;
                        }

                        if (pcAttackTwo === "" || pcAttackTwo === undefined){
                            pcAttackTwo = 0;
                        }
                        else{
                            pcAttackTwo = pcAttackTwo.damage.replace(/[^0-9]/g,'');
                        }

                        if (pcAttackOne < pcAttackTwo){
                            pcAttack = pcAttackTwo;
                        }
                        else {
                            pcAttack = pcAttackOne;
                        }
                        pcHp = pcCard.card.hp;
                        pcName = pcCard.card.name;
                        pcType = pcCard.card.types;

                        document.getElementById("pcAtk").innerHTML = pcAttack;
                        document.getElementById("pcType").innerHTML = pcType;
                        if(pcCard.card.weaknesses != undefined){
                            document.getElementById("pcWeakness").innerHTML = pcCard.card.weaknesses[0].type;
                        }
                    });
                }
                if(enemyHp<=0){
                    document.getElementById("endScreen").classList.remove("gone");
                }     
            }

            setTimeout(humanAttack, 2000);
        });
    }

});

document.getElementById("newGame").addEventListener("click", function(){
    location.reload();
});

document.getElementById("backHome").addEventListener("click", function(){
    window.location = "index.html"
});
