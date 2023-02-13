import { importarDados, salvarDados, calcularsigmaPermanente, pegarPerimetroAr_cm, forcaProtensaoInstante0, somaSigmas, calcularMomentoFletor, inserirDadosSelect, ArrConversaocmparam, conversaocmparam, conversaoInerciacm4param4, verificarIndex, conversaoAreacm2param2, pegarSecoes, correcaoPerdasAtritoCasoAncoragensAtivas, moduloElasticidadeConcreto, calcularSigma_cg, conversaoModuloElasticidadeGPaParaMPa, calcularSigma_cp, variacaoTensaoEncurtamentoElastico, escreverPerdas } from './functions.js'
import { arrPancPontoRepousoMenorLsobre2AncoragemAtivaAtiva, calcularForcaFinalProtensao, calcularPercentualPerdasDiferidas, arrPancPontoRepousoMaiorLsobre2AncoragemAtivaAtiva, arrPancPontoRepousoAncoragemAtivaPassiva, calcularPerdasAtrito, calcularPontoRepousoAcomodacao, PerdasAcomodacaoXrMenorLsobre2, PerdasAcomodacaoXrMaiorLsobre2 } from './perdas.js'
import { calcularCoeficienteFluencia, calcularInterpolacaoCoeficienteFluencia } from './fluencia.js'


const btnCalcular = document.getElementById('btnCalcular')
const getSelect = document.getElementById('dadosEntrada')
const getAncoragem = document.getElementById('dadosAncoragem')
const getE = document.getElementById('E')
const getRetorno = document.getElementById('retornoCabo')

let resposta = dadosSalvosdaRotina4

let script = () => inserirDadosSelect(dadosSalvosdaRotina3)
window.addEventListener('DOMContentLoaded', script)

btnCalcular.addEventListener('click', mudarOption)

