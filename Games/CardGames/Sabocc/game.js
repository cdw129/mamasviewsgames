
var dealerSum = 0;
var yourSum = 0;

var YourScore = 0;
var DealerScore = 0;

var PlrTurn = 1;

var zeroinPlrhand = 0;
var zeroinDlrhand = 0;

var PlrCredits = 1000;
var DlrCredits = 1000;
var HousePot = 0;
var ZeroPot = 0;

var deck;
var discarddeck;
var playerhand;
var dealerhand;

window.onload = function() {
    //-----Set up scores-----

    document.getElementById("turn-num").innerText = PlrTurn;
    console.log("PlrTurn 1 " + "on turn" + PlrTurn);

    //-----Set up credits-----

    lookPlyrCredits = localStorage.getItem("PlrCred");
    lookDlrCredits = localStorage.getItem("DlrCred");

    if(typeof(lookPlyrCredits) == undefined){
        PlrCredits=1000;
        DlrCredits=1000;
        document.getElementById("your-credits").innerText = PlrCredits;
        document.getElementById("dealer-credits").innerText = DlrCredits;
    }

    if(lookPlyrCredits != null) {
        lookPlyrCredits = parseInt(lookPlyrCredits);
        PlrCredits = lookPlyrCredits;
        document.getElementById("your-credits").innerText = PlrCredits;
    }

    if(lookDlrCredits != null){
        lookDlrCredits = parseInt(lookDlrCredits);
        DlrCredits = lookDlrCredits;
        document.getElementById("dealer-credits").innerText = DlrCredits;
    }

    console.log("Your money is  " + lookPlyrCredits + "\n" + 
    "The Dealers money is " + lookDlrCredits);

    // set up zero Pot

    lookZeroPot = localStorage.getItem("ZeroPot");

    if(lookZeroPot == undefined){
        ZeroPot = 0;
        document.getElementById("zero-pot").innerText = ZeroPot;
    }
    else{
        ZeroPot =  parseInt(lookZeroPot);
        document.getElementById("zero-pot").innerText = ZeroPot;
    }

    buildDeck();
    shuffleDeck();
    startGame();
}


function buildDeck() {
    let values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let types = ["C", "S", "T"];
    let addsub = ["G", "R"];
    let zerodeck = ["1", "2"];
    deck = [];
    discarddeck = [];
    playerhand = [];
    dealerhand = [];

    for (let h =0; h < addsub.length; h++){
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                deck.push(addsub[h] + "-" + types[i] + "-" + values[j]); //A-C -> K-C, A-D -> K-D
            }
        }
    // console.log(deck);
    }

    for (let k = 0; k < zerodeck.length; k++){
        deck.push("Z-" + zerodeck[k] + "-Z");
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 62 => (0-61.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    if(PlrCredits<0 || DlrCredits<0){
        refresh();
    }
    HousePot=0;
    document.getElementById("gain").style.visibility=`visible`;
    document.getElementById("swap").style.visibility=`visible`;
    document.getElementById("throw").style.visibility=`visible`;
    document.getElementById("stay").style.visibility=`visible`;
    document.getElementById("help").style.visibility="visible";

    document.getElementById("dealer-cards").style.visibility=`visible`;
    document.getElementById("dealer-cards").src = "./Cards/BACK.png";

    document.getElementById("refresh").style.visibility=`hidden`;


    // at the start of eaach round the players have to bet 10 credits and the pot will get it.  At the end of the game whomever won gets the pot.
    //setting up the credits

    PlrCredits = PlrCredits-20;
    DlrCredits = DlrCredits-20;
    HousePot=HousePot+20;
    ZeroPot = ZeroPot+20

    document.getElementById("your-credits").innerText = PlrCredits;
    document.getElementById("dealer-credits").innerText = DlrCredits;
    document.getElementById("house-credits").innerText=HousePot;
    document.getElementById("zero-pot").innerText = ZeroPot;

    // Dealers Cards

    for (let i = 0; i < 2; i++){
                card = deck.pop();
                dealerSum += getValue(card, 2);
                dealerhand.push(card);
                let cardImg = document.createElement("img");
                cardImg.src = "./Cards/BACK.png"
                document.getElementById("dealer-cards").append(cardImg);
    }
    console.log("Dealers cards: ");
    console.log(dealerhand);
    console.log("Dealer sum is " + dealerSum);



//Your cards
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Cards/" + card + ".png";
        yourSum += getValue(card, 1);
        document.getElementById("your-cards").append(cardImg);
        playerhand.push(card);
    }

    console.log("Player cards: ");
    console.log(playerhand);

    console.log("Player sum is " + yourSum);

    document.getElementById("your-sum").innerText = yourSum;

    document.getElementById("gain").addEventListener("click", hit);
    document.getElementById("swap").addEventListener("click", takefromtrash);
    document.getElementById("throw").addEventListener("click", throwaway);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("refresh").addEventListener("click", refresh);
    document.getElementById("refreshScore").addEventListener("click", ResetScore);
    document.getElementById("help").addEventListener("click", Helpme);

}

