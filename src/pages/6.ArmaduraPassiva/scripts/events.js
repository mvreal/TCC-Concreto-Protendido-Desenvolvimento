import { main } from "./main"


const select = document.getElementById('idSelect')

document.addEventListener('DOMContentLoaded', carregarDados)
document.addEventListener('click', main)

function carregarDados(){
    console.log('entrou')
    dadosSalvosdaRotina5.forEach(el=>{
        const createOption = document.createElement('option')
        const index = el['dadosRotina5']['index']
        createOption.value = index
        createOption.innerText = index
        select.appendChild(createOption)
    })
}

