import {inserirDadosSelect, verificarIndex, pegarSecoes, correcaoPerdasAtritoCasoAncoragensAtivas} from './functions.js'
import {calcularPerdasAtrito, calcularPontoRepousoAcomodacao, PerdasAcomodacaoXrMenorLsobre2, PerdasAcomodacaoXrMaiorLsobre2} from './perdas.js'

const getSelect = document.getElementById('dadosEntrada')
const getAncoragem = document.getElementById('dadosAncoragem')
const getE = document.getElementById('E')
const getRetorno = document.getElementById('retornoCabo')

let script = () => inserirDadosSelect(dadosSalvosdaRotina3)   
window.addEventListener('DOMContentLoaded', script)
console.log(dadosSalvosdaRotina3)

getSelect.addEventListener('change',mudarOption)

function mudarOption(){

    //Perdas por atrito
    let indexSelecionado = verificarIndex(getSelect)
    let secoes = pegarSecoes(dadosSalvosdaRotina3[indexSelecionado])
    let info = dadosSalvosdaRotina3[indexSelecionado]
    let epMax = Math.min(...(info['secoes']).map(el=>el['ep']))
    let vao = Number(dadosSalvosdaRotina3[indexSelecionado]['secoes'][0]['Vao'])
    let forçaInicialdeProtensao =  dadosSalvosdaRotina3[indexSelecionado]['pIniProj']
    let mi = Number(document.getElementById('coefAtrito').value)
    let coeficienteK = mi * 0.01
    let Ap = dadosSalvosdaRotina3[indexSelecionado]['Ap']

    let perdasAtrito = calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, mi, coeficienteK)

    //Necessário fazer a correção do tipo de ancoragem
    let tgBeta = (perdasAtrito[0] - perdasAtrito[5])/(secoes[0] - secoes[5]) //kN/m

    //-------------------------------------------------------------------------------------------------------

    //Considerando se a ancoragem é ativa ou passiva
    let arrCorrecaoAtrito = getAncoragem.value == 1 ? correcaoPerdasAtritoCasoAncoragensAtivas(perdasAtrito): perdasAtrito
    let tipoAncoragem = getAncoragem.value ==1 ? 'Ativa e Ativa': 'Ativa e Passiva'
    let pontoRepouso = calcularPontoRepousoAcomodacao(getRetorno.value, getE.value, Ap, tgBeta, getAncoragem.value)

    let perdasAcomodacao

    if(tipoAncoragem == 'Ativa e Ativa' && pontoRepouso>=vao/2){
        //Tem que rever essa funcao não esta dando um resultado coerente
        perdasAcomodacao = PerdasAcomodacaoXrMaiorLsobre2(tgBeta, vao, getRetorno.value, getE.value, Ap)
    }else{
        perdasAcomodacao = PerdasAcomodacaoXrMenorLsobre2(tgBeta, vao)
    }
    console.log(arrCorrecaoAtrito, perdasAcomodacao)
}