function hit() {

    PlrCredits = PlrCredits -1;
    HousePot=HousePot+1;

    document.getElementById("your-credits").innerText = PlrCredits;
    document.getElementById("house-credits").innerText=HousePot;

    if (PlrCredits<1){
        alert("You do not have enough credits!");
    }
    
    else {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Cards/" + card + ".png";
        yourSum += getValue(card, 1);
        playerhand.push(card)
        document.getElementById("your-cards").append(cardImg);

        console.log(card)
        document.getElementById("your-sum").innerText = yourSum;
        
        document.getElementById("gain").style.visibility=`hidden`;
    }
}

function throwaway(whoitbe=1){
    tempnum = [];
    message="";
    num=1;

    if (whoitbe=1){

    
    if (playerhand.length<=2){
        alert("You must have more than 2 cards to throw away!");
        console.log("your hand length is " + playerhand.length);
    }
    else{
        for (let i = 0; i<playerhand.length; i++){
            message = message + "Card #" + num + " = [" + getValue(playerhand[i]) + "]" + "\n";
            num++;
        }
        var choise = prompt("What card? " + "\n" +  message);
        if(choise == ""){
            alert("You did not enter anything!");
            return;
        } 
        else if (choise<1 || choise>playerhand.length){
            alert("You did not enter a valid number.  Please select what card by typing 1 or 2 .. ect");
            return;
        }

        else{
            console.log("-----start of remove-----" + "\n" + playerhand);

            let card = playerhand[choise-1];

            yourSum -= getValue(card);

            var remove = document.getElementById("your-cards");
            remove.removeChild(remove.childNodes[choise-1]);

            let cardImg = document.createElement("img");
            discarddeck.push(card);

            console.log("The card you trashed is " + "\n" + card);
            console.log("-----In the discoard deck the cads are:" + "\n" + discarddeck + "\n" + "-----");

            document.getElementById("discard-cards").src = "./Cards/" + card + ".png";

            playerhand.splice(choise-1, 1);
    
            console.log("remaining hand is " + "\n" + playerhand);

            console.log("After trashing the " + getValue(card) + " your sum is " + yourSum);
            document.getElementById("your-sum").innerText = yourSum;
            }
        }
        document.getElementById("throw").style.visibility=`hidden`;
    }
    else {
        alert("dont have anything");
    }
}

    function takefromtrash(whoitbe){

        if(whoitbe=1){
        
        if(discarddeck.length<1){
            alert("There are no cards in the discard pile to take!");
            return;
        }

        if (PlrCredits<2){
            alert("You dont have enough credits.");
            return;
        }
        
        PlrCredits=PlrCredits-2;
        HousePot=HousePot+2;
        lengthNum = discarddeck.length-1;

        document.getElementById("your-credits").innerText = PlrCredits;
        document.getElementById("house-credits").innerText=HousePot;

        let card = discarddeck[discarddeck.length-1];
        let nextcard = discarddeck[discarddeck.length-2];

        if (discarddeck.length >=1){

            yourSum += getValue(card, 1);
            playerhand.push(card);

            let cardImg = document.createElement("img");
            cardImg.src = "./Cards/" + card + ".png";

            document.getElementById("your-cards").append(cardImg);

            if (discarddeck.length<=1){

                document.getElementById("discard-cards").src = "./Cards/BACK.png";

                discarddeck.splice(lengthNum, 1);
            }
            else {

                document.getElementById("discard-cards").src = "./Cards/" + nextcard + ".png";

                discarddeck.splice(lengthNum, 1);
            }

        }

        console.log(card)
        console.log("Your sum is " + yourSum );
        document.getElementById("your-sum").innerText = yourSum;
        document.getElementById("swap").style.visibility=`hidden`;
    }
    }


