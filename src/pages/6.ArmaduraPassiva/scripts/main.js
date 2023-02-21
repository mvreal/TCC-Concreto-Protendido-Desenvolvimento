import { calcularMomentoFletor } from "../../../scripts/functions;js"

function main(){
    const index = document.getElementById('idSelect'). value

    const {areaConcreto, centroide, w1, w2, ixg, tipo} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q} = pegarDadosRotina2(index)
    const {fck, Ap, ep, vao, secoes, tipoProtensao} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao} = pegarDadosRotina4(index)



    const momentoProjetoELU = calcularMomentoFletor()
}

export {main}