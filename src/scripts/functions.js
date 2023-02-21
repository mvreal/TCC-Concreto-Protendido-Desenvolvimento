// Aqui ficarão os scripts que podem ser acessados globalmente por qualquer rotina

function calcularMomentoFletor(peso, vao, secoes){
    let momentoFletorViga = secoes.map(sec => (peso * vao * sec/2) - (peso * (sec ** 2)/2))
    return momentoFletorViga
}

export {calcularMomentoFletor}