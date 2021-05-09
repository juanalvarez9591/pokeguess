// API url
const API = "https://pokeapi.co/api/v2/pokemon/";

// We execute the function new game for the first time
let PokeList;

function NewGame(){
    PokeList = [];

    for (let i=1; i != 152; i++) {
        PokeList.push(i.toString());
    }
}

NewGame();

// This function removes a Pokemon from the PokeList (it isn't directly called)
function GrabPokemon(){
    let PokeIndex = Math.floor(Math.random() * PokeList.length);
    PokeList.splice(PokeIndex, 1);
    return(PokeList[PokeIndex]);
}

// This configures an APICall to get the name and sprite of a Pokemon
const APICall = async () => {
    const response = await fetch(API+GrabPokemon());
    const JSONData = await response.json();
    const Pokemon = {
        name: await JSONData.name,
        sprite: await JSONData.sprites.front_default
    }
    return(Pokemon);
}

// This function spawns in the div the Pokemon by making an API Call
const Spawn = async () => {
    document.getElementById("nextbutton").textContent = "Next"

    const data = await APICall();

    const img = document.getElementById("img0");
    Options.add(data.name);

    img.src = data.sprite
}

let Options = new Set();
// When the DOM is loaded we start to do stuff

function Next() {
    Spawn();
    for (const x of Array(3).keys()) {
        if (x == 0) {
            Options = new Set();
        }
        fetch(API + String(Math.floor(Math.random() * 151)+1))
        .then(response => response.json())
        .then(data => Options.add(data.name))
    }

    console.log(Options);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("nextbutton").textContent = "New Game"
    
    // First click on New Game
    document.getElementById("nextbutton").onclick = Next;
    
});








