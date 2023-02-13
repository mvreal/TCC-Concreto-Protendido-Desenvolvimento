import { pegarDadosRotina4, pegarDadosRotina3, pegarDadosRotina2, pegarDadosRotina1, calcularMomentoFletor, criaroption } from "./functions.js"

function main(){
    const select = document.getElementById('situacoes')
    const index = Number(select.value)
    const dado = dadosSalvosdaRotina4[index]

    const {area, centroide, w1, w2, ixg, tipo} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q} = pegarDadosRotina2(index)
    const {fck, Ap, ep} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal} = pegarDadosRotina4(index)

    console.log(area, centroide, w1, w2, ixg, tipo)
    console.log(psi1, psi2, g1, g2, q)
    console.log(fck, Ap, ep)
    console.log(perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal)
}



export {main}