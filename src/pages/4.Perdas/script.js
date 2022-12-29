const getSelect = document.getElementById('dadosEntrada')

let script = () =>{
    inserirDadosSelect(dadosSalvosdaRotina3)
}


window.addEventListener('DOMContentLoaded', script)


function inserirDadosSelect(dadosSalvosdaRotina3){
    console.log(dadosSalvosdaRotina3)
    dadosSalvosdaRotina3.forEach(element => {
        console.log(element)
        let createOption = document.createElement('option')
        getSelect.appendChild(createOption)
        createOption.innerText = ` Index: ${element.id}, Número de cabos: ${element.numCabos}, Número de Cordoalhas: ${element.numCordoalhasArredondado}`
        createOption.value = element.id
    });
}

