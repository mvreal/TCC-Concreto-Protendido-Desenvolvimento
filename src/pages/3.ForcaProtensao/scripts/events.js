import { redesenharDesenho2e3, desenharDesenho23, CGDesenho2ou3, desenharPontoIntermediario, desenharPontosIniciais, pontosIniciais, apagarCanvas, pegarCanvasCtx, desenharDesenhoInicial, arrumarEscala } from "./desenho.js"
import { adicionarFuncionalidadeRangeInput, mostrarInputs, objeto, pegarDados } from "./functions.js"
import { main } from "./main.js"


const [inputep1, inputep2] = document.querySelectorAll('.inputep')
const btnDesenhar = document.getElementById('btnDesenhar')
const select = document.getElementById('opcoes-salvas')
const btnCalcular = document.getElementById('btnDimFinal')

window.addEventListener('DOMContentLoaded', () => {
    carregarElementos()

})

btnDesenhar.addEventListener('click', desenhar)

inputep1.addEventListener('change', mudarInputs)
inputep2.addEventListener('change', mudarInputs)
select.addEventListener('change', mudarSelect)
btnCalcular.addEventListener('click', main)

function carregarElementos(){
    const opcoesSalvas = document.getElementById('opcoes-salvas')
    dadosSalvosdaRotina2.forEach((element, index)=>{
        let createOption = document.createElement('option')
        createOption.innerHTML = "Id: " + index + "; "
        + "Figura" + ": " + element["Figura"] +"; "
        + "Vão" + ": " + element["Vao"] + " m;  "
        + "g<sub>1</sub>" + ": " + element["g<sub>1</sub>"] + " kN/m;  "
        + "g<sub>2</sub>" + ": " + element["g<sub>2</sub>"] + " kN/m;  "
        + "q" + ": " + element["q"] + " kN/m;  "
        + "&#936<sub>1</sub>" + ": " + element["&#936<sub>1</sub>"] + ";  "
        + "&#936<sub>2</sub>" + ": " + element["&#936<sub>2</sub>"] + ";  "
        + "&#947<sub>g<sub>1</sub></sub>" + ": " + element["&#947<sub>g<sub>1</sub></sub>"] + ";  "
        + "&#947<sub>g<sub>2</sub></sub>" + ": " + element["&#947<sub>g<sub>2</sub></sub>"] + ";  "
        + "&#947<sub>q</sub>" + ": " + element["&#947<sub>q</sub>"] + ";  "
        opcoesSalvas.appendChild(createOption)
        createOption.value = index
    })
}

function mudarInputs(){

    const valoresInputs = [Number(inputep1.value), Number(inputep2.value)]
    
    const objetoSelecionado = objeto()
    const {inicialEmX, inicialEmY, finalEmX, finalEmY} = pontosIniciais()

    arrumarEscala()
    const {canvas1, canvas2, canvas3, ctx1, ctx2, ctx3} = pegarCanvasCtx()
    const {tipo, dados, centroide} = pegarDados(objetoSelecionado)
    const relacaoEntreCentroideEAlturaTotal = centroide/dados.h

    const disYAcimaDoCentroide = dados.h - centroide
    const disYAbaixoDoCentroide = centroide
    const proporcaoY = (finalEmY - inicialEmY) / dados.h

    apagarCanvas()
    desenharDesenhoInicial(inicialEmX, inicialEmY, finalEmX, finalEmY, ctx1, dados, centroide)
    redesenharDesenho2e3(tipo, dados, canvas2, canvas3, centroide, ctx2, ctx3, disYAcimaDoCentroide, disYAbaixoDoCentroide, valoresInputs)
    

}

function desenhar(){

    mudarSelect()
    mostrarInputs()

    const objetoSelecionado = objeto()
    const {inicialEmX, inicialEmY, finalEmX, finalEmY} = pontosIniciais()

    arrumarEscala()
    const {canvas1, canvas2, canvas3, ctx1, ctx2, ctx3} = pegarCanvasCtx()
    const {tipo, dados, centroide} = pegarDados(objetoSelecionado)
    const relacaoEntreCentroideEAlturaTotal = centroide/dados.h

    const disYAcimaDoCentroide = dados.h - centroide
    const disYAbaixoDoCentroide = centroide
    const proporcaoY = (finalEmY - inicialEmY) / dados.h

    apagarCanvas()
    desenharDesenhoInicial(inicialEmX, inicialEmY, finalEmX, finalEmY, ctx1, dados, centroide)
    desenharDesenho23(tipo, dados, canvas2, canvas3, centroide, ctx2, ctx3, disYAcimaDoCentroide, disYAbaixoDoCentroide)
    desenharPontosIniciais(inicialEmX, finalEmX, inicialEmY, finalEmY, relacaoEntreCentroideEAlturaTotal, ctx1)
    desenharPontoIntermediario(inicialEmX, inicialEmY, finalEmX, finalEmY, ctx1)
    adicionarFuncionalidadeRangeInput(disYAcimaDoCentroide, disYAbaixoDoCentroide)
    main(objetoSelecionado)
}

function mudarSelect(){
    inputep1.value = inputep1['min']
    inputep2.value = inputep2['min']
}


