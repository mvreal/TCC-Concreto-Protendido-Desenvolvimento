import { recalcularPerimetrocm, pegarPerimetro, imprimirPerimetro,mudarOption,recalcularPerimetroPorcentagem } from "./functions.js"

const inputPorcentagemPerimetro = document.getElementById('PorcentagemPerimetro')
const pegarSelect = document.getElementById('dadosEntrada')
const perimetroAr = document.getElementById('perimetroAr')


if(typeof dadosSalvosdaRotina3[0] == 'object'){
    const perimetro = pegarPerimetro(0)
    imprimirPerimetro(perimetro)
}


pegarSelect.addEventListener('change', mudarOption)
inputPorcentagemPerimetro.addEventListener('change', recalcularPerimetrocm)
perimetroAr.addEventListener('change',recalcularPerimetroPorcentagem)


