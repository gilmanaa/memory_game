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
$("#newGame").click(function() {
    var easy = 6;
    var medium = 9;
    var difficult = 12;
    newGame(easy);
})
function newGame(difficulty) {
    buildDeck();
    var boardPositions = $(".card");
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
        var placementImage = $('<img>').attr("src",placementSplice).attr("class","card_front");
        var coverImage = $('<img>').attr("src","./images/cards/black_joker.png").attr("class","card_back").data("name",k);
        boardPositions[k].append(placementImage[0]);
        boardPositions[k].append(coverImage[0]);
    }
    var cardHide = $(".card_back");
    var cardShow = $(".card_front");
    var cardPosition1;
    var cardPosition2;
    var cardShowing1;
    var cardShowing2;
    var cardMatchData = [];
    var clickCounter = 0;
    var wrongGuesses = 0;
    var correctGuesses = 0;
    cardHide.on('click',function(event){
        if (clickCounter === 0) {
            clickCounter++;
            var cardClick = $(this);
            cardPosition1 = $(this).data("name");
            cardClick.toggleClass("card_front");
            cardShowing1 = cardShow[cardPosition1];
            cardShowing1.className = "card_back";
            cardMatchData[0] = cardShowing1.src;
        } else if (clickCounter === 1) {
            clickCounter++;
            var cardClick = $(this);
            cardPosition2 = $(this).data("name");
            cardClick.toggleClass("card_front");
            cardShowing2 = cardShow[cardPosition2];
            cardShowing2.className = "card_back";
            cardMatchData[1] = cardShowing2.src;
            if (cardMatchData[0] !== cardMatchData[1]) {
                function incorrectGuess() {
                    wrongGuesses++;
                    cardShowing1.className = "card_front";
                    cardShowing2.className = "card_front";
                    cardHide[cardPosition1].className = "card_back";
                    cardHide[cardPosition2].className = "card_back";
                    clickCounter = 0;
                }
                setTimeout(incorrectGuess,1000);
            } else {
                clickCounter = 0;
                correctGuesses++;
            }
        }
        
    })
}