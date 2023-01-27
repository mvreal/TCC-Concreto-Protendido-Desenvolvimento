import {inserirDadosSelect, verificarIndex, pegarSecoes} from './functions.js'
import { calcularPerdasAtrito } from './perdas.js'

const getSelect = document.getElementById('dadosEntrada')
const getAncoragem = document.getElementById('ancoragem')

let script = () => inserirDadosSelect(dadosSalvosdaRotina3)   
window.addEventListener('DOMContentLoaded', script)

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
    console.log(perdasAtrito, tgBeta)
    //-------------------------------------------------------------------------------------------------------

    

}



