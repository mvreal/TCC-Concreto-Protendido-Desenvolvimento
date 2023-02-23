import { calcularMomentoFletor, fpyk, fpyd } from "../../../scripts/functions.js"
import { calcularLinhaNeutra, bhaskara, pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4, pegarDadosRotina5 } from "./functions.js"

function main(event){
    const index = document.getElementById('idSelect'). value
    const dlinha = Number(document.getElementById('distanciaInferior').value)

    const {areaConcreto, centroide, w1, w2, ixg, tipo, h} = pegarDadosRotina1(index)
    const {psi1, psi2, g1, g2, q, gamag1, gamag2, gamaq} = pegarDadosRotina2(index)
    const {fck, Ap, ep, vao, secoes, tipoProtensao, fptk, dlinhaProtensao} = pegarDadosRotina3(index)
    const {perdaAtrito, perdaAncoragem, perdaEncurtamento, perdaFinal, dataProtensao} = pegarDadosRotina4(index)
    const {indexRotina5, limiteInferiorc1, limiteInferiorc2, limiteSuperiorc1, limiteSuperiorc2, sigmaInferiorc1, sigmaInferiorc2, sigmaSuperiorc1, sigmaSuperiorc2} = pegarDadosRotina5(index)

  //  if(limite)
    const fpydCalculado = fpyd(fpyk(fptk)) 

    //ds = distância entre a face superior e a armadura passiva
    const ds = h - dlinha

    //dp = distância entre a face superior e a armadura ativa
    const dp = h - dlinhaProtensao

    const somatorioCargas = g1 + g2 + q // Aqui está em kN
    const momentoProjeto = calcularMomentoFletor(somatorioCargas, vao, secoes)
    
    const momentoProjetoELU = momentoProjeto.map(el => 1.4 * el) //kN * m
    const Mdmax = Math.max(...momentoProjetoELU)
    const sigmacd = Number((fck * 0.85) / 1.4)

    const raiz = calcularLinhaNeutra(tipo, sigmacd, fpydCalculado, Ap, ds, dp, Mdmax)

    


    



}

export {main}