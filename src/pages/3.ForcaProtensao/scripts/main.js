//Variaveis que precisam ser acessadas em mais de uma função

let PropriedadesDasFiguras = []
let figuras = []
let opcoesSalvas = document.getElementById('opcoes-salvas')
let dadosFinal = []

//Descobrir o index do input selecionado
let indexSelecionado

let canvas1 = document.getElementById('canvas1')
let canvas2 = document.getElementById('canvas2')
let canvas3 = document.getElementById('canvas3')

let ctx1 = canvas1.getContext('2d')
let ctx2 = canvas2.getContext('2d')
let ctx3 = canvas3.getContext('2d')

//Pegando os inputs
let inputep1 = document.getElementById('inputep1')
let inputep2 = document.getElementById('inputep2')

//Variaveis para representar: 1- distância entre a borda superior e o centroide 2- distância entre a borda inferior e centroide
let disYAcimaDoCentroide
let disYAbaixoDoCentroide

//Pegando apenas o centroide das figuras
let centroide

//Propriedades para fazer os desenhos secundários (canvas 2 e canvas 3)
let altura
let base
let margem

//A largura é a maior dimenssão horizontal da seção transversal
let largura

//Variavis que determinam o tamanho do retângulo que representa a viga (desenho 1)
let inicialEmX = 10
let inicialEmY = 10
let finalEmX = 590
let finalEmY = 110

//Variável para determinar a proporção entre a imagem em pixel e o tamanho em cm do desenho 1
let proporcaoY

//Pegar o grau de protensao
let grauProtensao

//--------------------------------------------------------------------------------------------------------------------------------------
// Arrumando a escala do gráfico 1
let displayWidth = 600;
let displayHeight = 150;
let scale = 1;
canvas1.style.width = displayWidth + 'px';
canvas1.style.height = displayHeight + 'px';
canvas1.width = displayWidth * scale;
canvas1.height = displayHeight * scale;

//--------------------------------------------------------------------------------------------------------------------------------------

// Arrumando a escala do gráfico 2
let displayWidth2 = 300;
let displayHeight2 = 300;
let scale2 = 1;
canvas2.style.width = displayWidth2 + 'px';
canvas2.style.height = displayHeight2 + 'px';
canvas2.width = displayWidth2 * scale2;
canvas2.height = displayHeight2 * scale2;

//Escala do desenho 2 e 3 em função da altura e largura
let escala

//--------------------------------------------------------------------------------------------------------------------------------------

// Arrumando a escala do gráfico 3
let displayWidth3 = 300;
let displayHeight3 = 300;
let scale3 = 1;
canvas3.style.width = displayWidth3 + 'px';
canvas3.style.height = displayHeight3 + 'px';
canvas3.width = displayWidth3 * scale3;
canvas3.height = displayHeight3 * scale3;

//--------------------------------------------------------------------------------------------------------------------------------------


window.addEventListener('DOMContentLoaded', () => {
    carregarElementos()

})

function carregarElementos(){

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

    dadosSalvosdaRotina2.forEach((element, index)=>{
        figuras.push(element.Figura)
    })

    for(let i = 0; i < figuras.length; i++){
        PropriedadesDasFiguras.push(dadosSalvosdaRotina1[Number(figuras[i])-1])
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
//Modifica a tag canvas sempre que há uma troca nas opções que devem ser selecionadas

let opcoesSalvasValue

opcoesSalvas.addEventListener('change', modificarCanvas)

function modificarCanvas(){

    opcoesSalvasValue = document.getElementById('opcoes-salvas').value
    indexSelecionado = this.value

    apagarCanvas()
    mudarRange()
    desenharDesenhoInicial()
    desenharPontosIniciais()
    desenharPontoIntermediario()
    zerarInputs()
    desenhoInicial2e3()

    //Centro Geométrico do desenho 2 e 3
    CGDesenho2()
    CGDesenho3()

    //Escala da altura do desenho 2
    escalaAlturaDesenho2()

    //Escrevendo o texto da altura do desenho 2
    escreverTextoAltura2()

    //Desenhando a armadura de protensão no desenho 2 e 3
    desenharArmaduraProtensao2()
    desenharArmaduraProtensao3()

}

function apagarCanvas(){
    let pegarCanvas = document.querySelectorAll('canvas')
    pegarCanvas.forEach((element)=>{
        let context = element.getContext('2d')
        context.clearRect(0,0,element.width,element.height)
    })
}

function mudarRange(){

    disYAcimaDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['dados']['h']) - Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])
    disYAbaixoDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])

    getInputsRange = [document.getElementById('inputep1'),document.getElementById('inputep2')]
    getInputsRange[0].max = Math.floor(disYAcimaDoCentroide)
    getInputsRange[1].max = Math.floor(disYAbaixoDoCentroide)

}

