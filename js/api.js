const BASE_API = "https://pokeapi.co/api/v2/"
const sectionPokemons = document.getElementById("pokemon-list");


export async function getpokemon(ID) {
    const response = await fetch(`${BASE_API}pokemon/${ID}`)
    const data = await response.json();
    return data
};

export async function getspecies(ID) {
    const response = await fetch(`${BASE_API}pokemon-species/${ID}`)
    const data = await response.json();
    return data;
};