function stay() {
    console.log("dealer sum is = " + dealerSum);
    PlrTurn=PlrTurn+1;
    console.log("PlrTurn 5" + " on turn" + PlrTurn);

    if (PlrTurn==4){
        EndofRound();
    }

    else if(dealerSum==0){
        document.getElementById("gain").style.visibility=`visible`;
        document.getElementById("swap").style.visibility=`visible`;
        document.getElementById("throw").style.visibility=`visible`;
        document.getElementById("stay").style.visibility=`visible`;
        document.getElementById("turn-num").innerText = PlrTurn;
        console.log("PlrTurn 2" + " on turn" + PlrTurn);
    }

    /*else if (dealerSum < -5 || dealerSum > 5) {
        //<img src="./Cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Cards/BACK.png";
        document.getElementById("dealer-cards").append(cardImg);
        dealerSum += getValue(card, 2);
        dealerhand.push(card);
    }*/

    else if(dealerSum<-5){
        if(dealerSum<-10){
            var selectcard=0;
            var tempval1 = 0;
            var tempval2 =getValue(dealerhand[0]);
            for (var i = 0; i<dealerhand.length-1; i++){
                tempval1 = getValue(dealerhand[i])
                if(tempval1<0){
                    tempval1 = tempval1*-1
                }
                if (tempval1>tempval2){
                    tempval2 = tempval1;
                    selectcard = i;
                }
                else{
                    tempval1=tempval1;
                }
            }
            if (dealerhand.length<=2){
                let cardImg = document.createElement("img");
                let card = deck.pop();
                cardImg.src = "./Cards/BACK.png";
                document.getElementById("dealer-cards").append(cardImg);
                dealerSum += getValue(card, 2);
                dealerhand.push(card);
                document.getElementById("gain").style.visibility=`visible`;
                document.getElementById("swap").style.visibility=`visible`;
                document.getElementById("throw").style.visibility=`visible`;
                document.getElementById("stay").style.visibility=`visible`;
                document.getElementById("turn-num").innerText = PlrTurn;
                return;
            }
             else{
                    let card = dealerhand[selectcard];
                    dealerSum -= getValue(card);
                    var remove = document.getElementById("dealer-cards");
                    remove.removeChild(remove.firstChild);
                    let cardImg = document.createElement("img");
                    discarddeck.push(card);
                    document.getElementById("discard-cards").src = "./Cards/" + card + ".png";
                    dealerhand.splice(selectcard, 1);
        
             }
        }
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Cards/BACK.png";
        document.getElementById("dealer-cards").append(cardImg);
        dealerSum += getValue(card, 2);
        dealerhand.push(card);
    }

    else if(dealerSum>5){
        if(dealerSum>10){
            var selectcard=0;
            var tempval1 = 0;
            var tempval2 =getValue(dealerhand[0]);
            for (var i = 0; i<dealerhand.length-1; i++){
                tempval1 = getValue(dealerhand[i])
                if(tempval1<0){
                    tempval1 = tempval1*-1
                }
                if (tempval1>tempval2){
                    tempval2 = tempval1;
                    selectcard = i;
                }
                else{
                    tempval1=tempval1;
                }
            }
            if (dealerhand.length<=2){
                let cardImg = document.createElement("img");
                let card = deck.pop();
                cardImg.src = "./Cards/BACK.png";
                document.getElementById("dealer-cards").append(cardImg);
                dealerSum += getValue(card, 2);
                dealerhand.push(card);
                document.getElementById("gain").style.visibility=`visible`;
                document.getElementById("swap").style.visibility=`visible`;
                document.getElementById("throw").style.visibility=`visible`;
                document.getElementById("stay").style.visibility=`visible`;
                document.getElementById("turn-num").innerText = PlrTurn;
                return;
            }
             else{
                    let card = dealerhand[selectcard];
                    dealerSum -= getValue(card);
                    var remove = document.getElementById("dealer-cards");
                    remove.removeChild(remove.firstChild);
                    let cardImg = document.createElement("img");
                    discarddeck.push(card);
                    document.getElementById("discard-cards").src = "./Cards/" + card + ".png";
                    dealerhand.splice(selectcard, 1);
        
             }
        }
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Cards/BACK.png";
        document.getElementById("dealer-cards").append(cardImg);
        dealerSum += getValue(card, 2);
        dealerhand.push(card);
    }
    if (PlrTurn<4){
        console.log("PlrTurn 4 " + "on turn" + PlrTurn);
        document.getElementById("gain").style.visibility=`visible`;
        document.getElementById("swap").style.visibility=`visible`;
        document.getElementById("throw").style.visibility=`visible`;
        document.getElementById("stay").style.visibility=`visible`;
        document.getElementById("turn-num").innerText = PlrTurn;
    }
}

