let API = "https://pokeapi.co/api/v2/pokemon/";
let PokeList = [];

for (let i=1; i != 152; i++) {
    PokeList.push(i.toString());
}

function GrabPokemon(){
    let PokeIndex = Math.floor(Math.random() * PokeList.length);
    PokeList.splice(PokeIndex, 1);
    return(PokeList[PokeIndex]);
}

const APICall = async () => {
    const response = await fetch(API+GrabPokemon());
    const JSONData = await response.json();
    const Pokemon = await {
        name: await JSONData.name,
        sprite: await JSONData.sprites.front_default
    }
    return(Pokemon);
}

let poki = APICall()

console.log(poki)