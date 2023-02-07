import {inserirDadosSelect,ArrConversaocmparam,conversaocmparam, momentoFletorPesoProprio, conversaoInerciacm4param4, verificarIndex,conversaoAreacm2param2, pegarSecoes, correcaoPerdasAtritoCasoAncoragensAtivas, moduloElasticidadeConcreto, conversaoModuloElasticidadeGPaParaMPa,calcularSigma_cp} from './functions.js'
import {arrPancPontoRepousoMaiorLsobre2AncoragemAtivaAtiva, arrPancPontoRepousoAncoragemAtivaPassiva, calcularPerdasAtrito, calcularPontoRepousoAcomodacao, PerdasAcomodacaoXrMenorLsobre2, PerdasAcomodacaoXrMaiorLsobre2} from './perdas.js'

const getSelect = document.getElementById('dadosEntrada')
const getAncoragem = document.getElementById('dadosAncoragem')
const getE = document.getElementById('E')
const getRetorno = document.getElementById('retornoCabo')

let script = () => inserirDadosSelect(dadosSalvosdaRotina3)   
window.addEventListener('DOMContentLoaded', script)

getSelect.addEventListener('change',mudarOption)

function mudarOption(){

    //Perdas por atrito
    let indexSelecionado = verificarIndex(getSelect)
    let secoes = pegarSecoes(dadosSalvosdaRotina3[indexSelecionado])
    let ep = dadosSalvosdaRotina3[indexSelecionado]['secoes'].map(el=>el['ep'])
    let info = dadosSalvosdaRotina3[indexSelecionado]
    let epMax = Math.min(...(info['secoes']).map(el=>el['ep']))
    let vao = Number(dadosSalvosdaRotina3[indexSelecionado]['secoes'][0]['Vao'])
    let forçaInicialdeProtensao =  dadosSalvosdaRotina3[indexSelecionado]['pIniProj']
    let mi = Number(document.getElementById('coefAtrito').value)
    let coeficienteK = mi * 0.01
    let Ap = dadosSalvosdaRotina3[indexSelecionado]['Ap']

    let perdasAtrito = calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, mi, coeficienteK)
    
    //Necessário fazer a correção do tipo de ancoragem
    let tgBeta = (perdasAtrito[0] - perdasAtrito[2])/(secoes[0] - secoes[2]) //kN/m

    //-------------------------------------------------------------------------------------------------------

    //Considerando se a ancoragem é ativa ou passiva
    let arrCorrecaoAtrito = getAncoragem.value == 1 ? correcaoPerdasAtritoCasoAncoragensAtivas(perdasAtrito): perdasAtrito
    let tipoAncoragem = getAncoragem.value ==1 ? 'Ativa e Ativa': 'Ativa e Passiva'
    let pontoRepouso = calcularPontoRepousoAcomodacao(getRetorno.value, getE.value, Ap, tgBeta, getAncoragem.value)

    let perdasAcomodacao, Panc, Pancoragem, Panc1, arrPanc

    console.log('Array das perdas Atrito:' + arrCorrecaoAtrito)
    console.log('Ponto Repouso:' + pontoRepouso)
    

    if(tipoAncoragem == 'Ativa e Ativa' && pontoRepouso >= vao/2){
        perdasAcomodacao = PerdasAcomodacaoXrMaiorLsobre2(tgBeta, vao, getRetorno.value, getE.value, Ap)
        Panc1 = arrCorrecaoAtrito[0] + perdasAcomodacao
        arrPanc = arrPancPontoRepousoMaiorLsobre2AncoragemAtivaAtiva(arrCorrecaoAtrito, Panc1,tgBeta, secoes)
    }else if(tipoAncoragem == 'Ativa e Ativa' && pontoRepouso <= vao/2){
        perdasAcomodacao = PerdasAcomodacaoXrMenorLsobre2(tgBeta, pontoRepouso)
        Panc1 = arrCorrecaoAtrito[0] + perdasAcomodacao
        arrPanc = arrPancPontoRepousoMenorLsobre2AncoragemAtivaAtiva(arrCorrecaoAtrito, Panc1, tgBeta, pontoRepouso, secoes)
    }else if(tipoAncoragem == 'Ativa e Passiva'){
        perdasAcomodacao = PerdasAcomodacaoXrMenorLsobre2(tgBeta, pontoRepouso)
        Panc1 = arrCorrecaoAtrito[0] + perdasAcomodacao
        arrPanc = arrPancPontoRepousoAncoragemAtivaPassiva(arrCorrecaoAtrito, Panc1, tgBeta, pontoRepouso, secoes)
    }
    console.log('Perdas Acomodação '+ perdasAcomodacao)
    console.log('PancoragemItem1 '+ Panc1)
    console.log('Array Panc ' + arrPanc)

    let PancoragemNewton = arrPanc.map(el=>el*1000)
    let {area,ixg} = dadosSalvosdaRotina3[indexSelecionado]['rotina2']['rotina1']
    let fck = Number(dadosSalvosdaRotina3[indexSelecionado]['fck'])
    let moduloElasticConcreto = moduloElasticidadeConcreto(fck)
    let moduloElasticidadeAco = Number(document.getElementById('E').value) * Math.pow(10,3)
    let relacaoEntreModuloElasticidadeAcoModuloElasticidadeConcreto = moduloElasticidadeAco/moduloElasticConcreto
    let aream2 = conversaoAreacm2param2(area)
    let ixgm4 = conversaoInerciacm4param4(ixg)
    let sigma_cp = calcularSigma_cp(PancoragemNewton,aream2,ep,ixgm4) 

}





