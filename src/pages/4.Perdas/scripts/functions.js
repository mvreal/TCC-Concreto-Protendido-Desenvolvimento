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

function calcularMomentoFletor(pesosProprioViga, vao, secoes){
    let momentoFletorViga = secoes.map(sec => (pesosProprioViga * vao * sec/2) - (pesosProprioViga * (sec ** 2)/2))
    return momentoFletorViga
}

function calcularsigmaPermanente(P0, area, ep, Ic, momentocargaspermanentes){
    let tensaodevidocargasPermanentes = []
    for(let i = 0; i < momentocargaspermanentes.length; i++){
        tensaodevidocargasPermanentes[i] = (-P0[i] * ((1/area) + ((ep[i]**2)/Ic))) - ((momentocargaspermanentes[i] * ep[i])/Ic)
    }
    return tensaodevidocargasPermanentes.map(el=>el/1000000
    )
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

function pegarPerimetro(posicao){
    const perimetroFigura = dadosSalvosdaRotina3[posicao]['rotina2']['rotina1']['perimetro']
    return perimetroFigura
}

function imprimirPerimetro(perimetro){
    const inputPerimetroTotal = document.getElementById('perimetroTotal')
    inputPerimetroTotal.value = perimetro
}

function mudarOption(evento){
    const indexSelecionado = verificarIndex(evento.target)
    const perimetro = pegarPerimetro(indexSelecionado)
    imprimirPerimetro(perimetro)
}

function recalcularPerimetrocm(evento){
    const inputPorcentagemValue = evento.target.value
    const inputPerimetroAr = document.getElementById('perimetroAr')
    const perimetroTotal = document.getElementById('perimetroTotal')
    inputPerimetroAr.value = (Number(perimetroTotal.value) * Number(inputPorcentagemValue) / 100).toFixed(1)
}

function recalcularPerimetroPorcentagem(evento){
    const inputPerimetrocmValue = evento.target.value
    const inputPerimetroTotal = document.getElementById('perimetroTotal')
    const autoOption = document.getElementById('autoOptionPerimetroPorcentagem')
    const selectPerimetro = document.getElementById('PorcentagemPerimetro')
    autoOption.value = ((Number(inputPerimetrocmValue) / Number(inputPerimetroTotal.value)) * 100).toFixed(1)

    autoOption.innerText = autoOption.value + '%'
    selectPerimetro.value = autoOption.value
}

function pegarPerimetroAr_cm(){
    return Number(document.getElementById('perimetroAr').value)
}

function escreverPerdas(arrAtrito, arrAncoragem, arrEncurtamento, arrPerdasDiferidas, secoes){
    console.log(arrAtrito, arrAncoragem, arrEncurtamento, arrPerdasDiferidas)

    const repeticoes = arrAtrito.length

    let txtAtrito, txtAncoragem, txtEncurtamento, txtDiferidas = ''

    const divArrAtrito = document.getElementById('arrPerdasAtrito')
    const divArrAcomodacao = document.getElementById('arrPerdasAcomodacao')
    const divArrEncurtamento = document.getElementById('arrPerdasEncurtamento')
    const divArrDiferidas = document.getElementById('arrPerdasProgressivas')

   for(let i = 0; i < repeticoes; i++){
    txtAtrito += 'Seção: ' + secoes[i] + 'm - ' + arrAtrito[i].toFixed(2) + 'kN' + '</br>' 
    txtAncoragem += 'Seção: ' + secoes[i] + 'm - ' + arrAncoragem[i].toFixed(2) + 'kN' + '</br>' 
    txtEncurtamento += 'Seção: ' + secoes[i] + 'm - ' + arrEncurtamento[i].toFixed(2) + 'kN' + '</br>' 
    txtDiferidas += 'Seção: ' + secoes[i] + 'm - ' + arrPerdasDiferidas[i].toFixed(2) + 'kN' + '</br>' 
   }
   txtAtrito = txtAtrito.replace('undefined','')
   txtAncoragem = txtAncoragem.replace('undefined','')
   txtEncurtamento = txtEncurtamento.replace('undefined','')
   txtDiferidas = txtDiferidas.replace('undefined','')

    divArrAtrito.innerHTML = txtAtrito
    divArrAcomodacao.innerHTML = txtAncoragem
    divArrEncurtamento.innerHTML = txtEncurtamento
    divArrDiferidas.innerHTML = txtDiferidas
}

function importarDados(){
    return dadosSalvosdaRotina4
}

export { importarDados, escreverPerdas, calcularsigmaPermanente, pegarPerimetroAr_cm, recalcularPerimetroPorcentagem, recalcularPerimetrocm,mudarOption, imprimirPerimetro, pegarPerimetro, forcaProtensaoInstante0, variacaoTensaoEncurtamentoElastico, somaSigmas, calcularSigma_cg,inserirDadosSelect,ArrConversaocmparam, calcularMomentoFletor, conversaoInerciacm4param4, verificarIndex,conversaoAreacm2param2, pegarSecoes, correcaoPerdasAtritoCasoAncoragensAtivas, moduloElasticidadeConcreto, conversaoModuloElasticidadeGPaParaMPa,calcularSigma_cp,conversaocmparam }