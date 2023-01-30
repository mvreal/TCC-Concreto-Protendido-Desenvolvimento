import {inserirDadosSelect, verificarIndex, pegarSecoes, correcaoPerdasAtritoCasoAncoragensAtivas} from './functions.js'
import { calcularPerdasAtrito, calcularPerdasAcomodacao } from './perdas.js'

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

    let perdasAtrito = calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, mi, coeficienteK)

    //Necessário fazer a correção do tipo de ancoragem
    let tgBeta = (perdasAtrito[0] - perdasAtrito[5])/(secoes[0] - secoes[5]) //kN/m

    //-------------------------------------------------------------------------------------------------------

    //Considerando se a ancoragem é ativa ou passiva
    let arrCorrecaoAtrito = getAncoragem.value == 1 ? correcaoPerdasAtritoCasoAncoragensAtivas(perdasAtrito): perdasAtrito
    let resPerdasAcomodacao = calcularPerdasAcomodacao(getRetorno.value, getE.value, dadosSalvosdaRotina3[indexSelecionado]['Ap'], tgBeta, getAncoragem.value)

}



