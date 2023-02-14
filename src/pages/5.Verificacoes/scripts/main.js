import { pegarDadosRotina4, pegarDadosRotina3, pegarDadosRotina2, pegarDadosRotina1, calcularMomentoFletor, criaroption, calcularSigmac1 } from "./functions.js"

function main(){
    const select = document.getElementById('situacoes')
    const index = Number(select.value)
    const dado = dadosSalvosdaRotina4[index]

    const {areaConcreto, centroide, w1, w2, ixg, tipo} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q} = pegarDadosRotina2(index)
    const {fck, Ap, ep, vao, secoes} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal} = pegarDadosRotina4(index)


    console.log(areaConcreto, centroide, w1, w2, ixg, tipo)
    console.log(psi1, psi2, g1, g2, q)
    console.log(fck, Ap, ep)
    console.log(perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal)

    const Mg1 = calcularMomentoFletor(g1, vao, secoes)
    console.log(Mg1)

    const sigmac1 = calcularSigmac1(perdaEncurtamento, areaConcreto, ep, w1, Mg1)
    console.log(sigmac1)

}

export {main}