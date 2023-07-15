let movieData = [];
let movienum = []
let currentMovieIndex;
let Endgame = 0;
let counter = 0;
let currentMovie = null;
let hint  = true;
let choice = false;
let min = 1;
let max = 3;
let rdmNum ;
let holder=[];

//Below are const that are grabing ID from html and making them a var
const imageContainer = document.getElementById("image-container");
const movieImage = document.getElementById("movie-image");
const directorElement = document.getElementById("directHint");
const hintText = document.getElementById("hint-text");
const answerKey = document.getElementById("answer-key");
const resultElement = document.getElementById("result");
const gamecontainer = document.getElementById("game-container");
const setupbox = document.getElementById("SetUpPage");
const gamefeild = document.getElementById("GameFeild")
const btnfeild = document.getElementById("BtnFeild");

// Fetch movie data from db.json through git hub
console.log("-----AT Start on Fetch-----");
fetch('https://raw.githubusercontent.com/cdw129/db.json/main/db.json')
  .then(response => response.json())
  .then(data => {
    movieData = data.movieData;
    Endgame = movieData.length;
    Choice();
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });

  function Choice(){
    console.log("-----At Choice()-----");
    gamecontainer.style.visibility = "hidden";
    setupbox.style.visibility = "visible";
    setupbox.innerHTML = "<h1>Choose your difficulty</h1>" + '\n' + 
    `<button id = "btneasy" class = "btn" onclick="Diff(choice = true)">Multiple Choice</button>` + '\n' + 
    `<button id = "btnmedium" class = "btn" onclick="Diff(choice = false)">Type it In</button>`;
  }

  function Diff(){
    console.log("-----At Diff()-----" + '\n' + 
    `choice is ${choice}`);

    gamecontainer.style.visibility = "hidden";
    setupbox.style.visibility = "visible";
    setupbox.innerHTML = "<h1>Choose your difficulty</h1>" + '\n' +
    "<p>Easy = Hits always on.</p> \n <p>Medium = Hint button is available</p> \n <p>Hard = No Hints</p>" +  
    `<button id = "btneasy" class = "btn" onclick="SetUp(1)"> Easy</button>` + '\n' + 
    `<button id = "btnmedium" class = "btn" onclick="SetUp(2)"> Medium </button>` + '\n' + 
    '<button id = "btnhard" class = "btn" onclick="SetUp(3)"> Hard </button>';
  }

  function SetUp(lvl){
    console.log("-----At Setup()-----" + '\n' + 
    `lvl is ${lvl} and choice is ${choice}`);
    document.getElementById("directHint").style.visibility = "hidden";
    document.getElementById("hint-text").style.visibility = "hidden";

    switch(choice){
      case true:
        btnfeild.innerHTML =`
        <p>
        <button id="hint-button" onclick = "showHint()">Quote Hint</button>
        <button id="next-button" onclick = "nextMovie()" style="visibility:hidden;">Next Movie</button>
      `;
      break;

      case false:
        gamefeild.innerHTML = `
        <input type="text" id="guess-input" placeholder="Enter your guess">
        <button id="submit-button" onclick = "submitAnswer()">Submit</button>
      `;

      btnfeild.innerHTML = `<button id="hint-button" onclick = "showHint()">Quote Hint</button>
      <button id="next-button" onclick = "nextMovie()" style="visibility:hidden;">Next Movie</button>`
      break;

      default:
        alert("somthing has gone wrong");
      break;
    }

    switch (lvl){
      case 1:

      gamecontainer.style.visibility = "visible";
      document.getElementById("hint-button").style.visibility = "hidden";
      setupbox.style.display = "none";

      hint = true;
        document.getElementById("directHint").style.visibility = "visible";
        document.getElementById("hint-text").style.visibility = "visible";
      loadMovie();

      break;
      
      case 2:
        gamecontainer.style.visibility = "visible";
        setupbox.style.display = "none";

        hint = false;
        loadMovie();
      break;

      case 3:

      gamecontainer.style.visibility = "visible";
      setupbox.style.display = "none";

      document.getElementById("hint-button").style.visibility = "hidden";

      hint = false;
      loadMovie();

      break;

      default:
        location.reload()
        alert("An Error Has Occured");
      break;
    }
  }

  function repetecheck(){
    console.log('-----At repetecheck()-----')
    console.log(`Movie num is ${currentMovie.id} and the array has ${movienum}`)
    console.log('*****At for statment on repetecheck*****');
      for (i=0; i<movienum.length; i++){
        if(currentMovie.id == movienum[i]){
          console.log("FOUND A MATCH AND RESETING!" + '\n' + `current movie id is ${currentMovie.id} and the random id was ${movienum[i]}`);
          return true;
        }
        console.log(`var i on loop = ${i+1} time(s) on loop`)
     }
     console.log('*****NO MATCH*****')
     return false;
  }


//This will get a random ID to call for the db and will check to see if its been done before
function loadMovie() {
  console.log("-----At loadMovie()-----" + '\n' + ``);

  holder=[];

  for(i=0; i<movieData.length;i++){
    holder.push(movieData[i].name);
  }
  
  console.log(`holder: ${holder}`);

  currentMovieIndex = Math.floor(Math.random() * movieData.length); // Select a random movie index 0 to max in data base
  currentMovie = movieData[currentMovieIndex];

  console.log(`Endgame = ${Endgame} and counter = ${counter}`);

  if(movienum.length <1){
      console.log(`movienum is less than 1 at ${movienum.length}`)
      counter = counter+1;
      console.log("counter +1")
      movienum.push(currentMovie.id)
      displayMovie();
  }

  else if(counter==Endgame || counter > Endgame){
    location.reload()
    alert("you have reached the end restarting now");
  }

  else if (repetecheck()!=true){
    console.log('-----last stament on loadmovie-----')
    counter = counter+1;
    console.log("counter +1 after for loop")
    movienum.push(currentMovie.id)
    displayMovie();
  }

  else{
    loadMovie();
  }
}


