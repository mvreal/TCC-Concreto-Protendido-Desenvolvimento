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
    for(let i=0; i<repeticoes; i++){
        arr[tamanhoArr-i-1] = arr[i]
    }
    return arr
}

function moduloElasticidadeConcreto(fck){
    let Ecs = ((0.8 + (0.2 * fck)/80)) * 5600 * Math.sqrt(fck)
    return Ecs
}

function variacaoTensaoEncurtamentoElastico(alfap, tensoesTotais, numeroCabos){
    console.log(alfap, tensoesTotais, numeroCabos)
    const deltaSigmaP = tensoesTotais.map(el=> alfap * (el) * ((numeroCabos-1)/(2 * numeroCabos))) //MPa
    return deltaSigmaP
}

function conversaoModuloElasticidadeGPaParaMPa(E){
    return E * 1000
}

function conversaoAreacm2param2(areaCm2){
    return areaCm2/10000
}

function conversaoInerciacm4param4(inerciaCm4){
    return inerciaCm4/100000000
}

function calcularMomentoFletorPesoProprioViga(pesosProprioViga, vao, secoes){
    let momentoFletorViga = secoes.map(sec => (pesosProprioViga * vao * sec/2) - (pesosProprioViga * (sec ** 2)/2))
    return momentoFletorViga
}

function calcularSigma_cp(Panc, area, ep, Ic){
    let sigma_cp = []
    if(Panc.length == ep.length){
        for(let i=0; i<Panc.length; i++){
            sigma_cp.push(-Panc[i] * ((1/area) + ((ep[i] ** 2)/Ic)))
        }
    }else{
        throw console.error('Panc e ep não tem o mesmo numero de seções');
    }
    return sigma_cp
}

function calcularSigma_cg(momentoPesoProprio, ep, Ic){
    let sigma_cg = []
    for(let i = 0; i < momentoPesoProprio.length; i++){
        sigma_cg.push((-momentoPesoProprio[i] * ep[i])/Ic)
    }
    return sigma_cg
}

function conversaocmparam(cm){
    return cm/100
}

function somaSigmas(sigma_cp, sigma_cg){
    let somaSigmas = []
    for(let i = 0; i<sigma_cg.length; i++){
        somaSigmas.push(sigma_cg[i]+sigma_cp[i])
    }
    return somaSigmas
}


function ArrConversaocmparam(cmArr){
    let metrosArr = cmArr.map(el=>el/100)
    return metrosArr
}

function forcaProtensaoInstante0(PancoragemkN, perdaProtensaoEncurtamentoElastico){ //Parâmetros em kN
    let forcaProtInstante0 = []
    for(let i = 0; i < PancoragemkN.length; i++){
        forcaProtInstante0[i] = PancoragemkN[i] - perdaProtensaoEncurtamentoElastico[i]
    }
    return forcaProtInstante0
}


export {forcaProtensaoInstante0, variacaoTensaoEncurtamentoElastico, somaSigmas, calcularSigma_cg,inserirDadosSelect,ArrConversaocmparam, calcularMomentoFletorPesoProprioViga, conversaoInerciacm4param4, verificarIndex,conversaoAreacm2param2, pegarSecoes, correcaoPerdasAtritoCasoAncoragensAtivas, moduloElasticidadeConcreto, conversaoModuloElasticidadeGPaParaMPa,calcularSigma_cp,conversaocmparam}