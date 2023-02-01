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

//Em desenvolvimento
function calcularPontoRepousoAcomodacao(retorno, E, Ap, tgB, tipo){

    //Arrumando as unidades
    let retornoMetros = retorno / 1000
    let EMPa = E * 1000000
    let ApMetros2 = (Ap / 1000000)
    let xr = Math.sqrt(retornoMetros * EMPa * ApMetros2 / tgB)
    return xr
}

function PerdasAcomodacaoXrMenorLsobre2(tgB,l){
    let deltaP1 = l * tgB /2
    let deltaTotal = 2 * deltaP1
    return deltaTotal
}

function PerdasAcomodacaoXrMaiorLsobre2(tgB, l, retorno, Ep, Ap){
    let deltaP2 = ((retorno * Ep * Ap) - (((l/2)**2) * tgB) / (l/2))
    let deltaP1 = l * tgB /2
    let deltaTotal = (2 * deltaP1) + deltaP2
    return deltaTotal
}


export {calcularPerdasAtrito, calcularPontoRepousoAcomodacao, PerdasAcomodacaoXrMenorLsobre2, PerdasAcomodacaoXrMaiorLsobre2}