function mudarOption() {
    console.log(resposta)
    //Perdas por atrito
    let indexSelecionado = verificarIndex(getSelect)
    let secoes = pegarSecoes(dadosSalvosdaRotina3[indexSelecionado])
    let ep = dadosSalvosdaRotina3[indexSelecionado]['secoes'].map(el => el['ep'])
    let info = dadosSalvosdaRotina3[indexSelecionado]
    let epMax = Math.min(...(info['secoes']).map(el => el['ep']))
    let vao = Number(dadosSalvosdaRotina3[indexSelecionado]['secoes'][0]['Vao'])
    let forcaInicialdeProtensao = -dadosSalvosdaRotina3[indexSelecionado]['pIniProj']
    let mi = Number(document.getElementById('coefAtrito').value)
    let coeficienteK = mi * 0.01
    let Ap = dadosSalvosdaRotina3[indexSelecionado]['Ap']

    let perdasAtrito = calcularPerdasAtrito(epMax, vao, secoes, forcaInicialdeProtensao, mi, coeficienteK)
    //Necessário fazer a correção do tipo de ancoragem
    let tgBeta = (perdasAtrito[0] - perdasAtrito[2]) / (secoes[2] - secoes[0]) //kN/m

    //-------------------------------------------------------------------------------------------------------

    //Considerando se a ancoragem é ativa ou passiva
    let arrCorrecaoAtrito = getAncoragem.value == 1 ? correcaoPerdasAtritoCasoAncoragensAtivas(perdasAtrito) : perdasAtrito
    let tipoAncoragem = getAncoragem.value == 1 ? 'Ativa e Ativa' : 'Ativa e Passiva'
    let pontoRepouso = calcularPontoRepousoAcomodacao(getRetorno.value, getE.value, Ap, tgBeta, getAncoragem.value)

    let perdasAcomodacao, Panc, Pancoragem, Panc1, arrPanc

    if (tipoAncoragem == 'Ativa e Ativa' && pontoRepouso >= vao / 2) {
        perdasAcomodacao = PerdasAcomodacaoXrMaiorLsobre2(tgBeta, vao, getRetorno.value, getE.value, Ap)
        Panc1 = arrCorrecaoAtrito[0] - perdasAcomodacao
        arrPanc = arrPancPontoRepousoMaiorLsobre2AncoragemAtivaAtiva(arrCorrecaoAtrito, Panc1, tgBeta, secoes)
    } else if (tipoAncoragem == 'Ativa e Ativa' && pontoRepouso <= vao / 2) {
        perdasAcomodacao = PerdasAcomodacaoXrMenorLsobre2(tgBeta, pontoRepouso)
        Panc1 = arrCorrecaoAtrito[0] - perdasAcomodacao
        arrPanc = arrPancPontoRepousoMenorLsobre2AncoragemAtivaAtiva(arrCorrecaoAtrito, Panc1, tgBeta, pontoRepouso, secoes)
    } else if (tipoAncoragem == 'Ativa e Passiva') {
        perdasAcomodacao = PerdasAcomodacaoXrMenorLsobre2(tgBeta, pontoRepouso)
        Panc1 = arrCorrecaoAtrito[0] - perdasAcomodacao
        arrPanc = arrPancPontoRepousoAncoragemAtivaPassiva(arrCorrecaoAtrito, Panc1, tgBeta, pontoRepouso, secoes)
    }

    let PancoragemNewton = arrPanc.map(el => el * 1000)
    let { area, ixg } = dadosSalvosdaRotina3[indexSelecionado]['rotina2']['rotina1']
    let fck = Number(dadosSalvosdaRotina3[indexSelecionado]['fck'])
    let moduloElasticConcreto = moduloElasticidadeConcreto(fck)
    let moduloElasticidadeAco = Number(document.getElementById('E').value) * Math.pow(10, 3)
    let relacaoEntreModuloElasticidadeAcoModuloElasticidadeConcreto = Number(moduloElasticidadeAco / moduloElasticConcreto)
    let aream2 = conversaoAreacm2param2(area)
    let ixgm4 = conversaoInerciacm4param4(ixg)
    let sigma_cp = calcularSigma_cp(PancoragemNewton, aream2, ep, ixgm4)
    let sigma_cpMPa = sigma_cp.map(el => el / 1000000)

    let pesosProprios = [Number(dadosSalvosdaRotina3[indexSelecionado]['rotina2']['dados']['carregamentos']['g1']), Number(dadosSalvosdaRotina3[indexSelecionado]['rotina2']['dados']['carregamentos']['g2'])]

    let momentoFletorPesoProprio = calcularMomentoFletor(pesosProprios[0], vao, secoes) //kN * m
    let momentoFletorPesoProprioSI = momentoFletorPesoProprio.map(el => el * 1000)
    let sigma_cg = calcularSigma_cg(momentoFletorPesoProprioSI, ep, ixgm4)
    let sigma_cgMPa = sigma_cg.map(el => el / 1000000)
    let somasigmasMPA = somaSigmas(sigma_cpMPa, sigma_cgMPa)

    const numeroCabos = Number(dadosSalvosdaRotina3[indexSelecionado]['numCabos'])
    const deltaTensaoEncurtamentoElastico = variacaoTensaoEncurtamentoElastico(relacaoEntreModuloElasticidadeAcoModuloElasticidadeConcreto, somasigmasMPA, numeroCabos) //MPa
    const areaProtensao = Number(dadosSalvosdaRotina3[indexSelecionado]['Ap'])
    const perdaProtensaoEncurtamentoElastico = deltaTensaoEncurtamentoElastico.map(el => (-el * 1000) * conversaoAreacm2param2((areaProtensao / 100))) //kN
    const PancoragemkN = PancoragemNewton.map(el => el / 1000)

    const forcaProtInstante0 = forcaProtensaoInstante0(PancoragemkN, perdaProtensaoEncurtamentoElastico) // kN
    const forcaProtInstante0Newton = forcaProtInstante0.map(el => el * 1000)
    const espessuraFicticia = ((2 * Number(area)) / Number(pegarPerimetroAr_cm()))
    const instanteAplicacaoCarga = Number(document.getElementById('instanteAplicacaoCarga').value)
    const umidadeMedia = Number(document.getElementById('umidadeMedia').value)
    const tipoConcreto = (fck < 50) ? 1 : 2
    const coeficienteFluencia = calcularCoeficienteFluencia(umidadeMedia, espessuraFicticia, tipoConcreto, instanteAplicacaoCarga)
    const momentoPesoProprioCargasPermanentes = calcularMomentoFletor(pesosProprios[0] + pesosProprios[1], vao, secoes) //kN * m
    const momentoPesoProprioCargasPermanentesSI = momentoPesoProprioCargasPermanentes.map(el => el * 1000)

    //Devemos adquirir a tensão causada no concreto devido ao esforço de protensão do cabo  somado as cargas permanentes.
    const sigmaPermanente = calcularsigmaPermanente(forcaProtInstante0Newton, aream2, ep, ixgm4, momentoPesoProprioCargasPermanentesSI) //MPa
    const percentualPerdas = calcularPercentualPerdasDiferidas(relacaoEntreModuloElasticidadeAcoModuloElasticidadeConcreto, coeficienteFluencia, sigmaPermanente)
    const forcaFinalProtensao = calcularForcaFinalProtensao(forcaProtInstante0, percentualPerdas) //kN
    escreverPerdas(perdasAtrito, arrPanc, forcaProtInstante0, forcaFinalProtensao, secoes)

    resposta.push({
        perdaAtrito: perdasAtrito,
        perdaAncoragem: arrPanc,
        perdaEncurtamento: forcaProtInstante0,
        perdaFinal: forcaFinalProtensao,
        dadosSalvosdaRotina3: dadosSalvosdaRotina3[indexSelecionado]
    })
    window.api.dadosSalvosdaRotina4(resposta)
    alert('Dados salvos, id = ' + resposta.length-1)
}





