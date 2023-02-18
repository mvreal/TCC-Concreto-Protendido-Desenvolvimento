import { escreverSigmasLimitesLimitada, calcularCombinacoesProtensaoLimitada, escreverCombinacao, limitesSigmac1Sigmac2, escreverLimitesAtoProtensao, calcularFckjFctj, escreverSigmac1Sigmac2, pegarDadosRotina4, pegarDadosRotina3, pegarDadosRotina2, pegarDadosRotina1, calcularMomentoFletor, criaroption, calcularSigmac1, calcularSigmac2 } from "./functions.js"

function main(){
    const select = document.getElementById('situacoes')
    const index = Number(select.value)
    const dado = dadosSalvosdaRotina4[index]


    const {areaConcreto, centroide, w1, w2, ixg, tipo} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q} = pegarDadosRotina2(index)
    const {fck, Ap, ep, vao, secoes, tipoProtensao} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao} = pegarDadosRotina4(index)

    const Mg1 = calcularMomentoFletor(g1, vao, secoes)
    const Mg = calcularMomentoFletor(g1 + g2, vao, secoes)
    const Mq = calcularMomentoFletor(q, vao, secoes)
    const sigmac1 = calcularSigmac1(perdaEncurtamento, areaConcreto, ep, w1, Mg1)
    const sigmac2 = calcularSigmac2(perdaEncurtamento, areaConcreto, ep, w2, Mg1)
    
    escreverSigmac1Sigmac2(sigmac1, sigmac2, secoes)
    const [fckj, fctmj] = calcularFckjFctj(fck, dataProtensao)
    const [limiteSigmac1, limiteSigmac2] = limitesSigmac1Sigmac2(fckj, fctmj)
    escreverLimitesAtoProtensao(limiteSigmac1, limiteSigmac2)
    escreverCombinacao(tipoProtensao)
    const {sigmac1QP, sigmac2QP, sigmac1F, sigmac2F, limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F} = calcularCombinacoesProtensaoLimitada(perdaFinal, areaConcreto, ep, w1, w2, psi1, psi2, Mg, Mq, fctmj, fckj)
    console.log(sigmac1QP, sigmac2QP, sigmac1F, sigmac2F, limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F)
    escreverSigmasLimitesLimitada(sigmac1QP, sigmac2QP, sigmac1F, sigmac2F, limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F)
}

export {main}