// -----TO DOs-----
// -----Get Done Today-----

// -----NEXT To DO-----
// [] get input field and sumbit button in place
// [] make multiple choice buttons to show up and NOT repete names 
// [] make sure that the same movie is not asked twice
// [] get results to work
// [] get score by % to work

// -----HAVE DONE-----
// [X] multi or text options 
// [X] difficilty options
// [X] put opening and closing the pop up into a function
// [X] how many times to play this includes HowManyTime() and checkRoundNum()
// [X] Create pop up info
// [X] fetch to grab the dbug.json file 
// [X] created rdmNum to pick a random number from 1 to movieData.length
// [X] made SetUp() to make things visible or not 
// [X] made displayMovie() to take the movieData information and display it on gameField
// [X] debug on off

//-----NOTES-----
      // //!!!!DEBUG!!!!
      // if (dbug){

      // }
      // //END DEBUG


      // //Hitting "/" on keyboard will turn on/off debug
      // document.addEventListener('keypress', (event) =>{
      //   let keyCode = event.key;
              
      //   if(keyCode == "/" || keyCode == "/"){
      //     if (dbug){
      //         dbug = false;
      //         console.log(`dbug = ${dbug}`);
      //       }
      //     else{
      //         dbug=true;
      //         console.log(`dbug = ${dbug}`);
      //       }
      //     }
      //   });

      // //Reload the window
      // location.reload()

       // choice = confirm(`Is it you?`)
//-----END NOTES-----

//changing vars go here
let movieData = [];
let rdmNum;
let movieId;
let dbug = false; //Default on(true) or off(false) for debug option
let Endgame = 0;
let points = 0;
let popupmesg = "";
let choice;
let lvl = 1;
let hint;
let hintR;
let holder = [];
let movienum = [];
let bntHint;
let getRight = 0;
let getWrong = 0;
let score = 0;
let rdmA;
let crntMovie=[];
let btnNext;
let guessInput;

let Erroemsg = ""; ///////////////////////////////////////////////////////////////
let Errorname =""; ///////////////////////////////////////////////////////////////
let Errorlinenum; ///////////////////////////////////////////////////////////////

//Const vars go here
const dirHint = document.getElementById("directHint");
const ansrKey = document.getElementById("answer-key");
const setUP = document.getElementById("SetUpPage");
const gameCon = document.getElementById("game-container");
const movImg = document.getElementById("movie-image");
const hitTxt = document.getElementById("hint-text");
const Rslts = document.getElementById("result");
const gameField = document.getElementById("GameFeild");
const btnField = document.getElementById("BtnFeild");
const closePopup = document.getElementById("popupclose");
const overlay = document.getElementById("overlay");
const popUP = document.getElementById("popup");
const popupContent = document.getElementById("popupcontent");

//!!!DEBUG!!! data line(s) go here
  console.log(`-----At fetch db-----` + '\n' + " ");
//END debug

