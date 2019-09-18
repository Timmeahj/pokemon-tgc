// Tim JS

fetch("https://api.pokemontcg.io/v1/cards") 
	.then(function(response) {
		return response.json();
	})
	.then(function(cards) {
		console.log(cards);
	});