function EndofRound(){

    document.getElementById("gain").style.visibility=`hidden`;
    document.getElementById("swap").style.visibility=`hidden`;
    document.getElementById("throw").style.visibility=`hidden`;
    document.getElementById("stay").style.visibility=`hidden`;
    
    document.getElementById("refresh").style.visibility=`visible`;

    var images = document.getElementById("dealer-cards");
    while (images.hasChildNodes()){
        images.removeChild(images.firstChild);
    }


    for (let i = 0; i < dealerhand.length; i++){
        let cardImg = document.createElement("img");
        let card = dealerhand[i];
        cardImg.src = "./Cards/" + card + ".png";
        document.getElementById("dealer-cards").append(cardImg);
    }
   
    console.log(dealerSum);

    let message = "";

    var counts = [yourSum, dealerSum];
    let goal = 0;

    var closest = counts.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
      });
      if (PlrCredits<20){
        alert("You have ran out of credits!");
        refresh();
      }
      else if (DlrCredits<20){
        alert("You took all his credits.  Another player will now enter in!");
        refresh();
      }
    else if (zeroinPlrhand==2 && playerhand.length ==2){
        message = "You got pure Sabocc";
        YourScore=YourScore+2;
        HousePot=HousePot*2;
        PlrCredits = PlrCredits+HousePot+ZeroPot;
        HousePot=HousePot-HousePot;
        ZeroPot=ZeroPot-ZeroPot;
        console.log("Your sum is " + yourSum + ".  Dealer sum is " + dealerSum + ".  Closest number is " + closest + ". Line on 245");
    }
    else if (zeroinDlrhand ==2 && dealerhand.length==2){
        message = "Dealer got pure Sabocc. You Lose!";
        DealerScore=DealerScore+2;
        HousePot=HousePot*2;
        DlrCredits = DlrCredits+HousePot+ZeroPot;
        ZeroPot=ZeroPot-ZeroPot;
        HousePot=HousePot-HousePot;
        console.log("Your sum is " + yourSum + ".  Dealer sum is " + dealerSum + ".  Closest number is " + closest + ". Line on 251");
    }
    else if (yourSum==0 && dealerSum ==0){
        if(zeroinPlrhand==zeroinDlrhand){
        message = "Tie!";
        console.log("Your sum is " + yourSum + ".  Dealer sum is " + dealerSum + ".  Closest number is " + closest + ". Line on 344.");
        }
        else if (zeroinPlrhand>zeroinDlrhand){
            message = "You got 0. You Win!";
            YourScore=YourScore+1;
            PlrCredits = PlrCredits+HousePot+ZeroPot;
            HousePot=HousePot-HousePot;
            ZeroPot=ZeroPot-ZeroPot;
        }
        else{
            message = "Dealer got 0. You Lose!";
            DealerScore=DealerScore+1;
            DlrCredits = DlrCredits+HousePot+ZeroPot;
            HousePot=HousePot-HousePot;
            ZeroPot=ZeroPot-ZeroPot;
        }
    }   
    else if (yourSum==0){
        message = "You got 0. You Win!";
        YourScore=YourScore+1;
        PlrCredits = PlrCredits+HousePot+ZeroPot;
        HousePot=HousePot-HousePot;
        ZeroPot=ZeroPot-ZeroPot;
        console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 245");
    }

    else if (dealerSum==0) {
        message = "Dealer got 0. You Lose!";
        DealerScore=DealerScore+1;
        DlrCredits = DlrCredits+HousePot+ZeroPot;
        HousePot=HousePot-HousePot;
        ZeroPot=ZeroPot-ZeroPot;
        console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 251");
    }

    else if(yourSum==dealerSum){
        if(zeroinPlrhand==zeroinDlrhand){
            message = "Tie!";
            console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 382.");
            }
            else if (zeroinPlrhand>zeroinDlrhand){
                message = "You Win!";
                YourScore=YourScore+1;
                PlrCredits = PlrCredits+HousePot+ZeroPot;
            }
            else{
                message = "You Lose!";
                DealerScore=DealerScore+1;
                DlrCredits = DlrCredits+HousePot+ZeroPot;
                HousePot=HousePot-HousePot;
                ZeroPot=ZeroPot-ZeroPot;
            }
        message = "Tie!";
        console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 397.");
    }

    else if ( yourSum<0 || dealerSum<0){
        if (yourSum >0){
            tempyourSum = yourSum;
        }
        if (yourSum <0){
            tempyourSum = yourSum*-1;
        }
        if (dealerSum>0){
            tempdealerSum=dealerSum;
        }
        if(dealerSum<0){
            tempdealerSum = dealerSum*-1;
        }

        if (tempyourSum==tempdealerSum){
            if (playerhand.length < dealerhand.length){
                message = "You Win!";
                YourScore=YourScore+1;
                PlrCredits = PlrCredits+HousePot;
                HousePot=HousePot-HousePot;
            }
            else if (dealerhand.length<playerhand.length){
                message = "You Lose!";
                DealerScore=DealerScore+1;
                DlrCredits = DlrCredits+HousePot;
                HousePot=HousePot-HousePot;
            }
            else{
                message = "Tie!";
                console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 429.");
            }
        }
        else if (tempyourSum<tempdealerSum){
            message = "You Win!";
            YourScore=YourScore+1;
            PlrCredits = PlrCredits+HousePot;
            HousePot=HousePot-HousePot;
            console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 276");
        }
        else if (tempdealerSum<tempyourSum){
            message = "You Lose!";
            DealerScore=DealerScore+1;
            DlrCredits = DlrCredits+HousePot;
            HousePot=HousePot-HousePot;
            console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 281");
        }

        
    }

    else {
        switch(closest){
            case yourSum:
                message = "You Win!";
                YourScore=YourScore+1;
                PlrCredits = PlrCredits+HousePot;
                HousePot=HousePot-HousePot;
            break;

            case dealerSum:
                message = "You Lose!";
                DealerScore=DealerScore+1;
                DlrCredits = DlrCredits+HousePot;
                HousePot=HousePot-HousePot;
                console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 298");
            break;

            default:
                message = "Tie!";
                console.log("Your score is " + yourSum + ".  Dealer Score is " + dealerSum + ".  Closest number is " + closest + ". Line on 303.");
            break;
        }
       
    }

    // storing scores

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("results").innerText = message;

    //just updating the house pot but NOT storing money

    document.getElementById("house-credits").innerText=HousePot;

    // Updating Zero pot

    document.getElementById("zero-pot").innerText = ZeroPot;
    localStorage.setItem("ZeroPot", ZeroPot);

    // storing credits

    document.getElementById("dealer-credits").innerText = DlrCredits;
    localStorage.setItem(`DlrCred`, DlrCredits);

    document.getElementById("your-credits").innerText = PlrCredits;
    localStorage.setItem(`PlrCred`, PlrCredits);

}

 function refresh() {
    location.reload();

}

