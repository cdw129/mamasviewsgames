//changing vars go here
let NewsText = "";

//constant vars here
const PzlGames = document.getElementById("pzl_games");
const CrdGames = document.getElementById("crd_games");
const OtrGames = document.getElementById("other_games");
const NewsInfo = document.getElementById("new_real");

function StartProgram() {
    //Change News info here
    NewsText = `<strong>7/15/2023</strong> 
    <br>
    Thank you for choosing to check out my site.  I hope you like it.
    `

    PzlGames.innerHTML = `
    <button class="btnA" id="MyFirstPuzzle" onclick="Selection(1)">My First Puzzle Game</button>` + 
    `<button class="btnA" id="MovieTriva" onclick="Selection(2)" >Movie Triva Game</button>
    `;

    CrdGames.innerHTML = `
    <button class="btnB" id="black_jack" onclick="Selection(3)">Black Jack</button>` + 
    `<button class="btnB" id="sabocc" onclick="Selection(4)">Sabocc</button>
    `;

    OtrGames.innerHTML = `
    <button class="btnC" id="under_the_sea" onclick="Selection(5)">Journey Under The Sea</button>
    `;

    NewsInfo.innerHTML = NewsText
}

function Selection (event){
    switch(event){
        case 1:
            self.location="./Games/PuzzleGames/FirstPuzzle/index.html";
        break;

        case 2:
            self.location="./Games/PuzzleGames/MovieGame/index.html";
        break;

        case 3:
            self.location="./Games/CardGames/JavaBlackJack/index.html";
        break;

        case 4:
            self.location="./Games/CardGames/Sabocc/index.html";
        break;

        case 5:
            self.location="./Games/PuzzleGames/ChoseYourAdventure/JourneyUnderTheSea/index.html";
        break;
    }
}

StartProgram();