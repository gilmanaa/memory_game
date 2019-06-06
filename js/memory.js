var suit = ["clubs","diamonds","hearts","spades"];
var cardNumber = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"]
var deck = {cards: []};
function buildDeck() {
    deck.cards.splice(0,deck.cards.length);
    for(var i = 0; i < suit.length; i++) {
        for (var j = 0; j < cardNumber.length; j++) {
            deck.cards.push(`./images/cards/${cardNumber[j]}_of_${suit[i]}.png`)
        }
    }
}
var boardPositions = $(".card");
function newGame(difficulty) {
    buildDeck();
    var cardsForCurrentGame = [];
    for (var i = 0; i < difficulty; i++) {
        var random = Math.floor(Math.random()*deck.cards.length);
        var cardSplice = deck.cards.splice(random,1)
        cardsForCurrentGame.push(cardSplice[0]);
    }
    for (var j = 0; j < difficulty; j++) {
        cardsForCurrentGame.push(cardsForCurrentGame[j]);
    }
    for (var k = 0; k < difficulty*2; k++) {
        var randomPlacement = Math.floor(Math.random()*cardsForCurrentGame.length);
        var placementSplice = cardsForCurrentGame.splice(randomPlacement,1);
        var placementImage = $('<img>').attr("src",placementSplice);
        boardPositions[k].append(placementImage[0]);
    }
}
$("#newGame").click(function() {
    newGame(6);
})