function inserirDadosSelect(dadosSalvosdaRotina3){
    const getSelect = document.getElementById('dadosEntrada')
    dadosSalvosdaRotina3.forEach(element => {
        let createOption = document.createElement('option')
        getSelect.appendChild(createOption)
        createOption.innerText = ` Index: ${element.id}, Número de cabos: ${element.numCabos}, Número de Cordoalhas: ${element.numCordoalhasArredondado}`
        createOption.value = element.id
    });
}

function verificarIndex(e){
    return e.value
}

function pegarSecoes(objeto){
    let arr = objeto.secoes
    let secoes = arr.map((sec)=>{
        return sec.X

    })
    return secoes
}

//Ainda não foi testado
function correcaoPerdasAtritoCasoAncoragensAtivas(arr){
    let tamanhoArr = arr.lenght
    let repeticoes = Math.ceil(tamanhoArr/2)
    for(let i=0; i<repeticoes; i++){
        arr[tamanhoArr-i] = arr[i]
    }
    return arr
}

export {inserirDadosSelect, verificarIndex, pegarSecoes}