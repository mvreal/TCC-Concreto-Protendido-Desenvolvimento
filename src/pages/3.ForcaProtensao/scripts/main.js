import { verificarDadosAnteriores, calcularForcaProtensaoProjeto, calcularNumeroCordoalhas, calcularForcasProtensaoCalculo, salvarResultados, calcularPosicoes, calcularEp, dimensionarSecoes, calcularFct, pegarInputs, pegarDadosRotina2, pegarDadosRotina1, mostrarInputs, objeto, pegarDados, calcularMomento } from "./functions.js"; 

var resultadosGlobal = (dadosSalvosdaRotina3 == 'object')? []: dadosSalvosdaRotina3;

function main(){


    //select, resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero, perdasEmPorcentagem
    const objetoSelecionado = objeto()

    const { area, centroide, b, h, ixg, tipo, w1, w2 } = pegarDadosRotina1(objetoSelecionado)  
    const { vao, g1, g2, q, qsi1, qsi2, esfDistQuasePermanente, esfDistFrequente, esfDistRara} = pegarDadosRotina2(objetoSelecionado)
    const { input1, input2, fck, grauProtensao, numSecoes, porcentagemPerdas, valorArmaduraProtensao, resistenciaArmaduraProtensao, diametroCabo, areaArmaduraProtensao1cordoalha } = pegarInputs()
    const { fctm, fctk_inf, fct_f } = calcularFct(fck, tipo)

    const ponto1 = [0, input1 + centroide]
    const ponto2 = [vao/2, input2]
    const ponto3 = [vao, input1 + centroide]

    const n = input2
    const m = input1 + centroide

    const resFct = calcularFct(fck, tipo) 

    const posicao = calcularPosicoes(vao, numSecoes)
    const ep = calcularEp(m, n, vao, posicao, centroide) // m

    const momentoQuasePermanente = calcularMomento(esfDistQuasePermanente, vao, numSecoes)
    const momentoFrequente = calcularMomento(esfDistFrequente, vao, numSecoes)
    const momentoRara = calcularMomento(esfDistRara, vao, numSecoes)

    const secoesDimensionadas = dimensionarSecoes(momentoQuasePermanente, momentoFrequente, momentoRara, w1, w2, ep, area, resFct, tipo, grauProtensao, numSecoes, posicao, m, n)
    const {forcaProtensaoFinalCalculo, forcaProtensaoInicialCalculo} = calcularForcasProtensaoCalculo(grauProtensao, secoesDimensionadas, porcentagemPerdas) //Cálculo
    const [numeroCordoalhas,sigmapi] = calcularNumeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, forcaProtensaoInicialCalculo)

    const
    {forcaProtencaoInicialProjeto // N * m
    ,forcaProtensaoFinalProjeto // N * m
    } = calcularForcaProtensaoProjeto(numeroCordoalhas, areaArmaduraProtensao1cordoalha, sigmapi, porcentagemPerdas) 
    
    let dados = salvarResultados( grauProtensao, forcaProtensaoFinalCalculo, forcaProtensaoFinalProjeto, forcaProtensaoInicialCalculo, forcaProtencaoInicialProjeto, resistenciaArmaduraProtensao, diametroCabo, numeroCordoalhas, objetoSelecionado, secoesDimensionadas, areaArmaduraProtensao1cordoalha, fck, porcentagemPerdas  )
    resultados = dados
}
    

export { main }   



// //--------------------------------------------------------------------------------------------------------------------------------------

