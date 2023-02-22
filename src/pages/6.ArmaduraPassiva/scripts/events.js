import { main } from "./main.js"


const select = document.getElementById('idSelect')
const btnMain = document.getElementById('btnMain')

document.addEventListener('DOMContentLoaded', carregarDados)
btnMain.addEventListener('click', main)

function carregarDados(){
    dadosSalvosdaRotina5.forEach(el=>{
        const createOption = document.createElement('option')
        const index = el['dadosRotina5']['index']
        createOption.value = index
        createOption.innerText = index
        select.appendChild(createOption)
    })
}

