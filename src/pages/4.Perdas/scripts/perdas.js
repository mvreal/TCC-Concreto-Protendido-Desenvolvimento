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
function calcularPerdasAcomodacao(retorno, E, Ap, tgB, tipo){

    //Arrumando as unidades
    let retornoMetros = retorno / 1000
    let EMPa = E * 1000000
    let ApMetros2 = (Ap / 1000000)

    let xr = Math.sqrt(retornoMetros * EMPa * ApMetros2 / tgB)
    console.log(retornoMetros, EMPa, ApMetros2, tgB, tipo, xr)
}

export {calcularPerdasAtrito, calcularPerdasAcomodacao}