
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var YourScore = 0;
var DealerScore = 0;

var hidden;
var deck;

var canHit = true; //allows the player (you) to draw while yourSum <= 21

window.onload = function() {

    lookPlyrScore = localStorage.getItem("PlrScr");
    lookDlrScore = localStorage.getItem("DlrScr");

    console.log("Your stored score is " + lookPlyrScore + "\n" + 
    "The Dealers stored score is " + lookDlrScore);

    if(typeof(lookPlyrScore) == undefined){
        YourScore=0;
        DealerScore=0;
        document.getElementById("your-socre").innerText = YourScore;
        document.getElementById("dealer-score").innerText = DealerScore;
    }

    if(lookPlyrScore != null) {
        lookPlyrScore = parseInt(lookPlyrScore);
        YourScore = lookPlyrScore;
        document.getElementById("your-socre").innerText = YourScore;
        document.getElementById("your-socre").innerText = YourScore;
        document.getElementById("dealer-score").innerText = DealerScore;
    }

    if(lookDlrScore != null){
        lookDlrScore = parseInt(lookDlrScore);
        DealerScore = lookDlrScore;
        document.getElementById("dealer-score").innerText = DealerScore;
        document.getElementById("your-socre").innerText = YourScore;
        document.getElementById("dealer-score").innerText = DealerScore;
    }

    console.log("Your score is " + YourScore + "\n" + 
    "The Dealers score is " + DealerScore);


    buildDeck();
    shuffleDeck();
    startGame();
}


function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    document.getElementById("refresh").style.visibility=`hidden`;

    console.log("The Dealers score is: " + DealerScore + 
    "\n" + "Your score is: " + YourScore);

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);

    document.getElementById("your-socre").innerText = YourScore;
    document.getElementById("dealer-score").innerText=DealerScore;

    document.getElementById("your-sum").innerText = yourSum;

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("refresh").addEventListener("click", refresh);
    document.getElementById("refreshScore").addEventListener("click", ResetScore);

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    console.log("Your score is " + yourSum + " on Line 128");

    if (yourSum > 21) { //A, J, 8 -> 1 + 10 + 8
        yourSum = reduceAce(yourSum, yourAceCount);
        console.log("Your score is " + yourSum + " on Line 132");
        if (yourSum > 21){
            console.log("Your score is " + yourSum + " on Line 134");
            document.getElementById("hit").style.display="none";
            document.getElementById("your-sum").innerText = yourSum;
            stay();
        }
        else{
            console.log("Your score is " + yourSum + " on Line 140");
            document.getElementById("your-sum").innerText = yourSum;
        }
    }
    else{
        console.log("Your score is " + yourSum + " Line on 145");
        document.getElementById("your-sum").innerText = yourSum;
    }
}

function stay() {

    document.getElementById("refresh").style.visibility=`visible`;

    document.getElementById("hit").style.display="none";
    document.getElementById("stay").style.display="none";

    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
        DealerScore=DealerScore+1;
    }
    else if (dealerSum > 21) {
        message = "You win!";
        YourScore=YourScore+1;
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
        YourScore=YourScore+1;
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
        DealerScore=DealerScore+1;
    }

    document.getElementById("dealer-score").innerText = DealerScore;
    localStorage.setItem(`DlrScr`, DealerScore);

    document.getElementById("your-socre").innerText = YourScore;
    localStorage.setItem(`PlrScr`, YourScore);

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("results").innerText = message;

    console.log("The Dealers score is: " + DealerScore + 
    "\n" + "Your score is: " + YourScore);
}

 function refresh() {
    location.reload();

}

function ResetScore(){

    DealerScore =0;
    YourScore =0;

    document.getElementById("dealer-score").innerText = DealerScore;
    localStorage.setItem("DlrScr", DealerScore);

    document.getElementById("your-socre").innerText = YourScore;
    localStorage.setItem("PlrScr", YourScore);

    refresh();

}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}