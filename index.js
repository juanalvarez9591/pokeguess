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

console.log(typeof GrabPokemon());
console.log(API+GrabPokemon());
console.log(PokeList.length);