import { calcularMomentoFletor, criaroption } from "./functions.js";
import { main } from "./main.js";

//criando Option - onload
criaroption(dadosSalvosdaRotina4)

const btnCalcular = document.getElementById('btnCalcular')
btnCalcular.addEventListener('click', main)

