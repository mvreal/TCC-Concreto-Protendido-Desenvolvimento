import { calcularMomentoFletor, fpyk, fpyd } from "../../../scripts/functions.js"
import { calcularAreaAco, calcularTaxaArmaduraTransversal, calculartaud, calcularCoeficienteCorrecao, calcularMomentoAnulaTensaoCompressao, compararTensoesEsforcoCortante, calcularTensaoConvencional, calcularEsforcoCortanteReduzidoProjeto, calcularEsforcoCortante, calcularForcaVerticalProtensao, calcularForcaNormalProtensao, calcularArmaduraLongitudinal, pegarDistanciasRotina1, calcularLinhaNeutraAlma, calcularfyd, verificarLinhaNeutra, armaduraTracaoAtoProtensao, verificarTensoesTracao, calcularLinhaNeutra, bhaskara, pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4, pegarDadosRotina5, calcularArmaduraMinimaLongitudinal } from "./functions.js"

function main(event){
  const index = document.getElementById('idSelect').value
  const dlinha = Number(document.getElementById('distanciaInferior').value)
  const diametroBainha = Number(document.getElementById('diametroBainha').value)

  const {areaConcreto, centroide, w1, w2, ixg, tipo, h} = pegarDadosRotina1(index)
  const {psi1, psi2, g1, g2, q, gamag1, gamag2, gamaq} = pegarDadosRotina2(index)
  const {fck, Ap, ep, vao, secoes, tipoProtensao, fptk, dlinhaProtensao} = pegarDadosRotina3(index)
  const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao, anguloAlfa} = pegarDadosRotina4(index)
  const {indexRotina5, limiteInferiorc1, limiteInferiorc2, limiteSuperiorc1, limiteSuperiorc2, sigmaInferiorc1, sigmaInferiorc2, sigmaSuperiorc1, sigmaSuperiorc2, sigmac1,
  sigmac2, fctmj, fctm} = pegarDadosRotina5(index)

  const fpydCalculado = fpyd(fpyk(fptk)) 

  //ds = distância entre a face superior e a armadura passiva
  const ds = h - dlinha

  const fyk = 500 // MPa
  const fyd = calcularfyd(fyk) //MPa

  //dp = distância entre a face superior e a armadura ativa
  const dp = h - dlinhaProtensao

  console.log('dados da Rotina 1: ' + areaConcreto, centroide, w1, w2, ixg, tipo, h)
  console.log('Dados da Rotina 2: ' + psi1, psi2, g1, g2, q, gamag1, gamag2, gamaq)
  console.log('Dados da Rotina 3: ' + fck, Ap, ep, vao, secoes, tipoProtensao, fptk, dlinhaProtensao)
  console.log('Dados da Rotina 4: ' + perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao)
  console.log('Dados da Rotina 5: ' + indexRotina5, limiteInferiorc1, limiteInferiorc2, limiteSuperiorc1, limiteSuperiorc2, sigmaInferiorc1, sigmaInferiorc2, sigmaSuperiorc1, sigmaSuperiorc2)

  const somatorioCargas = g1 + g2 + q // Aqui está em kN
  const momentoProjeto = calcularMomentoFletor(somatorioCargas, vao, secoes)
  
  const momentoProjetoELU = momentoProjeto.map(el => 1.4 * el) //kN * m
  const Mdmax = Math.max(...momentoProjetoELU) // kN * m
  const sigmacd = Number((fck * 0.85) / 1.4)

  // Por padrão, quando for necessário armadura na região superior, a distância entre essa armadura e a borda será de 5 cm.
  
  if(verificarTensoesTracao(sigmac2) == true){
    const infoDistancias = pegarDistanciasRotina1(index)
    const distanciaBordaSuperior = infoDistancias.hasOwnProperty('bf') ? infoDistancias['bf'] : infoDistancias['b'] 
    console.log(h, distanciaBordaSuperior, sigmac1, sigmac2)
    const AsLinha = armaduraTracaoAtoProtensao(h, distanciaBordaSuperior, sigmac1, sigmac2) // em m²
    const linhaNeutra = calcularLinhaNeutra(tipo, sigmacd, fpydCalculado, Ap, ds, dp, Mdmax, index, fyd, AsLinha) // Retorna um array com tamanho 2, cada posição é uma possível raiz
    const linhaNeutraVerificada = verificarLinhaNeutra(linhaNeutra)

    if(linhaNeutraVerificada > Number(infoDistancias['hf'])/100){
      const linhaNeutraAlma = calcularLinhaNeutraAlma(tipo, sigmacd, fpydCalculado, Ap, ds, dp, Mdmax, index, fyd, AsLinha)
      const linhaNeutraAlmaVerificada = verificarLinhaNeutra(linhaNeutraAlma)
    }

    //Essa função é apenas para viga I e T, depois deve-se deduzir a equação para viga retangular
    const armaduraLongitudinalCalculada = calcularArmaduraLongitudinal(infoDistancias['bf'], infoDistancias['bw'], infoDistancias['hf'], sigmacd, Ap, fpydCalculado, fyd) 
    const armaduraMinima = calcularArmaduraMinimaLongitudinal(fctmj, w1, infoDistancias['bf'], ds, sigmacd, fyd, areaConcreto)
    const armaduraLongitudinalAdotada = Math.max(armaduraLongitudinalCalculada, armaduraMinima) // Armadura final em m²

    //Cálculo da armadura transversal
    console.log(perdaFinal, anguloAlfa)
    const FNP = calcularForcaNormalProtensao(perdaFinal, anguloAlfa) //KN
    const FVP = calcularForcaVerticalProtensao(perdaFinal, anguloAlfa) // kN

    console.log('FNP'+ FNP)
    console.log('FVP'+ FVP)

    const esforcoCortanteCarregamentoPermanenteg1 = calcularEsforcoCortante(g1, secoes, vao) // N
    const esforcoCortanteCarregamentoPermanenteg2 = calcularEsforcoCortante(g2, secoes, vao) // N
    const esforcoCortanteCarregamentoVariavel = calcularEsforcoCortante(q, secoes, vao) // N

    console.log('esforcoCortanteCarregamentoPermanenteg1' + esforcoCortanteCarregamentoPermanenteg1)
    console.log('esforcoCortanteCarregamentoPermanenteg2' + esforcoCortanteCarregamentoPermanenteg2)
    console.log('esforcoCortanteCarregamentoVariavel' + esforcoCortanteCarregamentoVariavel)

    const esforcoCortanteReduzidoProjeto = calcularEsforcoCortanteReduzidoProjeto(gamag1, gamag2, gamaq, esforcoCortanteCarregamentoPermanenteg1, esforcoCortanteCarregamentoPermanenteg2, esforcoCortanteCarregamentoVariavel, FVP) //N

    console.log('esforcoCortanteReduzidoProjeto' + esforcoCortanteReduzidoProjeto)

    //Espessura da alma corrigida
    const bwcorrigido = (infoDistancias['bw']/100) - (diametroBainha/1000) // m
    //Verificação do esmagamento do concreto
    const fcd = fck / 1.4 //MPa
    //Tensão limite
    const tauwu = (0.27 * (1 - (fck/250)) * fcd) * 1000000 //Pa
    console.log('tauwu: ' + tauwu)
    //Tensão convencional


    //Essa parte precisa ser conferida <-------------------------------------
    const tauwd = calcularTensaoConvencional(esforcoCortanteReduzidoProjeto, bwcorrigido, ds) //ds está em cm
    console.log('tauwd: ' + tauwd)
    // ---------------------------------------------------------------------
    const msgVerificaoTensoes = compararTensoesEsforcoCortante(tauwd, ep, tauwu)

    const momentoAnulaTensaoCompressao = calcularMomentoAnulaTensaoCompressao(FNP, areaConcreto, ep, w1)
    console.log('momentoAnulaTensaoCompressao ' + momentoAnulaTensaoCompressao)
    const coeficienteCorrecao = calcularCoeficienteCorrecao(momentoAnulaTensaoCompressao, Mdmax)
    console.log('coeficienteCorrecao ' + coeficienteCorrecao)
    const tauC = (coeficienteCorrecao * fck ** (2/3)) * 1000000 // Tensão Complementar - Pa
    console.log('tauC ' + tauC)
    const taud = calculartaud(tauwd, tauC) //Pa
    console.log('taud: ' + taud)
    const taxaArmaduraTransversal = calcularTaxaArmaduraTransversal(taud, fyd, fctm)
    console.log('taxaArmaduraTransversal' + taxaArmaduraTransversal)
    const areaAco = calcularAreaAco(taxaArmaduraTransversal, infoDistancias['bw'])
    console.log('areaAço ' + areaAco)
  }  
}

export {main}