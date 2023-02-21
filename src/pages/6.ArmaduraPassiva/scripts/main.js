import { calcularMomentoFletor } from "../../../scripts/functions.js"
import { pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4 } from "./functions.js"

function main(){
    const index = document.getElementById('idSelect'). value

    const {areaConcreto, centroide, w1, w2, ixg, tipo} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q} = pegarDadosRotina2(index)
    const {fck, Ap, ep, vao, secoes, tipoProtensao} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao} = pegarDadosRotina4(index)
    console.log(areaConcreto, centroide, w1, w2, ixg, tipo, psi1, psi2, g1, g2, q, fck, Ap, ep, vao, secoes, tipoProtensao, perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao)


    //const momentoProjetoELU = calcularMomentoFletor()
}

export {main}