// Fetch movie data from db.json through git hub
fetch('https://raw.githubusercontent.com/cdw129/db.json/main/db.json')
  .then(response => response.json())
  .then(data => {
    movieData = data.movieData;
    SayHi();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });

  function SayHi (){
    //Making the setup areia visible while hiding the game area
    gameCon.style.display = "none"; ///////////////////////////////////////////////////////////////
    setUP.style.display = "block"; ///////////////////////////////////////////////////////////////
    
    popupmesg = `
    <h1>Guess the Movie</h1> 
    <p>Created by </p>
    <br>
    <p><i>Joe</i> and <i>Davis</i></p>
    <button onclick="ClosePopup(), HowManyTime()">START</button>
    `
    OpenPopup(false);
  }

  function HowManyTime(){
    //!!!!DEBUG!!!!
        console.log(`-----At HowManyTime()-----` + '\n' + " ");
      //END DEBUG

      //creating an input feild with button so players can input how many rounds they want to play
      setUP.innerHTML = `
      <h1>How many rounds do you wana play?</h1> 
      <br>
      <p>Min is 1 and max is ${movieData.length}!</p>
      <input type="text" id="amount-of-rounds" placeholder="1 - ${movieData.length}">
      <button id="roundbtn" class = "btn" onclick = "checkRoundNum()">Enter</button>
      `
  }

  function checkRoundNum() {
    //!!!!DEBUG!!!!
    if (dbug){
    console.log(`-----At checkRoundNum()-----` + '\n' + 
    `I saw that input "amount-of-rounds" is sending ${document.getElementById("amount-of-rounds").value}`);
    }
    //END DEBUG

    Endgame = document.getElementById("amount-of-rounds").value;

    if (isNaN(Endgame)) {
      popupmesg = `
      <h1>${Endgame} is <i>NOT</i> a number!</h1> 
      <p>Please enter a number 1 to ${movieData.length}</p>
      <br>
      <button id="roundbtn" class = "btn" onclick = "ClosePopup(), HowManyTime()">Retry</button>
      `
      OpenPopup(false)
      return;
    }

    else if (Endgame<1 || Endgame>movieData.length) {
      popupmesg = `
      <h1>${Endgame} is <i>NOT</i> a valid number!</h1>
      <p>Please enter a number 1 to ${movieData.length}</p>
      <br>
      <button id="roundbtn" class = "btn" onclick = "ClosePopup(), HowManyTime()">Retry</button>
      `
      OpenPopup(false)
      return;
    }

    else {
      Choice();
    }

  }

  function Choice(){
    //!!!!DEBUG!!!!
    if (dbug){
      console.log(`-----At Choice()-----` + '\n' + " ");
    }
    //END DEBUG

    points = 100/Endgame;

    if (dbug){
      console.log(`Questions are worth ${points} each.  There will be ${Endgame} question(s).`);
    }

    setUP.innerHTML = `
    <p>Questions are worth ${Math.round(points)} each.  There will be ${Endgame} question(s).</p>
    <h1>Choose your Style</h1>
    <select id="game-play" multiple>
    <option value = true selected>Multiple Choise</option>
    <option value = false>Type it in</option>
    </select>
    <br>
    <button id="roundbtn" class="btn" onclick="Diff()">Next</button>
    `
    //END DEBUG

  }

  function Diff() {
    //!!!!DEBUG!!!!
    if (dbug){
      console.log(`-----At Diff()-----` + '\n' + " ");
    }
    //END DEBUG

    choice = document.getElementById("game-play").value

    setUP.innerHTML = `
    <h1>Choose your Difficulty</h1>
    <p>Easy = Hits always on.</p> <p>Medium = Hint button is available</p> <p>Hard = No Hints</p>
    <select id="game-play" multiple>
    <option value=1 selected>Easy</option>
    <option value=2>Medium</option>
    <option value=3>Hard</option>
    </select>
    <br>
    <button id="roundbtn" class="btn" onclick="SetUp()">Next</button>
    `

  }

  function SetUp (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At SetUp()-----` + '\n' + " ");
    }
    //END debug

    lvl = document.getElementById("game-play").value

    //Just making things visible or not.
    setUP.style.display = "none"; ///////////////////////////////////////////////////////////////
    gameCon.style.display = "block"; ///////////////////////////////////////////////////////////////
    
    gameField.style.display = "block"; ///////////////////////////////////////////////////////////////
    btnField.style.display = "block"; ///////////////////////////////////////////////////////////////


    dirHint.style.visibility = "visible";
    ansrKey.style.visibility = "visible";
    movImg.style.visibility = "visible";
    hitTxt.style.visibility = "visible";
    Rslts.style.visibility = "hidden";
    

    switch (choice) {

      case "true":
        btnField.innerHTML = `
        <button id="hint-button" onclick = "showHint()">Quote Hint</button>
        <button id="next-button" onclick = "nextMovie()" style="visibility:hidden;">Next Movie</button>
        `
        btnNext = document.getElementById('next-button');
      break;

      case "false":
        gameField.innerHTML = `
        <input type="text" id="guess-input" placeholder="Enter your guess">
        <button id="submit-button" onclick = "submitAnswer()">Submit</button>
        `;

        btnSub = document.getElementById('submit-button');

        guessInput = document.getElementById("guess-input");

        btnField.innerHTML = `<button id="hint-button" onclick = "showHint()">Quote Hint</button>
        <button id="next-button" onclick = "nextMovie()" style="visibility:hidden;">Next Movie</button>`
        btnNext = document.getElementById('next-button');
      break;

      default:
        popupmesg = `
        <h1>Somthin has gone wrong!</h1>
        <br>
        <button onclick="location.reload()">Refresh</button>
        `
        OpenPopup(false);
      break;

    }

    switch (lvl) {

      case "1":

        hint = false;
        hintR = true;
        loadMovie()

      break;

      case "2":

        hint = true;
        hintR = false;
        loadMovie()

      break;

      case "3":

        hint = false;
        hintR = false;
        loadMovie()

      break;

      default:

        popupmesg = `
        <h1>Somthin has gone wrong!</h1>
        <br>
        <button onclick="location.reload()">Refresh</button>
        `
        OpenPopup(false);

      break;

    }
  }

  function repeteCheck(){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At repeteCheck()-----` + '\n' + `movienum = ${JSON.stringify(movienum)}`);
    }
    //END debug

    for (i=0; i<movienum.length; i++){
      if (movienum[i] == crntMovie.id){
        return true;
      }
    }
    return false;
  }

  //here we are going to get the data for our movie
  function loadMovie (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At loadMovie()-----` + '\n' + " ");
    }
    //END debug

    holder = [];
    bntHint = document.getElementById("hint-button");

movieData.forEach( crntMov => {
  holder.push(crntMov.name)
});

    rdmNum = Math.floor(Math.random() * movieData.length) // selecting a random movie

    crntMovie = movieData[rdmNum]

        //!!!DEBUG!!! data line(s) go here
        if (dbug){
          console.log(console.log(JSON.stringify(holder) + '\n' + `rdmNum = ${rdmNum}.`));
        }
        //END debug

    if (movienum.length<1){
      subEnter = true;
      movienum.push(movieData[rdmNum].id)
      displayMovie();
    }

    else if(movienum.length >= Endgame){
      gameCon.style.display = "none"
      setUP.style.display = "none"
      popupmesg = `
      <h1>You have reached the end!</h1> 
      <p>You got ${getRight} right and ${getWrong} wrong.</p>
      <br>
      <p>Your score is %${Math.round(score)}</p>
      <button id="roundbtn" class = "btn" onclick = "location.reload()">Restart</button>
      `
      OpenPopup(false)
    }

    else if (repeteCheck()!=true){
      subEnter = true;
      movienum.push(movieData[rdmNum].id)
      displayMovie();
    }

    else{
      loadMovie();
    }
  }

  //This function will show all movie data
  function displayMovie (){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At displayMovie()-----` + '\n' + " ");
    }
    //END debug

    if (!hint){
      bntHint.style.visibility = "hidden";
    }
    else{
      bntHint.style.visibility = "visible";
    }

    if(!hintR){
      hitTxt.style.visibility = "hidden";
      dirHint.style.visibility = "hidden";
    }

    bntHint.addEventListener("mouseover", HintHover);
    bntHint.addEventListener("mouseout", HintOff);

    //Displaying movie image
    movImg.src = movieData[rdmNum].imageUrl
    movImg.alt = "Movie Image";
    movImg.style.display = "block";
  
    // dirHint hitTxt

    dirHint.innerText = `Director: ${movieData[rdmNum].directorHint}`
    hitTxt.innerText = movieData[rdmNum].hintQuote;

    ansrKey.style.display = "block";

    if (dbug){
      console.log(`At displayMovie() with choice = ${choice}`);
    }
    //END debug

    if (choice == "true") {
      subEnter=false;
      fillInTheBlanks();
    }

    document.addEventListener(`keypress`, (event) =>{
      let keyCode = event.key;

      if(keyCode == "enter" || keyCode == "Enter" && subEnter){
        btnSub.click();
      }});


      // Erroemsg = `This is a test to see what this does.` ///////////////////////////////////////////////////////////////
      // Errorname = `Tets Error`; ///////////////////////////////////////////////////////////////
      // Errorlinenum = console.trace()

      // console.log(new Error(Erroemsg, Errorname, Errorlinenum))


  }

  function HintHover() {
    bntHint.innerText ="Are you sure??";
  }
  function HintOff(){
    bntHint.innerText = "Quote Hint"
  }

  function fillInTheBlanks(){
      //!!!DEBUG!!! data line(s) go here
      if (dbug){
        console.log(`-----At fillInTheBlanks()-----` + '\n' + " ");
      }
      //END debug

      gameField.innerHTML = ``;

      rdmA = Math.floor(Math.random() * 3) + 1;

      //!!!DEBUG!!! data line(s) go here
        if (dbug){
          console.log(`rdmA = ${rdmA}`);
        }
      //END debug

    takenameout(crntMovie.name);

    for (i=1; i<4; i++){
      if (i==rdmA){
        gameField.innerHTML += `
        <button id="${i}" class="btn" onclick="MchoiceCheck(${i})">${crntMovie.name}</button>
        `
      }
      else{
        gameField.innerHTML += `
        <button id="${i}" class="btn" onclick="MchoiceCheck(${i})">${pickMovie()}</button>
        `
      }
    }

  }

  function takenameout(Mname){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At takenameout()-----` + '\n' + " ");
    }
    //END debug

    for (k=0; k<holder.length; k++){
      if(Mname.toLowerCase() == holder[k].toLowerCase()){
        holder.splice(k, 1);
      }
    }
  }

  function pickMovie(){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At pickMovie()-----` + '\n' + " ");
    }
    //END debug  
    
  let rdmB = Math.floor(Math.random() * holder.length);
  
  let returnName = holder[rdmB]
  holder.splice(rdmB, 1);
  return returnName;
  }

  function MchoiceCheck(i){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At MchoiceCheck()-----` + '\n' + " ");
    }
  //END debug
    Rslts.style.visibility = "visible";
      
    if(i==rdmA){
      displayResult("That's Right!", false);
    }
    else{
      displayResult("That's not Right!", true);
    }
  }

  function displayResult(msg, isError){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At displayResult()-----` + '\n' + " ");
    }
    //END debug   
    Rslts.style.visibility = "visible";
    Rslts.textContent = msg;

    bntHint.style.visibility="hidden"

    if(isError){
      getWrong = getWrong+1
      Rslts.style.color = "red";
      gameField.style.display = "none";
      btnNext.style.visibility = "visible";
    }
    else{
      getRight = getRight+1;
      score = score + points;
      Rslts.style.color = "green";
      gameField.style.display = "none";
      btnNext.style.visibility = "visible";
    }
  }

  function showHint(){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At showHint()-----` + '\n' + " ");
    }
    //END debug  

    bntHint.style.visibility = "hidden";
    hitTxt.style.visibility = "visible";
    dirHint.style.visibility = "visible";
  }

  function nextMovie(){
    //!!!DEBUG!!! data line(s) go here
    if (dbug){
      console.log(`-----At nextMovie()-----` + '\n' + " ");
    }
    //END debug  
    gameField.style.display = "block"
    Rslts.style.visibility = "hidden";
    btnNext.style.visibility = "hidden"

    if (choice == "false"){
      document.getElementById("guess-input").value = null;
    }

    loadMovie();
  }

function submitAnswer(){
  //!!!DEBUG!!! data line(s) go here
  if (dbug){
    console.log(`-----At submitAnswer()-----` + '\n' + " ");
  }
  //END debug 

  subEnter = false;
  gameField.style.display="none";

  let AnswerPool = crntMovie.answerPool;
  let getItRight = false;

  AnswerPool.forEach(answerpool =>{
    if(guessInput.value.toLowerCase() == answerpool.toLowerCase()){
      getItRight = true;
    }
    //!!!DEBUG!!! data line(s) go here
if (dbug){
  console.log(`guessInput.toLowerCase() = ${guessInput.value.toLowerCase()} answerpool.toLowerCase = ${answerpool.toLowerCase()}`);
}
//END debug 
  })

  if (getItRight == true){
    displayResult("Congratulations! You guessed it right!", false);
  }
  else{
    displayResult("Oops! That's incorrect. Try again!", true);
  }
}

//Hitting "/" on keyboard will turn on/off debug
document.addEventListener('keypress', (event) =>{
let keyCode = event.key;
      
if(keyCode == "/" || keyCode == "/"){
  if (dbug){
      dbug = false;
      console.log(`dbug = ${dbug}`);
    }
  else{
      dbug=true;
      console.log(`dbug = ${dbug}`);
    }
  }
});

closePopup.onclick = function() {
  overlay.style.display = 'none';
  popUP.style.display = 'none';
}

function OpenPopup (xpopup){
  overlay.style.display = 'block';
  setTimeout(function() {
    overlay.style.opacity =1;
    if (xpopup){
      closePopup.style.visibility = "visible";
    }
    else {
      closePopup.style.visibility = "hidden";
    }
  }, 100)
  popupContent.innerHTML = popupmesg;

}

function ClosePopup (){
  overlay.style.opacity =0;
  setTimeout(function () {
    overlay.style.display = `none`
  }, 900)

}
console.log(`!!!dbug is ${dbug} by default!!!`);