function calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, mi, coeficienteK){
    let derivadaY = secoes.map(sec => (((-8 * epMax)/(vao ** 2)) * sec) + ((4 * epMax)/vao))
    let anguloAlfa = derivadaY.map(el => -(Math.atan(el)))
    let deltaAlfa = []

    for (let i = 0; i < anguloAlfa.length; i++) {
        deltaAlfa.push(anguloAlfa[0]-anguloAlfa[i])
    }
    let Px = []
    
    for(let i = 0; i<secoes.length; i++){
        Px.push(forçaInicialdeProtensao * Math.exp(-mi * (deltaAlfa[i]) - coeficienteK * secoes[i]))
    }
    return Px
}

function calcularPontoRepousoAcomodacao(retorno, E, Ap, tgB){
    console.log(retorno, E, Ap, tgB)
    //Arrumando as unidades
    let retornoMetros = retorno / 1000
    let EMPa = E * 1000000
    let ApMetros2 = (Ap / 1000000)
    let xr = Math.sqrt(retornoMetros * EMPa * ApMetros2 / tgB)
    return xr
}

function PerdasAcomodacaoXrMenorLsobre2(tgBeta, xr){
    return 2 * tgBeta * xr
    
}

function PerdasAcomodacaoXrMaiorLsobre2(tgB, l, retorno, Ep, Ap){

    let retornoMetros = retorno / 1000
    let EMPa = Ep * 1000000
    let ApMetros2 = (Ap / 1000000)

    let deltaP2 = (((retornoMetros * EMPa * ApMetros2) - (((l/2)**2) * tgB)) / (l/2))
    let deltaP1 = l * tgB /2
    let deltaTotal = (2 * deltaP1) + deltaP2
    return deltaTotal
}

function arrPancPontoRepousoMenorLsobre2AncoragemAtivaAtiva(arrCorrecaoAtrito, Panc1, tgBeta, xr, secoes){
    let xresquerda = xr
    let Panc = []
    let numeroSecoes = secoes.length

    for(let i = 0; i<numeroSecoes; i++){
        if(secoes[i] < xresquerda){
            Panc.push(Panc1 + (tgBeta * secoes[i])) 
        }else{
            Panc.push(arrCorrecaoAtrito[i])
        }
    }

    let repeticoes = Math.floor(numeroSecoes/2)

    for(let i=0; i<repeticoes; i++){
        Panc[numeroSecoes-i-1] = Panc[i]
    }
    return Panc
}

//tem que revisar essa funcao, resultados errados
function arrPancPontoRepousoMaiorLsobre2AncoragemAtivaAtiva(arrCorrecaoAtrito, Panc1, tgBeta, secoes){

    let Panc = []
    let repeticoesAncoragem = arrCorrecaoAtrito.length
    let repeticoesEspelharArr = Math.floor(repeticoesAncoragem/2)

    console.log(repeticoesAncoragem,repeticoesEspelharArr)

    for(let i = 0; i < repeticoesAncoragem; i++){
        Panc.push(Panc1 + (tgBeta * secoes[i]))

    }

    for(let i = 0; i < repeticoesEspelharArr; i++){
        Panc[repeticoesAncoragem-i-1] = Panc[i]
    }
    return Panc
}

function arrPancPontoRepousoAncoragemAtivaPassiva(arrCorrecaoAtrito, Panc1, tgBeta, xr, secoes){
    let tamanhoSecoes = secoes.length
    let Panc = []
    for(let i = 0; i < tamanhoSecoes; i++){
        if(secoes[i]<xr){
            Panc.push(Panc1 + (tgBeta * secoes[i]))
        }else{
            Panc.push(arrCorrecaoAtrito[i])
        }
    }
    return Panc
}



export {arrPancPontoRepousoAncoragemAtivaPassiva, arrPancPontoRepousoMaiorLsobre2AncoragemAtivaAtiva, calcularPerdasAtrito, calcularPontoRepousoAcomodacao, PerdasAcomodacaoXrMenorLsobre2, PerdasAcomodacaoXrMaiorLsobre2, arrPancPontoRepousoMenorLsobre2AncoragemAtivaAtiva}