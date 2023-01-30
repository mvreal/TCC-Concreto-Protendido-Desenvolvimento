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

function correcaoPerdasAtritoCasoAncoragensAtivas(arr){
    let tamanhoArr = arr.length
    let repeticoes = Math.floor(tamanhoArr/2)
    console.log(tamanhoArr, repeticoes)
    for(let i=0; i<repeticoes; i++){
        arr[tamanhoArr-i-1] = arr[i]
    }
    console.log(arr)
    return arr
}



export {inserirDadosSelect, verificarIndex, pegarSecoes,correcaoPerdasAtritoCasoAncoragensAtivas}