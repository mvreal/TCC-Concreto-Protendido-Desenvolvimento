import { desenharContornoDesenho23, pontosIniciais, apagarCanvas, pegarCanvasCtx, desenharDesenhoInicial, arrumarEscala } from "./desenho.js"
import { objeto, pegarDados } from "./functions.js"


const [inputep1, inputep2] = document.querySelectorAll('.inputep')
const btnDesenhar = document.getElementById('btnDesenhar')

window.addEventListener('DOMContentLoaded', () => {
    carregarElementos()

})

btnDesenhar.addEventListener('click', desenhar)

// inputep1.addEventListener('change', changeInputs)
// inputep2.addEventListener('change', changeInputs)


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



function changeInputs(){

    const {inicialEmX, iniciamEmY, finalEmX, finalEmY} = pontosIniciais()
    const {ctx1, ctx2, ctx3} = pegarctx()
    

    //Aoagar tudo o que há no canvas 1,2 e 3
    apagarCanvas()
    //Desenhar a seção no canvas 1 (desenho principal)
    desenharDesenhoInicial(inicialEmX, iniciamEmY, finalEmX, finalEmY, ctx1)
    //Desenhar a seção transversal no canvas 2 e 3
    desenhoInicial2e3()
    //Desenhar o ponto vermelho referente a posição do cabo de protenção na extremidade da viga
    novoPontoExtremo()
    //Desenhar o ponto vermelho referente a posição do cabo de protenção no centro da seção longitudinal
    novoPontoIntermediario()
    //Escala da altura do desenho 2
    escalaAlturaDesenho2()
    //Escrevendo o texto da altura do desenho 2
    escreverTextoAltura2()

    //Pontos vermelhos do desenho 2 e 3
    novoPontoExtremoDesenho2()
    novoPontoCentroDesenho3()

    //Centro Geometrico do Denhenho 2 e 3
    CGDesenho2()
    CGDesenho3()

    //Desenhando a cota do centro geométrico do desenho 2 e 3
    desenharCotaCG2()

    //Escrever a cota do centro geométrico para o desenho 2
    escreverCotaCG2()

    //Desenhar a cota do cabo de protensao para o desenho 2
    desenharCotaCaboProtensao2()

    //Escrevendo a cota do cabo de Prontensão para o desenho 2
    escreverCotaCaboProtensao2()

    //desenhando a cota do cabo de protensao do desenho 2
    desenharCotaCaboProtensao3()

    //Escrever o texto da referente a cota do cabo de protenção do desenho 3
    escreverCotaCaboProtensao3()

}

function desenhar(){

    

    const objetoSelecionado = objeto()
    const {inicialEmX, inicialEmY, finalEmX, finalEmY} = pontosIniciais()

    arrumarEscala()
    const {canvas1, canvas2, canvas3, ctx1, ctx2, ctx3} = pegarCanvasCtx()
    const {tipo, dados, centroide} = pegarDados(objetoSelecionado)
    const relacaoEntreCentroideEAlturaTotal = centroide/dados.h

    apagarCanvas()
    desenharDesenhoInicial(inicialEmX, inicialEmY, finalEmX, finalEmY, ctx1, dados, centroide)
    desenharContornoDesenho23(tipo, dados, canvas2, canvas3)

}

