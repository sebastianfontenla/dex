import { getpokemon, getspecies } from "./api.js"
const imagen = document.getElementById("img");
const textbox = document.getElementById("pokeid");
const description = document.getElementById("description");
const name = document.getElementById("name");
const mostrar = document.getElementById("screen");

export async function insertar(id) {
    loader(true);
    const pokemon = await findPokemon(id);

    loader(false);
    imagen.src = pokemon.sprites[0];
    description.innerHTML = pokemon.description;
    name.innerHTML = pokemon.name;
    textbox.value = pokemon.id;
    speech(`${pokemon.name}. ${pokemon.description}`);
    imagen.classList.add('loaded');

    return pokemon;
}


export async function findPokemon(id) {
    const pokemon = await getpokemon(id)
    const species = await getspecies(id)
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es')
    const sprites = [pokemon.sprites.front_default]
    const stats = pokemon.stats.map(item => item.base_stat)

    for (const item in pokemon.sprites) {
        if (item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item]) {
            sprites.push(pokemon.sprites[item])
        }
    }

    return {
        sprites,
        description: description.flavor_text,
        id: pokemon.id,
        name: pokemon.name,
        stats,
    }

}


function speech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-US'
    speechSynthesis.speak(utterance);

}

function loader(isLoading = false) {
    const img = isLoading ? 'url(./img/loading.gif)' : ''
    mostrar.style.backgroundImage = img
}

export async function rotar(pos) {

    imagen.src = pos
}
