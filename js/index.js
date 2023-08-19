import { insertar, rotar } from "./pokedex.js"
const btnbuscar = document.getElementById("buscar");
const btnnext = document.getElementById("pkm-siguiente");
const btnprev = document.getElementById("pkm-anterior");
const btnrng = document.getElementById("rng");
const rotarmas = document.getElementById("rotar-mas")
const rotarmenos = document.getElementById("rotar-menos");
const textbox = document.getElementById("pokeid");
const enter = document.getElementById("form")

let activepkm = {
    id: "0",
};
let imgpos = 0;

enter.addEventListener("submit", buscar);
btnbuscar.addEventListener("click", buscar);
btnrng.addEventListener("click", rng);
btnnext.addEventListener("click", next);
btnprev.addEventListener("click", prev);
rotarmas.addEventListener("click", rotarup);
rotarmenos.addEventListener("click", rotardw);



async function buscar() {
    event.preventDefault();
    try {
        imgpos = 0;
        speechSynthesis.cancel()
        activepkm = await insertar(textbox.value);
    } catch {
        document.getElementById("description").innerHTML = "Error: no se encontro ese pokemon"
    }
}

async function getRandomInt() {
    return Math.floor(Math.random() * 898);
}
async function rng() {
    imgpos = 0;
    speechSynthesis.cancel();
    activepkm = await getRandomInt();
    activepkm = await insertar(activepkm);
}

async function next() {
    speechSynthesis.cancel();
    imgpos = 0;
    if (activepkm.id >= 898 || activepkm.id < 1) {
        activepkm.id = 1;
    } else {
        activepkm.id += 1;
    }
    activepkm = await insertar(activepkm.id);
}

async function prev() {
    imgpos = 0;
    speechSynthesis.cancel()
    if (activepkm.id <= 1 || activepkm.id > 898) {
        activepkm.id = 898;
    } else {
        activepkm.id -= 1;
    }
    activepkm = await insertar(activepkm.id);
}


async function rotarup() {
    if (imgpos < activepkm.sprites.length - 1) {
        imgpos += 1;
    } else {
        imgpos = 0
    }
    rotar(activepkm.sprites[imgpos])
}

async function rotardw() {
    if (imgpos > 0) {
        imgpos -= 1;
    } else {
        imgpos = activepkm.sprites.length - 1
    }
    rotar(activepkm.sprites[imgpos])
}


