// function modificarCanvas(){

//     const opcoesSalvasValue = document.getElementById('opcoes-salvas').value
//     const indexSelecionado = this.value

//     apagarCanvas()
//     mudarRange()
//     desenharDesenhoInicial()
//     desenharPontosIniciais()
//     desenharPontoIntermediario()
//     zerarInputs()
//     desenhoInicial2e3()

//     //Centro Geométrico do desenho 2 e 3
//     CGDesenho2()
//     CGDesenho3()

//     //Escala da altura do desenho 2
//     escalaAlturaDesenho2()

//     //Escrevendo o texto da altura do desenho 2
//     escreverTextoAltura2()

//     //Desenhando a armadura de protensão no desenho 2 e 3
//     desenharArmaduraProtensao2()
//     desenharArmaduraProtensao3()
// }

// function mudarRange(){

//     const disYAcimaDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['dados']['h']) - Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])
//     const disYAbaixoDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])

//     getInputsRange = [document.getElementById('inputep1'),document.getElementById('inputep2')]
//     getInputsRange[0].max = Math.floor(disYAcimaDoCentroide)
//     getInputsRange[1].max = Math.floor(disYAbaixoDoCentroide)
// }

function apagarCanvas(){
    let pegarCanvas = document.querySelectorAll('canvas')
    pegarCanvas.forEach((element)=>{
        let context = element.getContext('2d')
        context.clearRect(0,0,element.width,element.height)
    })
}

function pontosIniciais(){
    //Variavis que determinam o tamanho do retângulo que representa a viga (desenho 1)
    let inicialEmX = 10
    let inicialEmY = 10
    let finalEmX = 590
    let finalEmY = 110

    return {
        inicialEmX: inicialEmX,
        inicialEmY: inicialEmY,
        finalEmX: finalEmX,
        finalEmY: finalEmY
    }
}