function desenharDesenhoInicial(){

    ctx1.beginPath()
    ctx1.lineWidth = 2
    ctx1.strokeStyle ='black'
    ctx1.setLineDash([])

    ctx1.moveTo(inicialEmX,inicialEmY)
    ctx1.lineTo(inicialEmX,finalEmY)
    ctx1.lineTo(finalEmX,finalEmY)
    ctx1.lineTo(finalEmX,inicialEmX)
    ctx1.lineTo(inicialEmX,inicialEmY)
    ctx1.stroke()

    relacaoEntreCentroideEAlturaTotal = Number(PropriedadesDasFiguras[indexSelecionado]['centroide'])/Number(PropriedadesDasFiguras[indexSelecionado]['dados']['h'])
    centroide = Number(PropriedadesDasFiguras[indexSelecionado]['centroide'])

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

function desenharPontosIniciais(){
    ctx1.beginPath()
    ctx1.fillStyle ='red'
    ctx1.arc(inicialEmX, finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal), 5, 0, Math.PI * 2, true)
    ctx1.arc(finalEmX, finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal), 5, 0, Math.PI * 2, true)
    ctx1.fill()

}

function desenharPontoIntermediario(){

    disYAcimaDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['dados']['h']) - Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])
    disYAbaixoDoCentroide = Number(PropriedadesDasFiguras[opcoesSalvasValue]['centroide'])

    proporcaoY = (finalEmY - inicialEmY)/Number(PropriedadesDasFiguras[opcoesSalvasValue]['dados']['h'])

    ctx1.beginPath()
    ctx1.fillStyle ='red'
    ctx1.arc((inicialEmX + finalEmX)/2, finalEmY, 5, 0, Math.PI * 2, true)
    ctx1.fill()
}

function zerarInputs(){
    inputep1.value = 0
    inputep2.value = 0
}

function desenhoInicial2e3(){
    if(PropriedadesDasFiguras[indexSelecionado].tipo == "Retangular"){

        altura = PropriedadesDasFiguras[indexSelecionado].dados.h
        base = PropriedadesDasFiguras[indexSelecionado].dados.b
        largura = base
        margem = 50

        if(altura >= base){
            escala = (displayHeight2 - 2 * margem) / altura
        }else{
            escala = (displayHeight2 - 2 * margem) / base
        }
        //Desenhar a seção Retangular no canvas 2 e 3
        desenharRetangulo2()
        desenharRetangulo3()

    }
}

//Centro Geométrico do desenho 2
function CGDesenho2(){
    ctx2.beginPath()
    ctx2.lineWidth = 2
    ctx2.strokeStyle ='grey'
    ctx2.setLineDash([])
    ctx2.moveTo((margem + (base * escala)/2) - 10 , margem + ((altura - centroide) * escala))
    ctx2.lineTo((margem + (base * escala)/2) + 10, margem + ((altura - centroide) * escala))
    ctx2.moveTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala) - 10)
    ctx2.lineTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala)  + 10)
    ctx2.stroke()
}

