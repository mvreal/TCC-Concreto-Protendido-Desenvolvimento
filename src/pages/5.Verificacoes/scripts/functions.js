function calcularMomentoFletor(peso, vao, secoes){
    let momentoFletorViga = secoes.map(sec => (peso * vao * sec/2) - (peso * (sec ** 2)/2))
    return momentoFletorViga
}