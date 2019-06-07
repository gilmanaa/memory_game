var suit = ["clubs", "diamonds", "hearts", "spades"];
var cardNumber = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]
var deck = { cards: [] };
function buildDeck() {
    deck.cards.splice(0, deck.cards.length);
    for (var i = 0; i < suit.length; i++) {
        for (var j = 0; j < cardNumber.length; j++) {
            deck.cards.push(`./images/cards/${cardNumber[j]}_of_${suit[i]}.png`)
        }
    }
}
var username;
$("button:nth-child(2)").data("difficulty",6);
$("button:nth-child(3)").data("difficulty",8);
$("button:nth-child(4)").data("difficulty",10);
$(".newGame").click(function (event) {
    if ($("#username").val() === "") {
        event.preventDefault();
        $("#username").addClass("usernameAlert");
    } else {
        username = $("#username").val();
        var difficulty = $(this).data("difficulty");
        newGame(difficulty);
    }
});
function newGame(difficulty) {
    buildDeck();
    if (localStorage.getItem(`highScoreMemoryGame${difficulty}`) === null) {
        localStorage.setItem(`highScoreMemoryGame${difficulty}`,Number.MAX_SAFE_INTEGER);
    }
    $(".newGame").addClass("button_hide");
    document.getElementById("gameBox").innerHTML = "";
    for (var i = 0; i < Math.floor(difficulty*2/4); i++) {
        var row = $("<div>");
        row.addClass("row");
        row.appendTo($(".container"));
    }
    for (var i = 0; i < difficulty*2/(Math.floor(difficulty*2/4)); i++) {
        var divCard = $("<div>");
        divCard.addClass("card");
        divCard.appendTo($(".row"));
    }
    var boardPositions = $(".card");
    var cardsForCurrentGame = [];
    for (var i = 0; i < difficulty; i++) {
        var random = Math.floor(Math.random() * deck.cards.length);
        var cardSplice = deck.cards.splice(random, 1)
        cardsForCurrentGame.push(cardSplice[0]);
    }
    for (var j = 0; j < difficulty; j++) {
        cardsForCurrentGame.push(cardsForCurrentGame[j]);
    }
    for (var k = 0; k < difficulty * 2; k++) {
        var randomPlacement = Math.floor(Math.random() * cardsForCurrentGame.length);
        var placementSplice = cardsForCurrentGame.splice(randomPlacement, 1);
        var placementImage = $('<img>').attr("src", placementSplice).attr("class", "card_front");
        var coverImage = $('<img>').attr("src", "./images/cards/black_joker.png").attr("class", "card_back").data("name", k);
        boardPositions[k].append(placementImage[0]);
        boardPositions[k].append(coverImage[0]);
    }
    $("img").each(function() {
        $(this).addClass(`imgSize_${difficulty}`);
    });
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
    var wrongGuessesContainer = $("<span>");
    wrongGuessesContainer.addClass("wrongGuessCont");
    wrongGuessesContainer.text(`Wrong Guesses: ${wrongGuesses}`);
    wrongGuessesContainer.appendTo($(".container"));
    cardHide.on('click', function (event) {
        if (clickCounter === 0) {
            clickCounter++;
            var cardClick = $(this);
            cardPosition1 = $(this).data("name");
            cardClick.toggleClass("card_front");
            cardShowing1 = cardShow[cardPosition1];
            cardShowing1.className = `card_back imgSize_${difficulty}`;
            cardMatchData[0] = cardShowing1.src;
        } else if (clickCounter === 1) {
            clickCounter++;
            var cardClick = $(this);
            cardPosition2 = $(this).data("name");
            cardClick.toggleClass("card_front");
            cardShowing2 = cardShow[cardPosition2];
            cardShowing2.className = `card_back imgSize_${difficulty}`;
            cardMatchData[1] = cardShowing2.src;
            if (cardMatchData[0] !== cardMatchData[1]) {
                function incorrectGuess() {
                    wrongGuesses++;
                    wrongGuessesContainer.text(`Wrong Guesses: ${wrongGuesses}`);
                    cardShowing1.className = `card_front imgSize_${difficulty}`;
                    cardShowing2.className = `card_front imgSize_${difficulty}`;
                    cardHide[cardPosition1].className = `card_back imgSize_${difficulty}`;
                    cardHide[cardPosition2].className = `card_back imgSize_${difficulty}`;
                    clickCounter = 0;
                }
                setTimeout(incorrectGuess, 1000);
            } else {
                clickCounter = 0;
                correctGuesses++;
            }
        }
        if (correctGuesses === difficulty) {
            wrongGuessesContainer.addClass("card_front");
            var container = $(".container");
            var youWon = $("<div>");
            var wrongGuessesFinal = $("<div>");
            var playAgainEasy = $("<button>");
            var playAgainMedium = $("<button>");
            var playAgainDifficult = $("<button>");
            youWon.addClass("winner");
            youWon.text("You Won!");
            youWon.appendTo(container);
            playAgainEasy.addClass("newGame");
            playAgainEasy.text("New Game Easy");
            playAgainMedium.addClass("newGame");
            playAgainMedium.text("New Game Medium");
            playAgainDifficult.addClass("newGame");
            playAgainDifficult.text("New Game Difficult");
            wrongGuessesFinal.text(`Wrong Guesses: ${wrongGuesses}`);
            wrongGuessesFinal.appendTo(youWon);
            if (wrongGuesses < localStorage.getItem(`highScoreMemoryGame${difficulty}`)) {
                localStorage.setItem(`highScoreMemoryGame${difficulty}`,wrongGuesses);
                localStorage.setItem(`highScoreMemoryGameUsername${difficulty}`,username);
                var highScoreContainer = $("<div>");
                highScoreContainer.text(`New High Score!!!`);
                highScoreContainer.appendTo(youWon);
            } else {
                var highScoreContainer = $("<div>");
                highScoreContainer.text(`High Score: ${localStorage.getItem(`highScoreMemoryGame${difficulty}`)} ${localStorage.getItem(`highScoreMemoryGameUsername${difficulty}`)}`);
                highScoreContainer.appendTo(youWon);
            }
            playAgainEasy.appendTo(youWon);
            playAgainMedium.appendTo(youWon);
            playAgainDifficult.appendTo(youWon);
            $("button:nth-child(3)").data("difficulty",6);
            $("button:nth-child(4)").data("difficulty",8);
            $("button:nth-child(5)").data("difficulty",10);
            $(".newGame").click(function () {
                var difficulty = $(this).data("difficulty");
                newGame(difficulty);
            });
        }
    })
}