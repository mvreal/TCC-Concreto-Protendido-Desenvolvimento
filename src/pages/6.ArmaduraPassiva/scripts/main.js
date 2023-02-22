import { calcularMomentoFletor } from "../../../scripts/functions.js"
import { pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4 } from "./functions.js"

function main(event){
    const index = document.getElementById('idSelect'). value
    const dlinha = Number(document.getElementById('distanciaInferior').value)

    const {areaConcreto, centroide, w1, w2, ixg, tipo, h} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q, gamag1, gamag2, gamaq} = pegarDadosRotina2(index)
    const {fck, Ap, ep, vao, secoes, tipoProtensao} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao, dlinhaProtensao} = pegarDadosRotina4(index)

    const distanciaFaceSuperiorArmaduraPassiva = h - dlinha
    //ds
    const distanciaFaceSuperiorArmaduraAtiva = h - dlinhaProtensao


    const somatorioCargas = g1 + g2 + q
    const momentoProjetoELU = calcularMomentoFletor(somatorioCargas, vao, secoes).map(el => 1.4 * el)

    const sigmacd = Number((fck * 0.85) / 1.4)




}

export {main}