function displayMovie(){
  console.log('-----At displayMovie()-----' + '\n' + '')

  console.log(`Movie Data:` + '\n' + JSON.stringify(movieData[currentMovieIndex]));

  movieImage.src = currentMovie.imageUrl;
  movieImage.alt = "Movie Image";
  movieImage.style.display = "block";

  directorElement.innerText = `Director: ${currentMovie.directorHint}`;
  hintText.innerText = currentMovie.hintQuote;

  answerKey.style.display = "block"; // Show the answer key

  if(choice ==true){

    fillInTheBlanks();
  }
}

function fillInTheBlanks(){
  console.log("-----At fillInTheBlanks()-----" + '\n' + '');

  gamefeild.innerHTML =``;

  rdmNum = Math.floor(Math.random() * max +1);

  console.log(`rdmNum = ${rdmNum}`);

  takenameout(currentMovie.name);


  for(i=1; i<max+1; i++){
    if(i == rdmNum){
      gamefeild.innerHTML += `
    <button id="${i}" class = "btnGuess" onclick = "MchoiceCheck(${i})">${currentMovie.name}</button>`;
    }
    else {
      gamefeild.innerHTML += `
      <button id="${i}" class = "btnGuess" onclick = "MchoiceCheck(${i})">${pickAMovie()}</button>`;
      }
    }
}

function takenameout(Mname){
  console.log(`-----At takenameout-----` + '\n' + `` + `Before removal I have ${holder} and length is ${holder.length}`)
  for(k=0; k<holder.length; k++){
    if (Mname.toLowerCase() == holder[k].toLowerCase()){
      console.log(`found a match of ${Mname} and removing ${JSON.stringify(holder[k])} from holder array`);
      holder.splice(k, 1);
    }
  }
  let rdmNumB = Math.floor(Math.random() * holder.length);
  console.log(` I have removed ${Mname} and now have ${holder} and length is ${holder.length}` + `-----END takenameout-----`);
}

function pickAMovie () {
  console.log(`-----At pickAMovie-----` + '\n' + `` + `Before removal I have ${holder} and length is ${holder.length}`)
  let rdmNumB = Math.floor(Math.random() * holder.length);

  console.log(`After I have ${rdmNumB} for a random num.` + '\n' + 
  `holer[${rdmNumB}] is ${JSON.stringify(holder[rdmNumB])}`);
  let returnName = holder[rdmNumB];
  holder.splice(rdmNumB, 1);
  console.log(`returning ${returnName}` + '\n' + `-----END pickAMovie-----`);
  return returnName;
}

function randomMoiveTitle(){
  let rdmN = Math.floor(Math.random() * max +1);
  return(movieData[rdmN].name);
}

  function MchoiceCheck(i){
    if (i == rdmNum)
    {
        displayResult("Congratulations! You guessed it right!", false);
    }
    else{
        displayResult("Oops! That's incorrect. Try again!", true);
    }
  }

// Display the result
function displayResult(message, isError) {
  console.log("-----At displayResult()-----" + '\n' + '');

  resultElement.textContent = message;
  if (isError) {
    resultElement.style.color = "red";
  } else {
    resultElement.style.color = "green";
    document.getElementById("GameFeild").style.visibility = "hidden";
    document.getElementById("next-button").style.visibility = "visible";
  }
}

function showHint() {
  console.log("-----At showHint()-----")

  document.getElementById("directHint").style.visibility = "visible";
  document.getElementById("hint-text").style.visibility = "visible";

}

function nextMovie() {
  console.log("-----At nextMovie()-----")
  document.getElementById("GameFeild").style.visibility = "visible";
  resetGame();
  loadMovie();
}

// Reset the game
function resetGame() {
  console.log("-----At resetGame()-----")
  if (choice!=true){
      gamefeild.innerHTML = `
      <input type="text" id="guess-input" placeholder="Enter your guess">
      <button id="submit-button" onclick = "submitAnswer()">Submit</button>
    `;
    let guessInput = document.getElementById("guess-input");
    guessInput.value = "";
  }

  resultElement.textContent = "";
  resultElement.style.color = "gold";

  if (hint != true){
    document.getElementById("directHint").style.visibility = "hidden";
    document.getElementById("hint-text").style.visibility = "hidden";
  }
  document.getElementById("next-button").style.visibility = "hidden";
  
}

// Submit the answer
function submitAnswer() {
  console.log("-----At submitAnswer()-----")

  let AnswerPool = currentMovie.answerPool;

  let getItRight = false;
  let guessInput = document.getElementById("guess-input");

  console.log(AnswerPool.length);

  for (i = 0; i<currentMovie.answerPool.length; i++){
    console.log(`On ${i+1} of ${currentMovie.answerPool.length}`)
    if (guessInput.value.toLowerCase() == currentMovie.answerPool[i].toLowerCase()){
      console.log(`!!FOUND A MATCH!!` + '\n' + `guessInput.value.toLowerCase() ${guessInput.value.toLowerCase()} = currentMovie.answerPool[i].toLowerCase() = ${currentMovie.answerPool[i].toLowerCase()}` + '\n' + `!!BREAK FOR LOOP!!`);
      getItRight = true;
      break;
    }
    console.log("!!No MATCH!!")
  }

  if (getItRight == true)
  {
      displayResult("Congratulations! You guessed it right!", false);
  }
  else{
      displayResult("Oops! That's incorrect. Try again!", true);
  }
}