function desenharDesenhoInicial(inicialEmX, inicialEmY, finalEmX, finalEmY, ctx1, dados, centroide){

    ctx1.beginPath()
    ctx1.lineWidth = 2
    ctx1.strokeStyle ='black'
    ctx1.setLineDash([])

    console.log(inicialEmX, inicialEmY, finalEmX, finalEmY, ctx1, dados, centroide)

    ctx1.moveTo(inicialEmX,inicialEmY)
    ctx1.lineTo(inicialEmX,finalEmY)
    ctx1.lineTo(finalEmX,finalEmY)
    ctx1.lineTo(finalEmX,inicialEmX)
    ctx1.lineTo(inicialEmX,inicialEmY)
    ctx1.stroke()

    console.log(centroide, dados, dados.h)
    const relacaoEntreCentroideEAlturaTotal = centroide/dados.h
    
    ctx1.beginPath()
    ctx1.strokeStyle ='grey'
    ctx1.setLineDash([5,5])
    ctx1.moveTo(inicialEmX, finalEmY - (finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal)
    ctx1.lineTo(finalEmX, finalEmY - (finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal)
    ctx1.stroke()

    ctx1.beginPath()
    ctx1.fillStyle ='grey'
    ctx1.fillText('C.G.',(inicialEmX + finalEmX )/2 - 8, (finalEmY - (finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal)-10)
}

function pegarctx(){
    const canvas1 = document.getElementById('canvas1')
    const canvas2 = document.getElementById('canvas2')
    const canvas3 = document.getElementById('canvas3')

    const ctx1 = canvas1.getContext('2d')
    const ctx2 = canvas2.getContext('2d')
    const ctx3 = canvas3.getContext('2d')

    return {
        ctx1: ctx1,
        ctx2: ctx2,
        ctx3: ctx3
    }
}

function arrumarEscala(){
    
const canvas1 = document.getElementById('canvas1')
const canvas2 = document.getElementById('canvas2')
const canvas3 = document.getElementById('canvas3')


// Arrumando a escala do gráfico 1
let displayWidth = 600;
let displayHeight = 150;
let scale = 1;
canvas1.style.width = displayWidth + 'px';
canvas1.style.height = displayHeight + 'px';
canvas1.width = displayWidth * scale;
canvas1.height = displayHeight * scale;

// Arrumando a escala do gráfico 2
let displayWidth2 = 300;
let displayHeight2 = 300;
let scale2 = 1;
canvas2.style.width = displayWidth2 + 'px';
canvas2.style.height = displayHeight2 + 'px';
canvas2.width = displayWidth2 * scale2;
canvas2.height = displayHeight2 * scale2;

// Arrumando a escala do gráfico 3
let displayWidth3 = 300;
let displayHeight3 = 300;
let scale3 = 1;
canvas3.style.width = displayWidth3 + 'px';
canvas3.style.height = displayHeight3 + 'px';
canvas3.width = displayWidth3 * scale3;
canvas3.height = displayHeight3 * scale3;
}

// function desenharPontosIniciais(){
//     ctx1.beginPath()
//     ctx1.fillStyle ='red'
//     ctx1.arc(inicialEmX, finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal), 5, 0, Math.PI * 2, true)
//     ctx1.arc(finalEmX, finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal), 5, 0, Math.PI * 2, true)
//     ctx1.fill()

// }

// function desenharPontoIntermediario(){

//     disYAcimaDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['dados']['h']) - Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])
//     disYAbaixoDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])

//     proporcaoY = (finalEmY - inicialEmY)/Number(PropriedadesDasFiguras[opcoesSalvasValue]['dados']['h'])

//     ctx1.beginPath()
//     ctx1.fillStyle ='red'
//     ctx1.arc((inicialEmX + finalEmX)/2, finalEmY, 5, 0, Math.PI * 2, true)
//     ctx1.fill()
// }

// function zerarInputs(){
//     inputep1.value = 0
//     inputep2.value = 0
// }

// function desenhoInicial2e3(){
//     if(PropriedadesDasFiguras[indexSelecionado].tipo == "Retangular"){

//         altura = PropriedadesDasFiguras[indexSelecionado].dados.h
//         base = PropriedadesDasFiguras[indexSelecionado].dados.b
//         largura = base
//         margem = 50

//         if(altura >= base){
//             escala = (displayHeight2 - 2 * margem) / altura
//         }else{
//             escala = (displayHeight2 - 2 * margem) / base
//         }
//         //Desenhar a seção Retangular no canvas 2 e 3
//         desenharRetangulo2()
//         desenharRetangulo3()
//     }
// }

// //Centro Geométrico do desenho 2
// function CGDesenho2(){
//     ctx2.beginPath()
//     ctx2.lineWidth = 2
//     ctx2.strokeStyle ='grey'
//     ctx2.setLineDash([])
//     ctx2.moveTo((margem + (base * escala)/2) - 10 , margem + ((altura - centroide) * escala))
//     ctx2.lineTo((margem + (base * escala)/2) + 10, margem + ((altura - centroide) * escala))
//     ctx2.moveTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala) - 10)
//     ctx2.lineTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala)  + 10)
//     ctx2.stroke()
// }

// //Centro Geométrico do desenho 3
// function CGDesenho3(){
//     ctx3.beginPath()
//     ctx3.lineWidth = 2
//     ctx3.strokeStyle ='grey'
//     ctx3.setLineDash([])
//     ctx3.moveTo((margem + (base * escala)/2) - 10 , margem + ((altura - centroide) * escala))
//     ctx3.lineTo((margem + (base * escala)/2) + 10, margem + ((altura - centroide) * escala))
//     ctx3.moveTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala) - 10)
//     ctx3.lineTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala)  + 10)
//     ctx3.stroke()
// }

// function escalaAlturaDesenho2(){
//     ctx2.beginPath()
//     ctx2.lineWidth = 2
//     ctx2.strokeStyle ='blue'
//     ctx2.setLineDash([])
//     ctx2.moveTo(margem/2 - 5, margem)
//     ctx2.lineTo(margem/2 + 5, margem)
//     ctx2.moveTo(margem/2, margem)
//     ctx2.lineTo(margem/2, margem + altura * escala)
//     ctx2.moveTo(margem/2 - 5, margem + altura * escala)
//     ctx2.lineTo(margem/2 + 5, margem + altura * escala)
//     ctx2.stroke()
// }


// function desenharRetangulo2(){
//     ctx2.beginPath()
//     ctx2.lineWidth = 2
//     ctx2.strokeStyle ='black'
//     ctx2.setLineDash([])
//     ctx2.moveTo(margem, margem)
//     ctx2.lineTo(margem, margem + (altura * escala))
//     ctx2.lineTo(margem + (base * escala), margem + (altura * escala))
//     ctx2.lineTo(margem + (base * escala), margem)
//     ctx2.lineTo(margem, margem)
//     ctx2.stroke()
// }

// function escreverTextoAltura2(){
//     ctx2.font = "12px Arial";
//     ctx2.beginPath()
//     ctx2.fillStyle ='blue'
//     ctx2.fillText(altura, (margem/2) - 15, margem + (altura * escala)/2)
//     ctx2.stroke()
// }

// function desenharRetangulo3(){
//     ctx3.beginPath()
//     ctx3.lineWidth = 2
//     ctx3.strokeStyle ='black'
//     ctx3.setLineDash([])
//     ctx3.moveTo(margem, margem)
//     ctx3.lineTo(margem, margem + (altura * escala))
//     ctx3.lineTo(margem + (base * escala), margem + (altura * escala))
//     ctx3.lineTo(margem + (base * escala), margem)
//     ctx3.lineTo(margem, margem)
//     ctx3.stroke()
// }

// function desenharArmaduraProtensao2(){
//     ctx2.beginPath()
//     ctx2.fillStyle ='red'
//     ctx2.arc(margem + (base * escala)/2, margem + (altura * escala)/2 , 5, 0, Math.PI * 2, true)
//     ctx2.fill()
// }

// function desenharArmaduraProtensao3(){
//     ctx3.beginPath()
//     ctx3.fillStyle ='red'
//     ctx3.arc(margem + (base * escala)/2, margem + (altura * escala) , 5, 0, Math.PI * 2, true)
//     ctx3.fill()
// }

// function novoPontoExtremo(){
//     ctx1.beginPath()
//     ctx1.fillStyle ='red'
//     ctx1.arc(inicialEmX , finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal) - ((Number(inputep1.value) * proporcaoY))  , 5, 0, Math.PI * 2, true)
//     ctx1.arc(finalEmX , finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal) - ((Number(inputep1.value) * proporcaoY))  , 5, 0, Math.PI * 2, true)
//     ctx1.fill()
// }

// function novoPontoIntermediario(){
//     ctx1.beginPath()
//     ctx1.fillStyle ='red'
//     ctx1.arc((inicialEmX + finalEmX)/2 , finalEmY - ((Number(inputep2.value) * proporcaoY))  , 5, 0, Math.PI * 2, true)
//     ctx1.fill()
// }

// function novoPontoExtremoDesenho2(){
//     ctx2.beginPath()
//     ctx2.fillStyle ='red'
//     ctx2.arc(margem + (base * escala)/2, (displayHeight2 - margem) - ((Number(inputep1.value) + disYAbaixoDoCentroide)  * escala) , 5, 0, Math.PI * 2, true)
//     ctx2.fill()
// }

// function novoPontoCentroDesenho3(){
//     ctx3.beginPath()
//     ctx3.fillStyle ='red'
//     ctx3.arc(margem + (base * escala)/2, (displayHeight3 - margem) - (Number(inputep2.value) * escala) , 5, 0, Math.PI * 2, true)
//     ctx3.fill()
// }

// function desenharCotaCG2(){
//     ctx2.beginPath()
//     ctx2.lineWidth = 2
//     ctx2.strokeStyle ='grey'
//     ctx2.setLineDash([])
//     ctx2.moveTo(3*margem/2 + (largura * escala)  - 5, displayHeight2 - margem)
//     ctx2.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight2 - margem)
//     ctx2.moveTo(3*margem/2 + (largura * escala), displayHeight2 - margem)
//     ctx2.lineTo(3*margem/2 + (largura * escala), displayHeight2 - margem - disYAbaixoDoCentroide * escala)
//     ctx2.moveTo(3*margem/2 + (largura * escala) - 5, displayHeight2 - margem - disYAbaixoDoCentroide * escala)
//     ctx2.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight2 - margem - disYAbaixoDoCentroide * escala)
//     ctx2.stroke()
// }

// function escreverCotaCG2(){
//     ctx2.beginPath()
//     ctx2.fillStyle ='grey'
//     ctx2.fillText(Number(disYAbaixoDoCentroide).toFixed(0), 3*margem/2 + (largura * escala)  - 15, displayHeight2 - margem - (disYAbaixoDoCentroide * escala)/2)
// }

// function desenharCotaCaboProtensao2(){
//     ctx2.beginPath()
//     ctx2.lineWidth = 2
//     ctx2.strokeStyle = 'red'
//     ctx2.setLineDash([])
//     ctx2.moveTo(3 * margem / 2 + (largura * escala), displayHeight2 - margem - disYAbaixoDoCentroide * escala)
//     ctx2.lineTo(3 * margem / 2 + (largura * escala), displayHeight2 - margem - (Number(inputep1.value) + disYAbaixoDoCentroide) * escala)
//     ctx2.moveTo(3 * margem / 2 + (largura * escala) - 5, displayHeight2 - margem - (Number(inputep1.value) + disYAbaixoDoCentroide) * escala)
//     ctx2.lineTo(3 * margem / 2 + (largura * escala) + 5, displayHeight2 - margem - (Number(inputep1.value) + disYAbaixoDoCentroide) * escala)
//     ctx2.stroke()
// }

// function escreverCotaCaboProtensao2(){
//     ctx2.beginPath()
//     ctx2.fillStyle = 'red'
//     ctx2.fillText(Number(inputep1.value).toFixed(0), 3 * margem / 2 + (largura * escala)  - 15, displayHeight2 - margem - (Number(inputep1.value)/2 + disYAbaixoDoCentroide) * escala)
// }

// function desenharCotaCaboProtensao3(){
//     ctx3.beginPath()
//     ctx3.lineWidth = 2
//     ctx3.strokeStyle ='red'
//     ctx3.setLineDash([])
//     ctx3.moveTo(3*margem/2 + (largura * escala)  - 5, displayHeight3 - margem)
//     ctx3.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight3 - margem)
//     ctx3.moveTo(3*margem/2 + (largura * escala), displayHeight3 - margem)
//     ctx3.lineTo(3*margem/2 + (largura * escala), displayHeight3 - margem - Number(inputep2.value) * escala)
//     ctx3.moveTo(3*margem/2 + (largura * escala) - 5, displayHeight3 - margem - Number(inputep2.value) * escala)
//     ctx3.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight3 - margem - Number(inputep2.value) * escala)
//     ctx3.stroke()
// }

// function escreverCotaCaboProtensao3(){
//     ctx3.font = "12px Arial";
//     ctx3.beginPath()
//     ctx3.fillStyle = 'red'
//     ctx3.fillText(Number(inputep2.value).toFixed(0), 3 * margem / 2 + (largura * escala)  - 15, displayHeight3 - margem - (Number(inputep2.value)/2) * escala)
// }

 export { pegarctx, pontosIniciais, apagarCanvas, desenharDesenhoInicial, arrumarEscala }