//Centro Geométrico do desenho 3
function CGDesenho3(){
    ctx3.beginPath()
    ctx3.lineWidth = 2
    ctx3.strokeStyle ='grey'
    ctx3.setLineDash([])
    ctx3.moveTo((margem + (base * escala)/2) - 10 , margem + ((altura - centroide) * escala))
    ctx3.lineTo((margem + (base * escala)/2) + 10, margem + ((altura - centroide) * escala))
    ctx3.moveTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala) - 10)
    ctx3.lineTo((margem + (base * escala)/2), margem + ((altura - centroide) * escala)  + 10)
    ctx3.stroke()
}

function escalaAlturaDesenho2(){
    ctx2.beginPath()
    ctx2.lineWidth = 2
    ctx2.strokeStyle ='blue'
    ctx2.setLineDash([])
    ctx2.moveTo(margem/2 - 5, margem)
    ctx2.lineTo(margem/2 + 5, margem)
    ctx2.moveTo(margem/2, margem)
    ctx2.lineTo(margem/2, margem + altura * escala)
    ctx2.moveTo(margem/2 - 5, margem + altura * escala)
    ctx2.lineTo(margem/2 + 5, margem + altura * escala)
    ctx2.stroke()
}

function desenharRetangulo2(){
    ctx2.beginPath()
    ctx2.lineWidth = 2
    ctx2.strokeStyle ='black'
    ctx2.setLineDash([])
    ctx2.moveTo(margem, margem)
    ctx2.lineTo(margem, margem + (altura * escala))
    ctx2.lineTo(margem + (base * escala), margem + (altura * escala))
    ctx2.lineTo(margem + (base * escala), margem)
    ctx2.lineTo(margem, margem)
    ctx2.stroke()
}

function escreverTextoAltura2(){
    ctx2.font = "12px Arial";
    ctx2.beginPath()
    ctx2.fillStyle ='blue'
    ctx2.fillText(altura, (margem/2) - 15, margem + (altura * escala)/2)
    ctx2.stroke()
}

function desenharRetangulo3(){
    ctx3.beginPath()
    ctx3.lineWidth = 2
    ctx3.strokeStyle ='black'
    ctx3.setLineDash([])
    ctx3.moveTo(margem, margem)
    ctx3.lineTo(margem, margem + (altura * escala))
    ctx3.lineTo(margem + (base * escala), margem + (altura * escala))
    ctx3.lineTo(margem + (base * escala), margem)
    ctx3.lineTo(margem, margem)
    ctx3.stroke()
}

function desenharArmaduraProtensao2(){
    ctx2.beginPath()
    ctx2.fillStyle ='red'
    ctx2.arc(margem + (base * escala)/2, margem + (altura * escala)/2 , 5, 0, Math.PI * 2, true)
    ctx2.fill()
}

function desenharArmaduraProtensao3(){
    ctx3.beginPath()
    ctx3.fillStyle ='red'
    ctx3.arc(margem + (base * escala)/2, margem + (altura * escala) , 5, 0, Math.PI * 2, true)
    ctx3.fill()
}

//--------------------------------------------------------------------------------------------------------------------------------------

inputep1.addEventListener('change', changeInputs)
inputep2.addEventListener('change', changeInputs)

function changeInputs(){
    //Aoagar tudo o que há no canvas 1,2 e 3
    apagarCanvas()
    //Desenhar a seção no canvas 1 (desenho principal)
    desenharDesenhoInicial()
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

function novoPontoExtremo(){
    ctx1.beginPath()
    ctx1.fillStyle ='red'
    ctx1.arc(inicialEmX , finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal) - ((Number(inputep1.value) * proporcaoY))  , 5, 0, Math.PI * 2, true)
    ctx1.arc(finalEmX , finalEmY - ((finalEmY - inicialEmY) * relacaoEntreCentroideEAlturaTotal) - ((Number(inputep1.value) * proporcaoY))  , 5, 0, Math.PI * 2, true)
    ctx1.fill()
}