function ResetScore(){

    DealerScore =0;
    YourScore =0;

    PlrCredits=1000;
    DlrCredits=1000;
    HousePot=0;
    ZeroPot =0;

    document.getElementById("dealer-credits").innerText = DlrCredits;
    localStorage.setItem(`DlrCred`, DlrCredits);

    document.getElementById("your-credits").innerText = PlrCredits;
    localStorage.setItem(`PlrCred`, PlrCredits);

    document.getElementById("zero-pot").innerText = ZeroPot;
    localStorage.setItem("ZeroPot", ZeroPot);



    refresh();

}

function getValue(card, whoitbe =0) {
    let data = card.split("-"); // "R-C-8" -> ["R", "C", "8"]
    let value = data[2];
    let addsub = data[0];

    if (isNaN(value)) { //looking for ?-?-Z  the two 0 cards are named Z-1-Z, Z-2-Z 
        if(whoitbe ==1){
            zeroinPlrhand = zeroinPlrhand+1;
            return 0;
        }
        else if (whoitbe ==2){
            zeroinDlrhand = zeroinDlrhand+1;
            return 0;
        }
        else{
            return 0; 
        }
        
    }
    else {
        switch(addsub){
            
            case "R":
                return parseInt(-value);
            break;

            case "G":
                return parseInt(value);
            break;

        }
    }
    return parseInt(value);
}

function Helpme(){
    alert("Made by Davis Whitley" + "\n" + "Sabocc is a game set in the Star Wars universe and is like black jack but with a twist." + "\n" + "Rules:" + "\n" + 
    "Try to get 0 using the least amount of cards.  There are 2 black Sabocc cards in the 62 card deck.  If a player has both that is pure sabocc and is the best hand." + "\n" + 
    "You have 30 + cards (Green) and 30 - cards (Red).  You will have 3 turns to try to achieve a score of 0.  During each turn you may eaither: " + "\n" + 
    "A) Draw a Card from the deck." + "\n" + 
    "B) Discard a card from your hand." + "\n" + 
    "C) Take from the discard." + "\n" + 
    "Every action except for Say and discard are free but every action can ONLY be done once per turn.  At the end of 3 turns the cards will be revealed and the closest to 0 wins." + "\n" +
    "NOTE: if your numbers dont look right when you first load just hit the Refresh Score buton to update the information");
}