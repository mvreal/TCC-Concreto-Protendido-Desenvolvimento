import { escreverSigmasLimitesCompleta, calcularCombinacoesProtensaoCompleta, escreverSigmasLimitesLimitada, calcularCombinacoesProtensaoLimitada, escreverCombinacao, limitesSigmac1Sigmac2, escreverLimitesAtoProtensao, calcularFckjFctj, escreverSigmac1Sigmac2, pegarDadosRotina4, pegarDadosRotina3, pegarDadosRotina2, pegarDadosRotina1, calcularMomentoFletor, criaroption, calcularSigmac1, calcularSigmac2, salvarDados } from "./functions.js"

//Variável de controle para saber a quantidade de registros salvos
let contador = 0;
let dados = []

if(typeof dadosSalvosdaRotina5 !== 'object'){
    console.log('não é obj')
    dados = []
    console.log('contador: ' + contador)
}else{
    console.log('é obj')
    dados = dadosSalvosdaRotina5
    contador = Number(dados.length)
    console.log('contador: ' + contador)
}

function main(){
    const select = document.getElementById('situacoes')
    const index = Number(select.value)
    const dado = dadosSalvosdaRotina4[index]

    //Pegando as informações das demais rotinas
    const {areaConcreto, centroide, w1, w2, ixg, tipo} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q} = pegarDadosRotina2(index)
    const {fck, Ap, ep, vao, secoes, tipoProtensao} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao} = pegarDadosRotina4(index)

    //Calculando os momentos
    const Mg1 = calcularMomentoFletor(g1, vao, secoes)
    const Mg = calcularMomentoFletor(g1 + g2, vao, secoes)
    const Mq = calcularMomentoFletor(q, vao, secoes)

    //Calculando as tensões no ato da protensão
    const sigmac1 = calcularSigmac1(perdaEncurtamento, areaConcreto, ep, w1, Mg1)
    const sigmac2 = calcularSigmac2(perdaEncurtamento, areaConcreto, ep, w2, Mg1)
    
    escreverSigmac1Sigmac2(sigmac1, sigmac2, secoes)
    const [fckj, fctmj] = calcularFckjFctj(fck, dataProtensao)
    const [limiteSigmac1, limiteSigmac2] = limitesSigmac1Sigmac2(fckj, fctmj)
    escreverLimitesAtoProtensao(limiteSigmac1, limiteSigmac2)

    escreverCombinacao(tipoProtensao)

    if(tipoProtensao == 'limitada'){
        const {sigmac1QP, sigmac2QP, sigmac1F, sigmac2F, limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F} = calcularCombinacoesProtensaoLimitada(perdaFinal, areaConcreto, ep, w1, w2, psi1, psi2, Mg, Mq, fctmj, fckj)
        escreverSigmasLimitesLimitada(sigmac1QP, sigmac2QP, sigmac1F, sigmac2F, limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F)
        dados[contador] = salvarDados(sigmac1QP, sigmac2QP, sigmac1F, sigmac2F, limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F, dadosSalvosdaRotina4[index], contador, sigmac1, sigmac2)


    }else if(tipoProtensao == 'completa'){
        const {sigmac1R, sigmac2R, sigmac1F, sigmac2F, limiteSigmac1R, limiteSigmac2R, limiteSigmac1F, limiteSigmac2F} = calcularCombinacoesProtensaoCompleta(perdaFinal, areaConcreto, ep, w1, w2, psi1, psi2, Mg, Mq, fctmj, fckj)
        escreverSigmasLimitesCompleta(sigmac1R, sigmac2R, sigmac1F, sigmac2F, limiteSigmac1R, limiteSigmac2R, limiteSigmac1F, limiteSigmac2F)
        dados[contador] = salvarDados(sigmac1R, sigmac2R, sigmac1F, sigmac2F, limiteSigmac1R, limiteSigmac2R, limiteSigmac1F, limiteSigmac2F, dadosSalvosdaRotina4[index], contador, sigmac1, sigmac2)
    }
    console.log(contador)
    window.api.dadosRotina5(dados)
    contador++
}

export {main}