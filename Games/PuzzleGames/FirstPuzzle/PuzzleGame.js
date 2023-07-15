var atempttrys = [];
var guess;
var CrntLevel;


window.onload = function() {
    guess = 1;
    heading = document.getElementById("heading");
    textbox =  document.getElementById("txt_box");
    Answer = document.getElementById("inputval");
    WhatImLookingFor = document.getElementById("WhatImLookingFor");
    message = "";

    document.getElementById("clear").style.visibility = "hidden";
    document.getElementById("inputfeild").style.visibility = "visible";
    document.getElementById("btn_test").style.visibility = "visible";
    document.getElementById("restart").style.visibility = "hidden";
    textbox.innerText = "Guess " + guess + "/3";

    lookPlyrLvl = localStorage.getItem("CrntLevel");
    if(lookPlyrLvl == undefined || lookPlyrLvl == null){
        CrntLevel="1";
    }
    else{
        CrntLevel = lookPlyrLvl;
    }

    startProgram(CrntLevel);
}

function startProgram(CrntLevel) {
    console.log("CrntLevel is set to " + CrntLevel);
    switch(CrntLevel){
        case "1":
            MakeLevel1();
        break;

        case "2":
            MakeLevel2();
        break;

        case "3":
            MakeLevel3();
            break;

        default:
            alert("Either" + "\n" + "A) You have reached the end of the game.  In this case thank you for playing." + "\n" + "B) An error has occured.")
            WatchForClear();
        break;
    }
}

function WatchForClear(){
    document.getElementById("clear").style.visibility = "visible";
    document.getElementById("restart").style.visibility = "hidden";
    document.getElementById("inputfeild").style.visibility = "hidden";
    document.getElementById("btn_test").style.visibility = "hidden";
    document.getElementById("clear").addEventListener("click", clearStuff);
}

//Level 1

function MakeLevel1(){
    WhatImLookingFor.innerText = `What is my name?`;
    document.getElementById("GameHere").innerHTML = `<h1>Hi my name is ....?</h1>` + "\n" + `<p class="a" id="level1Hint"></p>`;
    document.getElementById("level1Hint").innerText = `Hi I'm "Davis".  I have created these games to try to make a puzzle game.` + "\n" + 
    `you can find hints within the context.  Every round you will get 3 guesses.` + "\n" +
    `This one is easy but as you go I hope they become more challenging.  Hope you have fun.  :)`

    document.getElementById("btn_test").addEventListener("click", ChangeText1);
    document.getElementById("restart").addEventListener("click", refresh);
}

function ChangeText1(){
    inputVal = document.getElementById("inputval").value.toLowerCase();
    atempttrys.push(inputVal);
    guess++;

    if(inputVal == "davis"){
        message = inputVal;
        heading.innerText = "You got it right!";
        textbox.innerText = "The answer is " + message;
        document.getElementById("inputfeild").style.visibility = "hidden";
        document.getElementById("btn_test").style.visibility = "hidden";
        document.getElementById("restart").style.visibility = "visible";
        CrntLevel++;
        SaveProgress(CrntLevel)
    }
    else{
        if(atempttrys.length >=3 ){
            heading.innerText = "You have tried to many times.";
            textbox.innerText = "Click the restart button to retry.";
            document.getElementById("btn_test").style.visibility = "hidden";
            document.getElementById("restart").style.visibility = "visible";
            document.getElementById("inputfeild").style.visibility = "hidden";
        }
        else{
            message = inputVal;
            textbox.innerText = "The answer is NOT " + atempttrys + "\n" + "Guess " + guess + "/3";
        }
    }
}


/*
End of level 1
-----------------
Start of Level 2
*/

