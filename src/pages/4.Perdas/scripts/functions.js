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

function moduloElasticidadeConcreto(fck){
    let Ecs = ((0.8 + (0.2 * fck)/80)) * 5600 * Math.sqrt(fck)
    return Ecs
}

function conversaoModuloElasticidadeGPaParaMPa(E){
    return E * 1000
}

function momentoFletorPesoProprio(pesoProprio,vao,secoes){
    secoes.map(sec => (pesoProprio * vao * sec/2) - (pesoProprio * (sec ** 2)/2))
}

function calcularSigma_cp(Panc, area, ep, Ic){
    let sigma_cp = ep.map(epSecao => -Panc * ((1/area) + ((epSecao ** 2)/Ic))
    )
    return sigma_cp
}


export {inserirDadosSelect, verificarIndex, pegarSecoes,correcaoPerdasAtritoCasoAncoragensAtivas, moduloElasticidadeConcreto, conversaoModuloElasticidadeGPaParaMPa,calcularSigma_cp}