import { calcularMomentoFletor, fpyk, fpyd } from "../../../scripts/functions.js"
import { calcularfyd, verificarLinhaNeutra, armaduraTracaoAtoProtensao, verificarTensoesTracao, calcularLinhaNeutra, bhaskara, pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4, pegarDadosRotina5 } from "./functions.js"

function main(event){
  const index = document.getElementById('idSelect').value
  const dlinha = Number(document.getElementById('distanciaInferior').value)

  const {areaConcreto, centroide, w1, w2, ixg, tipo, h} = pegarDadosRotina1(index)
  const {psi1, psi2, g1, g2, q, gamag1, gamag2, gamaq} = pegarDadosRotina2(index)
  const {fck, Ap, ep, vao, secoes, tipoProtensao, fptk, dlinhaProtensao} = pegarDadosRotina3(index)
  const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao} = pegarDadosRotina4(index)
  const {indexRotina5, limiteInferiorc1, limiteInferiorc2, limiteSuperiorc1, limiteSuperiorc2, sigmaInferiorc1, sigmaInferiorc2, sigmaSuperiorc1, sigmaSuperiorc2, sigmac1,
  sigmac2} = pegarDadosRotina5(index)

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
  const Mdmax = Math.max(...momentoProjetoELU)
  const sigmacd = Number((fck * 0.85) / 1.4)

  // Por padrão, quando for necessário armadura na região superior, a distância entre essa armadura e a borda será de 5 cm.
  
  if(verificarTensoesTracao(sigmac2) == true){
    const infoDistancias = pegarDistanciasRotina1(index)
    const distanciaBordaSuperior = infoDistancias.hasOwnProperty('bf') ? infoDistancias['bf'] : infoDistancias['b'] 
    const AsLinha = armaduraTracaoAtoProtensao(h, distanciaBordaSuperior, sigmac1, sigmac2) // em m²
    const linhaNeutra = calcularLinhaNeutra(tipo, sigmacd, fpydCalculado, Ap, ds, dp, Mdmax, index, fyd, AsLinha) // Retorna um array com tamanho 2, cada posição é uma possível raiz
  }
  


  console.log('dadosCalcularLinhaNeutra:' + tipo, sigmacd, fpydCalculado, Ap, ds, dp, Mdmax, index)

  const raiz = calcularLinhaNeutra(tipo, sigmacd, fpydCalculado, Ap, ds, dp, Mdmax, index)

  console.log(raiz)

    


    



}

export {main}