function novoPontoIntermediario(){
    ctx1.beginPath()
    ctx1.fillStyle ='red'
    ctx1.arc((inicialEmX + finalEmX)/2 , finalEmY - ((Number(inputep2.value) * proporcaoY))  , 5, 0, Math.PI * 2, true)
    ctx1.fill()
}

function novoPontoExtremoDesenho2(){
    ctx2.beginPath()
    ctx2.fillStyle ='red'
    ctx2.arc(margem + (base * escala)/2, (displayHeight2 - margem) - ((Number(inputep1.value) + disYAbaixoDoCentroide)  * escala) , 5, 0, Math.PI * 2, true)
    ctx2.fill()
}

function novoPontoCentroDesenho3(){
    ctx3.beginPath()
    ctx3.fillStyle ='red'
    ctx3.arc(margem + (base * escala)/2, (displayHeight3 - margem) - (Number(inputep2.value) * escala) , 5, 0, Math.PI * 2, true)
    ctx3.fill()
}

function desenharCotaCG2(){
    ctx2.beginPath()
    ctx2.lineWidth = 2
    ctx2.strokeStyle ='grey'
    ctx2.setLineDash([])
    ctx2.moveTo(3*margem/2 + (largura * escala)  - 5, displayHeight2 - margem)
    ctx2.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight2 - margem)
    ctx2.moveTo(3*margem/2 + (largura * escala), displayHeight2 - margem)
    ctx2.lineTo(3*margem/2 + (largura * escala), displayHeight2 - margem - disYAbaixoDoCentroide * escala)
    ctx2.moveTo(3*margem/2 + (largura * escala) - 5, displayHeight2 - margem - disYAbaixoDoCentroide * escala)
    ctx2.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight2 - margem - disYAbaixoDoCentroide * escala)
    ctx2.stroke()
}

function escreverCotaCG2(){
    ctx2.beginPath()
    ctx2.fillStyle ='grey'
    ctx2.fillText(Number(disYAbaixoDoCentroide).toFixed(0), 3*margem/2 + (largura * escala)  - 15, displayHeight2 - margem - (disYAbaixoDoCentroide * escala)/2)
}

function desenharCotaCaboProtensao2(){
    ctx2.beginPath()
    ctx2.lineWidth = 2
    ctx2.strokeStyle = 'red'
    ctx2.setLineDash([])
    ctx2.moveTo(3 * margem / 2 + (largura * escala), displayHeight2 - margem - disYAbaixoDoCentroide * escala)
    ctx2.lineTo(3 * margem / 2 + (largura * escala), displayHeight2 - margem - (Number(inputep1.value) + disYAbaixoDoCentroide) * escala)
    ctx2.moveTo(3 * margem / 2 + (largura * escala) - 5, displayHeight2 - margem - (Number(inputep1.value) + disYAbaixoDoCentroide) * escala)
    ctx2.lineTo(3 * margem / 2 + (largura * escala) + 5, displayHeight2 - margem - (Number(inputep1.value) + disYAbaixoDoCentroide) * escala)
    ctx2.stroke()
}

function escreverCotaCaboProtensao2(){
    ctx2.beginPath()
    ctx2.fillStyle = 'red'
    ctx2.fillText(Number(inputep1.value).toFixed(0), 3 * margem / 2 + (largura * escala)  - 15, displayHeight2 - margem - (Number(inputep1.value)/2 + disYAbaixoDoCentroide) * escala)
}

