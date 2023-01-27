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

export {calcularPerdasAtrito}