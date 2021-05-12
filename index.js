// API url
const API = "https://pokeapi.co/api/v2/pokemon/";

// We execute the function new game for the first time
let PokeList;
let Score;

function NewGame() {
    PokeList = [];
    Score = 0;

    for (let i = 1; i != 152; i++) {
        PokeList.push(i.toString());
    }
}

NewGame();

// This function removes a Pokemon from the PokeList (it isn't directly called)
function GrabPokemon() {
    let PokeIndex = Math.floor(Math.random() * PokeList.length);
    PokeList.splice(PokeIndex, 1);
    return (PokeList[PokeIndex]);
}

// This configures an APICall to get the name and sprite of a Pokemon
const APICall = async () => {
    const response = await fetch(API + GrabPokemon());
    const JSONData = await response.json();
    const Pokemon = {
        name: await JSONData.name,
        sprite: await JSONData.sprites.front_default
    }
    return (Pokemon);
}

let currentPokemon;
let IncreaseScore;

const MasterFunction = async () => {
    const data = await APICall();

    const img = document.getElementById("img0");
    img.src = data.sprite

    currentPokemon = await data.name;

    // hide button after pressing
    document.getElementById('newgame').style.visibility = "hidden";

    let Options = [];

    for (const x of Array(3).keys()) {
        if (x == 0) {
            Options = [];
        }
        const optionscall = await fetch(API + String(Math.floor(Math.random() * 151) + 1));
        const optionsdata = await optionscall.json();
        Options.push(await optionsdata.name);
    }

    Options.push(currentPokemon);

    // Randomize list
    Options = Options.sort(() => .5 - Math.random());

    for (const i of Array(4).keys()) {
        let item = document.getElementById("poke" + String(i));
        item.style.visibility = "visible";
        item.textContent = Options[i];
        item.style.background = "";
        item.addEventListener("click", function () {
            if (item.textContent == currentPokemon) {
                IncreaseScore = true;
                item.style.background = "#1e9e40";
            } else {
                IncreaseScore = false;
                item.style.background = "#d63211";
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // hide options buttons before putting data on them
    for (const i of Array(4).keys()) {
        document.getElementById('poke' + String(i)).style.visibility = "hidden";
    }

    document.getElementById("newgame").textContent = "New Game"
    document.getElementById("newgame").onclick = MasterFunction;

    let win = false;
    const interval = 400;
    const timer = window.setInterval(function () {
        if (Score >= 151) {
            IncreaseScore = "win"
        }
        switch (IncreaseScore) {
            case true:
                Score += 1;
                document.getElementById('score').textContent = Score;
                IncreaseScore = "inactive";
                MasterFunction();
                break;
            case false:
                NewGame()
                document.getElementById('score').textContent = Score;
                IncreaseScore = "inactive";
                MasterFunction();
                break;
            case "win":
                win = true;
                document.getElementById('score').textContent = "You win! You guessed all 151 Pokemon...";
            default:
                break;
        }
        if (win == true) {
            window.clearInterval(timer);
        }
    }, interval);


});