function desenharCotaCaboProtensao3(){
    ctx3.beginPath()
    ctx3.lineWidth = 2
    ctx3.strokeStyle ='red'
    ctx3.setLineDash([])
    ctx3.moveTo(3*margem/2 + (largura * escala)  - 5, displayHeight3 - margem)
    ctx3.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight3 - margem)
    ctx3.moveTo(3*margem/2 + (largura * escala), displayHeight3 - margem)
    ctx3.lineTo(3*margem/2 + (largura * escala), displayHeight3 - margem - Number(inputep2.value) * escala)
    ctx3.moveTo(3*margem/2 + (largura * escala) - 5, displayHeight3 - margem - Number(inputep2.value) * escala)
    ctx3.lineTo(3*margem/2 + (largura * escala) + 5, displayHeight3 - margem - Number(inputep2.value) * escala)
    ctx3.stroke()
}

function escreverCotaCaboProtensao3(){
    ctx3.font = "12px Arial";
    ctx3.beginPath()
    ctx3.fillStyle = 'red'
    ctx3.fillText(Number(inputep2.value).toFixed(0), 3 * margem / 2 + (largura * escala)  - 15, displayHeight3 - margem - (Number(inputep2.value)/2) * escala)
}




//--------------------------------------------------------------------------------------------------------------------------------------


let w1, w2, tipo, area, g1, g2, g, q, esfDistQuasePermanente, esfDistFrequente,esfDistRara, objRotina3, resultadosDaRotina3 = [], resFct, fct_f, contador = 0 //Apenas quando nao tem dados salvos --> depois tem que alterar a lógica
let areaConvertida, w1Convertido, w2Convertido, completaELSDSorteado = []

//Pegar o esforço distribuido em que a viga é sujeita nas combinacoes quase permanente e frequente

let btnDimFinal = document.getElementById('btnDimFinal')
btnDimFinal.addEventListener('click', dimensionarForcaFinal)

function dimensionarForcaFinal(){

    //Definindo o grau de protensão --> Completa ou Limitada
    grauProtensao = document.getElementById('grau-protensao').value


    //Pegar o vao que eu quero dimensionar indexSelecionado
    let vao = dadosSalvosdaRotina2[indexSelecionado]['Vao']
    let secoes = Number(document.getElementById('subdivisoes-viga').value)
    let dadosCombinacoes = dadosSalvosdaRotina2[indexSelecionado]['dados']
    console.log(dadosSalvosdaRotina2)

    let ponto1 = [0, Number(inputep1.value) + centroide]
    let ponto2 = [vao/2,Number(inputep2.value)]
    let ponto3 = [vao, Number(inputep1.value) + centroide]

    let n = Number(inputep2.value)
    let m = Number(inputep1.value) + centroide

    esfDistQuasePermanente = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['quase-permanente']['cargaDistribuidaMaxima']
    esfDistFrequente = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['frequente']['cargaDistribuidaMaxima']
    esfDistRara = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['rara']['cargaDistribuidaMaxima']



    w1 = PropriedadesDasFiguras[opcoesSalvasValue]['w1']
    w2 = PropriedadesDasFiguras[opcoesSalvasValue]['w2']
    w1Convertido = w1/1000000 //converção de cm³ para m³
    w2Convertido = w2/1000000 //converção de cm³ para m³
    area = PropriedadesDasFiguras[opcoesSalvasValue]['area'] //
    areaConvertida = area/10000 //converção de cm² para m²
    tipo = PropriedadesDasFiguras[opcoesSalvasValue]['tipo']

    resFct = calcularFct() // depende do tipo
    fct_f = Number(resFct['fct_f']) * 1000


    //dadosSalvosdaRotina2[opcoesSalvasValue]
    resultadosDaRotina3[contador] = new Array()
    completaELSDSorteado[contador] = new Array()

    for(let i = 0; i < secoes; i++){

        let posicao = (i * vao)/(secoes - 1)
        let equacaoDoCaboDeProtensao = ((-4*n + 4*m)/((vao**2)/100))*((posicao**2)/100) + (((4*n - 4*m)/(vao/100)) * (posicao/100)) + m

        let momentoFrequente = (esfDistFrequente * vao * posicao/2) + (- esfDistFrequente * posicao * posicao/2)
        let momentoQP = (esfDistQuasePermanente * vao * posicao/2) + (- esfDistQuasePermanente * posicao * posicao/2)
        let momentoRara = (esfDistRara * vao * posicao/2) + (- esfDistRara * posicao * posicao/2)

        let ep = (- centroide + equacaoDoCaboDeProtensao)/100
       // let momentox = (combinacoes['ultima']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
       // vao é tudo e distancia real é a posicao

       objRotina3 = {
            'X': posicao,
            'Vao':vao,
            'CaboY': equacaoDoCaboDeProtensao,
            'ep': ep, //Excentricidade em metros
            'momentoQP': momentoQP,
            'momentoFrequente': momentoFrequente,
            'completa-ELS-D': momentoFrequente/(((1/areaConvertida) + (ep/w1Convertido)) * w1Convertido),
            'completa-ELS-F': ((momentoRara/w1Convertido) + fct_f)/((1/areaConvertida) + (ep/w1Convertido)),
            'limitada-ELS-D': momentoQP/(((1/areaConvertida) + (ep/w1Convertido)) * w1Convertido),
            'limitada-ELS-F': ((momentoFrequente/w1Convertido) + fct_f)/((1/areaConvertida) + (ep/w1Convertido)),
            'protensao': grauProtensao,
            'posicaoCaboProtensao':{
                inicio: m,
                meioVao: n
            },
            'dadosCombinacoes':dadosCombinacoes
       }

        resultadosDaRotina3[contador].push(objRotina3)
        completaELSDSorteado[contador] = [...resultadosDaRotina3[contador]]
        completaELSDSorteado[contador] = completaELSDSorteado[contador].sort((c1, c2) => (c1['completa-ELS-D'] > c2['completa-ELS-D']) ? 1 : (c1['completa-ELS-D'] < c2['completa-ELS-D']) ? -1 : 0)
    }

    salvarResultados(contador)
    contador++

}

