// Aqui ficarão os scripts que podem ser acessados globalmente por qualquer rotina

function calcularMomentoFletor(peso, vao, secoes){
    console.log(peso, vao, secoes)
    let momentoFletorViga = secoes.map(sec => (peso * vao * sec/2) - (peso * (sec ** 2)/2))
    return momentoFletorViga
}

function fpyk(fptk){
    return 0.9 * fptk //MPa
}

function fpyd(fpyk){
    return fpyk / 1.15
}

export {calcularMomentoFletor, fpyk, fpyd}