function MakeLevel2(){
    WhatImLookingFor.innerText = `What is the lucky number?`;
    document.getElementById("GameHere").innerHTML = `<h1>Lamech lived a LONG time (in years)???</h1>` + "\n" + `<p class="a" id="level2Hint"></p>`;
    document.getElementById("level2Hint").innerText = `Genesis 5:31`

    document.getElementById("clear").style.visibility = "hidden";
    document.getElementById("inputfeild").style.visibility = "visible";
    document.getElementById("btn_test").style.visibility = "visible";
    document.getElementById("restart").style.visibility = "hidden";
    textbox.innerText = "Guess " + guess + "/3";

    document.getElementById("btn_test").addEventListener("click", ChangeText2);
    document.getElementById("restart").addEventListener("click", refresh);
}

function ChangeText2(){
    inputVal = document.getElementById("inputval").value.toLowerCase();
    atempttrys.push(inputVal);
    guess++;

    if(inputVal == "777"){
        message = inputVal;
        heading.innerText = "You got it right!";
        textbox.innerText = "The answer is " + message;
        document.getElementById("inputfeild").style.visibility = "hidden";
        document.getElementById("btn_test").style.visibility = "hidden";
        document.getElementById("restart").style.visibility = "visible";
        CrntLevel++;
        SaveProgress(CrntLevel)
    }
    else{
        if(atempttrys.length >=3 ){
            heading.innerText = "You have tried to many times.";
            textbox.innerText = "Click the restart button to retry.";
            document.getElementById("btn_test").style.visibility = "hidden";
            document.getElementById("restart").style.visibility = "visible";
            document.getElementById("inputfeild").style.visibility = "hidden";
        }
        else{
            message = inputVal;
            textbox.innerText = "The answer is NOT " + atempttrys + "\n" + "Guess " + guess + "/3";
        }
    }
}

/*
End of level 2
-----------------
Start of Level 3
*/

function MakeLevel3(){
    WhatImLookingFor.innerText = `How many are there?`;
    document.getElementById("GameHere").innerHTML = `<h1>What is this? Aurek-Besh</h1>` + "\n" + `<p class="b" id="level3Hint"></p>`;
    document.getElementById("level3Hint").innerText = `THE FACT THAT YOU GOT THIS FAR IS KINDA COOL.  NOW FOR YOUR CLUE, ` + "\n" + 
    `THERE IS A BOX FULL OF MARBLES,` + "\n" +
    `ALL BUT TWO ARE BLUE,` + "\n" + 
    `ALL BUT TWO ARE GREEN,` + "\n" + 
    `ALL BUT TWO ARE RED.` + "\n" + 
    `` + "\n" + 
    `HOW MANY MARBLES ARE IN THE BOX?`

    document.getElementById("btn_test").addEventListener("click", ChangeText3);
    document.getElementById("restart").addEventListener("click", refresh);
}

function ChangeText3(){
    inputVal = document.getElementById("inputval").value.toLowerCase();
    atempttrys.push(inputVal);
    guess++;

    if(inputVal == "3"){
        message = inputVal;
        heading.innerText = "You got it right!";
        textbox.innerText = "The answer is " + message;
        document.getElementById("inputfeild").style.visibility = "hidden";
        document.getElementById("btn_test").style.visibility = "hidden";
        document.getElementById("restart").style.visibility = "visible";
        CrntLevel++;
        SaveProgress(CrntLevel)
    }
    else{
        if(atempttrys.length >=3 ){
            heading.innerText = "You have tried to many times.";
            textbox.innerText = "Click the restart button to retry.";
            document.getElementById("btn_test").style.visibility = "hidden";
            document.getElementById("restart").style.visibility = "visible";
            document.getElementById("inputfeild").style.visibility = "hidden";
        }
        else{
            message = inputVal;
            textbox.innerText = "The answer is NOT " + atempttrys + "\n" + "Guess " + guess + "/3";
        }
    }
}

/*
-----END-----
VVVVVV Important functions below VVVVVV 
*/
function SaveProgress(CrntLevel){
    localStorage.setItem(`CrntLevel`, CrntLevel);
    return;
}

function refresh() {
    location.reload();

}

function clearStuff() {
    localStorage.removeItem('CrntLevel');
    refresh()
  }