function calcularFct(){
    let inputFckValue = document.getElementById('fck').value

    let fctm = 0.3 * (inputFckValue)**(2/3)
    let fctk_inf = 0.7 * fctm
    let fct_f

    switch(tipo){
        case 'Retangular':
        fct_f = 1.5 * fctk_inf
        break
        case 'I':
        fct_f = 1.3 * fctk_inf //Depois trocar para 1.3
        break
        case 'T':
        fct_f = 1.2 * fctk_inf
        break
        default:
        console.log('Houve um erro ao definir o tipo de estrutura')
    }

    let resultadoCalcularFct = {
        'fctm': fctm,
        'fctk_inf': fctk_inf,
        'fct_f': fct_f
    }

    return resultadoCalcularFct

}

let celulas, pegarUltimoRegistro

function salvarResultados(contador){
    resTBody = document.getElementById('res-tbody')

    //Criando a linha inserindo no DOM
    let createTr = document.createElement('tr')
    resTBody.appendChild(createTr)
    createTr.classList.add('linha'+(contador+1))

    //Criando 9 células para os registros da seção 'Salvar'
    for(let i = 0; i<9; i++){
        let createTd = document.createElement('td')
        createTr.appendChild(createTd)
        createTd.classList.add('elemento' + (i+1))
    }

    celulas = document.querySelector('.linha'+(contador + 1)).children
    pegarUltimoRegistro = resultadosDaRotina3[resultadosDaRotina3.length -1]

    celulas[0].innerText = contador
    celulas[1].innerText = pegarUltimoRegistro[0]['protensao']

    let registros = []

    if(pegarUltimoRegistro[0]['protensao'] == 'limitada'){
      for(let i = 0; i<pegarUltimoRegistro.length; i++){
        registros.push(pegarUltimoRegistro[i]['limitada-ELS-D'])
        registros.push(pegarUltimoRegistro[i]['limitada-ELS-F'])
      }
      var registroMinimo = Math.min(...registros)
      celulas[2].innerText = registroMinimo.toFixed(2) + ' kN'

    }
    if(pegarUltimoRegistro[0]['protensao'] == 'completa'){
      for(let i = 0; i<pegarUltimoRegistro.length; i++){
        registros.push(pegarUltimoRegistro[i]['completa-ELS-D'])
        registros.push(pegarUltimoRegistro[i]['completa-ELS-F'])
      }

      var registroMinimo = Math.min(...registros)
      celulas[2].innerText = registroMinimo.toFixed(2) + ' kN'
    }

    let perdasEmPorcentagem = Number(document.getElementById('inputPerdas').value)

    let pZero = registroMinimo/(1-(perdasEmPorcentagem/100))
    celulas[4].innerText = pZero.toFixed(2) + ' kN'

    //Pegando o input do tipo de armadura de protensão
    let valorArmaduraProtensao = document.getElementById('armadura-protensao').value
    let resistenciaArmaduraProtensao = valorArmaduraProtensao.slice(0,3)
    let diametrocabo = valorArmaduraProtensao.slice(4,8)
    let areaArmaduraProtensao1cordoalha = Number(valorArmaduraProtensao.slice(9))

    celulas[6].innerText = 'CP ' + resistenciaArmaduraProtensao + ' RB ' + diametrocabo
    
    let numCordoalhas = numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero)[0]
    let sigmapi = numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero)[1]

    let numCordoalhasArredondado = Math.ceil(numCordoalhas)

    celulas[7].innerText = numCordoalhasArredondado
    celulas[8].innerHTML = `<select numero='${contador+1}'><option selected value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>`

    celulas[3].innerText = -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * (sigmapi/1000) * (1-(perdasEmPorcentagem/100))).toFixed(2) + ' kN'
    celulas[5].innerText = -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * sigmapi/1000).toFixed(2) + ' kN'

    let numCabos = document.querySelector(`[numero="${(contador+1)}"]`).value
    let fck = document.getElementById('fck').value

    dadosFinal.push({
        id: contador,
        areaArmaduraProtensao1cordoalha: areaArmaduraProtensao1cordoalha,
        tipoProtensao: pegarUltimoRegistro[0]['protensao'],
        pInfCalc: registroMinimo,
        PInfProj: -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * (sigmapi/1000) * (1-(perdasEmPorcentagem/100))),
        pIniCalc: pZero,
        pIniProj: -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * sigmapi/1000),
        tipoArmadura: 'CP ' + resistenciaArmaduraProtensao + ' RB ' + diametrocabo,
        numCordoalhasArredondado: numCordoalhasArredondado,
        numCabos: numCabos,
        secoes: resultadosDaRotina3[contador],
        Ap: numCabos * numCordoalhasArredondado * areaArmaduraProtensao1cordoalha, //Ver a unidade
        fck: fck,
        rotina2: dadosSalvosdaRotina2[indexSelecionado]
        
    })
    
    enviarDados(dadosFinal)

    celulas[8].addEventListener('change',(element)=>{
        let el = element.target
        let novoNumeroCabos = el.value
        let linha = el.getAttribute('numero')

        let PegarTd = [document.querySelector(`[class= "linha${(linha)}"]>[class="elemento4"]`), document.querySelector(`[class= "linha${(linha)}"]>[class="elemento6"]`),document.querySelector(`[class= "linha${(linha)}"]>[class="elemento8"]`)]

        let TdForcaInfProjeto = PegarTd[0]
        let TdForcaIniProjeto = PegarTd[1]
        let TdNovoNumeroCordoalhas = PegarTd[2]

        let novoResultado = numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero, novoNumeroCabos)
        let novoNumCordoalhas = novoResultado[0]
        let novoNumCordoalhasArredondado = Math.ceil(novoNumCordoalhas)
        let novoSigmapi = novoResultado[1]

        TdNovoNumeroCordoalhas.innerText = novoNumCordoalhasArredondado

        TdForcaInfProjeto.innerText = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * (novoSigmapi/1000) * (1-(perdasEmPorcentagem/100))).toFixed(2) + ' kN'
        TdForcaIniProjeto.innerText = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * sigmapi/1000).toFixed(2) + ' kN'

        dadosFinal[(linha-1)]['PInfProj'] = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * (novoSigmapi/1000) * (1-(perdasEmPorcentagem/100)))
        dadosFinal[(linha-1)]['pIniProj'] = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * sigmapi/1000)
        dadosFinal[(linha-1)]['numCabos'] = novoNumeroCabos
        dadosFinal[(linha-1)]['numCordoalhasArredondado'] = novoNumCordoalhasArredondado
        //Ainda não foi testado
        dadosFinal[(linha-1)]['Ap'] = novoNumCordoalhasArredondado * novoNumeroCabos * dadosFinal[(linha-1)]['areaArmaduraProtensao1cordoalha']

        enviarDados(dadosFinal)
    })
}

function numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero, pegarNumeroCabos = 1){
    let sigmapi = 0.82 * 0.9 * Number(resistenciaArmaduraProtensao) * 10
    let areaAcoProtendido = Number(-pZero * 10)/(sigmapi) //em cm²
    let numeroCordoalhas = (areaAcoProtendido/(Number(areaArmaduraProtensao1cordoalha)/100))/pegarNumeroCabos
    
    return [numeroCordoalhas,sigmapi]
}

function enviarDados(dados){
    window.api.dadosRotina3(dados)
}

//Rotina para verificar se existem dados prévios

function adicionarLinhasColunas(number){
    resTBody = document.getElementById('res-tbody')

    for(let i = 0; i<number; i++){
    //Criando a linha inserindo no DOM
    let createTr = document.createElement('tr')
    resTBody.appendChild(createTr)
    createTr.classList.add('linha'+(Number(contador)+1))

    //Criando 9 células para os registros da seção 'Salvar'
    for(let j = 0; j<9; j++){
        let createTd = document.createElement('td')
        createTr.appendChild(createTd)
        createTd.classList.add('elemento' + (j+1))
    }

    pegarTrTd(contador+1,1).innerText = dadosSalvosdaRotina3[contador]['id']
    pegarTrTd(contador+1,2).innerText = dadosSalvosdaRotina3[contador]['tipoProtensao']
    pegarTrTd(contador+1,3).innerText = dadosSalvosdaRotina3[contador]['pInfCalc'].toFixed(2) + ' kN'
    pegarTrTd(contador+1,4).innerText = dadosSalvosdaRotina3[contador]['PInfProj'].toFixed(2) + ' kN'
    pegarTrTd(contador+1,5).innerText = dadosSalvosdaRotina3[contador]['pIniCalc'].toFixed(2) + ' kN'
    pegarTrTd(contador+1,6).innerText = dadosSalvosdaRotina3[contador]['pIniProj'].toFixed(2) + ' kN'
    pegarTrTd(contador+1,7).innerText = dadosSalvosdaRotina3[contador]['tipoArmadura']
    pegarTrTd(contador+1,8).innerText = dadosSalvosdaRotina3[contador]['numCordoalhasArredondado']
    pegarTrTd(contador+1,9).innerText = dadosSalvosdaRotina3[contador]['numCabos']

}    
}

if(typeof dadosSalvosdaRotina3 == 'object') {
    dadosFinal = dadosSalvosdaRotina3
    for (let i = 0; i < dadosSalvosdaRotina3.length; i++){
        adicionarLinhasColunas(1)
        contador++
    }
}

function pegarTrTd(n1,n2){
    let linha_celula = document.querySelector(`[class ="linha${n1}"] > [class ="elemento${n2}"]`)
    return linha_celula
}

