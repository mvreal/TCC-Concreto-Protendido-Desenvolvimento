let canvas= document.querySelectorAll('canvas')
let ctx = []

canvas.forEach((element,index)=>{
    ctx[index] = element.getContext('2d')
})

function desenharEsforcoCortante(combinacoesDados){

    let combinacoes = combinacoesDados[0]
    //Lembrar de transformar esse codigo todo num loop quando tiver tempo
    console.log(combinacoes)
    let escalay = 50 / combinacoes['ultima'].esforcoCortanteMaximo
    //Combinacao última Máxima 
    ctx[3].beginPath()
    ctx[3].globalAlpha = 0.4;
    ctx[3].lineWidth = 1
    ctx[3].moveTo(35,55)
    ctx[3].lineTo(35,5)
    ctx[3].moveTo(365,55)
    ctx[3].lineTo(365,105)
    ctx[3].lineTo(35,5)
    ctx[3].stroke()
    ctx[3].beginPath()
    ctx[3].fillStyle='blue';
    ctx[3].globalAlpha = 1;
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillText((combinacoes['ultima'].esforcoCortanteMaximo).toFixed(2)+' kN',15,10)
    ctx[3].fillText(((-combinacoes['ultima'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,110)

    ctx[3].stroke()

    let desl_y_EC_Ultima_Minimo = escalay * combinacoes['ultima'].esforcoCortanteMinimo
    ctx[3].beginPath()
    ctx[3].globalAlpha = 0.4;
    ctx[3].lineWidth = 1
    ctx[3].moveTo(35,55)
    ctx[3].lineTo(35,55 - desl_y_EC_Ultima_Minimo)
    ctx[3].moveTo(365,55)
    ctx[3].lineTo(365,55 + desl_y_EC_Ultima_Minimo)
    ctx[3].lineTo(35,55 - desl_y_EC_Ultima_Minimo)
    ctx[3].stroke()
    ctx[3].beginPath()
    ctx[3].globalAlpha = 1;
    ctx[3].fillStyle='red';
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillText((combinacoes['ultima'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_Ultima_Minimo)
    ctx[3].fillText(((-combinacoes['ultima'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_Ultima_Minimo)
    ctx[3].stroke()

    let desl_y_EC_Rara_Maxima = escalay * combinacoes['rara'].esforcoCortanteMaximo
    ctx[2].beginPath()
    ctx[2].globalAlpha = 0.4;
    ctx[2].lineWidth = 1
    ctx[2].moveTo(35,55)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Maxima)
    ctx[2].moveTo(365,55)
    ctx[2].lineTo(365,55 + desl_y_EC_Rara_Maxima)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Maxima)
    ctx[2].stroke()
    ctx[2].beginPath()
    ctx[2].globalAlpha = 1;
    ctx[2].fillStyle='blue';
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillText((combinacoes['rara'].esforcoCortanteMaximo).toFixed(2)+' kN',15,55 - desl_y_EC_Rara_Maxima)
    ctx[2].fillText(((-combinacoes['rara'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,60 + desl_y_EC_Rara_Maxima)
    ctx[2].stroke()

    let desl_y_EC_Rara_Minimo = escalay * combinacoes['rara'].esforcoCortanteMinimo
    ctx[2].beginPath()
    ctx[2].globalAlpha = 0.4;
    ctx[2].lineWidth = 1
    ctx[2].moveTo(35,55)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Minimo)
    ctx[2].moveTo(365,55)
    ctx[2].lineTo(365,55 + desl_y_EC_Rara_Minimo)
    ctx[2].lineTo(35,55 - desl_y_EC_Rara_Minimo)
    ctx[2].stroke()
    ctx[2].beginPath()
    ctx[2].globalAlpha = 1;
    ctx[2].fillStyle='red';
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillText((combinacoes['rara'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_Rara_Minimo)
    ctx[2].fillText(((-combinacoes['rara'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_Rara_Minimo)
    ctx[2].stroke()

    let desl_y_EC_Frequente_Maxima = escalay * combinacoes['frequente'].esforcoCortanteMaximo
    ctx[1].beginPath()
    ctx[1].globalAlpha = 0.4;
    ctx[1].lineWidth = 1
    ctx[1].moveTo(35,55)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Maxima)
    ctx[1].moveTo(365,55)
    ctx[1].lineTo(365,55 + desl_y_EC_Frequente_Maxima)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Maxima)
    ctx[1].stroke()
    ctx[1].beginPath()
    ctx[1].globalAlpha = 1;
    ctx[1].fillStyle='blue';
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillText((combinacoes['frequente'].esforcoCortanteMaximo).toFixed(2)+' kN',15,55 - desl_y_EC_Frequente_Maxima)
    ctx[1].fillText(((-combinacoes['frequente'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,60 + desl_y_EC_Frequente_Maxima)
    ctx[1].stroke()

    let desl_y_EC_Frequente_Minimo = escalay * combinacoes['frequente'].esforcoCortanteMinimo
    ctx[1].beginPath()
    ctx[1].globalAlpha = 0.4;
    ctx[1].lineWidth = 1
    ctx[1].moveTo(35,55)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Minimo)
    ctx[1].moveTo(365,55)
    ctx[1].lineTo(365,55 + desl_y_EC_Frequente_Minimo)
    ctx[1].lineTo(35,55 - desl_y_EC_Frequente_Minimo)
    ctx[1].stroke()
    ctx[1].beginPath()
    ctx[1].globalAlpha = 1;
    ctx[1].fillStyle='red';
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillText((combinacoes['frequente'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_Frequente_Minimo)
    ctx[1].fillText(((-combinacoes['frequente'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_Frequente_Minimo)
    ctx[1].stroke()

    let desl_y_EC_QuasePermanente_Maxima = escalay * combinacoes['quase-permanente'].esforcoCortanteMaximo
    ctx[0].beginPath()
    ctx[0].globalAlpha = 0.4;
    ctx[0].lineWidth = 1
    ctx[0].moveTo(35,55)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Maxima)
    ctx[0].moveTo(365,55)
    ctx[0].lineTo(365,55 + desl_y_EC_QuasePermanente_Maxima)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Maxima)
    ctx[0].stroke()
    ctx[0].beginPath()
    ctx[0].globalAlpha = 1;
    ctx[0].fillStyle='blue';
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillText((combinacoes['quase-permanente'].esforcoCortanteMaximo).toFixed(2)+' kN',15,55 - desl_y_EC_QuasePermanente_Maxima)
    ctx[0].fillText(((-combinacoes['quase-permanente'].esforcoCortanteMaximo)).toFixed(2) +' kN',335,60 + desl_y_EC_QuasePermanente_Maxima)
    ctx[0].stroke()

    let desl_y_EC_QuasePermanente_Minimo = escalay * combinacoes['quase-permanente'].esforcoCortanteMinimo
    ctx[0].beginPath()
    ctx[0].globalAlpha = 0.4;
    ctx[0].lineWidth = 1
    ctx[0].moveTo(35,55)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Minimo)
    ctx[0].moveTo(365,55)
    ctx[0].lineTo(365,55 + desl_y_EC_QuasePermanente_Minimo)
    ctx[0].lineTo(35,55 - desl_y_EC_QuasePermanente_Minimo)
    ctx[0].stroke()
    ctx[0].beginPath()
    ctx[0].globalAlpha = 1;
    ctx[0].fillStyle='red';
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillText((combinacoes['quase-permanente'].esforcoCortanteMinimo).toFixed(2)+' kN',15,65 - desl_y_EC_QuasePermanente_Minimo)
    ctx[0].fillText(((-combinacoes['quase-permanente'].esforcoCortanteMinimo)).toFixed(2) +' kN',335,50 + desl_y_EC_QuasePermanente_Minimo)
    ctx[0].stroke()
}

function desenharMomentoFletor(combinacoesDados){

    let combinacoes = combinacoesDados[0]
    let dados = combinacoesDados[1]
    console.log(combinacoes,dados,combinacoesDados)
    let momentoMaximo =  combinacoes['ultima']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8
    let momentoPorPixel = momentoMaximo /80 //Momento necessário para deslocar 1 pixel
  
    ctx[3].beginPath()
    ctx[3].lineWidth = 1
    ctx[3].fillStyle='black';
    ctx[3].moveTo(35,55)

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['ultima']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[3].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillStyle='blue';
    ctx[3].fillText((momentoMaximo).toFixed(2)+' kNm',170,150)
    ctx[3].stroke()


    //Momento Mínimo para combinação última
    ctx[3].beginPath()
    ctx[3].lineWidth = 1
    ctx[3].fillStyle='black';
    ctx[3].moveTo(35,55)

    let proporcaoMomentoMinimoMaximoUltima = combinacoes['ultima']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoUltimo = combinacoes['ultima']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['ultima']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[3].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[3].font = "bold 11px Arial"
    ctx[3].fillStyle='red';
    ctx[3].fillText((momentoMinimoUltimo).toFixed(2)+' kNm',170,55 +(proporcaoMomentoMinimoMaximoUltima * 80)-12)
    ctx[3].stroke()


    //Momento máximo para combinação rara
    ctx[2].beginPath()
    ctx[2].lineWidth = 1
    ctx[2].fillStyle='black';
    ctx[2].moveTo(35,55)

    let proporcaoMomentoMaximoRaraMaximoUltima = combinacoes['rara']['cargaDistribuidaMaxima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMaximoRara = combinacoes['rara']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['rara']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[2].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillStyle='blue';
    ctx[2].fillText((momentoMaximoRara).toFixed(2)+' kNm',170,55+(proporcaoMomentoMaximoRaraMaximoUltima * 80)+15)
    ctx[2].stroke()


    //Momento mínimo para combinação rara
    ctx[2].beginPath()
    ctx[2].lineWidth = 1
    ctx[2].fillStyle='black';
    ctx[2].moveTo(35,55)

    let proporcaoMomentoMinimoRaraMaximoUltima = combinacoes['rara']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoRara = combinacoes['rara']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['rara']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[2].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[2].font = "bold 11px Arial"
    ctx[2].fillStyle='red';
    ctx[2].fillText((momentoMinimoRara).toFixed(2)+' kNm',170,55+(proporcaoMomentoMinimoRaraMaximoUltima * 80)-12)
    ctx[2].stroke()


    //Momento Máximo para combinação frequente
    ctx[1].beginPath()
    ctx[1].lineWidth = 1
    ctx[1].fillStyle='black';
    ctx[1].moveTo(35,55)

    let proporcaoMomentoMaximoFrequenteMaximoUltima = combinacoes['frequente']['cargaDistribuidaMaxima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMaximoFrequente = combinacoes['frequente']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['frequente']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[1].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillStyle='blue';
    ctx[1].fillText((momentoMaximoFrequente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMaximoFrequenteMaximoUltima * 80)+15)
    ctx[1].stroke()

    //Momento Mínimo para combinação frequente
    ctx[1].beginPath()
    ctx[1].lineWidth = 1
    ctx[1].fillStyle='black';
    ctx[1].moveTo(35,55)

    let proporcaoMomentoMinimoFrequenteMaximoUltima = combinacoes['frequente']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoFrequente = combinacoes['frequente']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['frequente']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[1].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[1].font = "bold 11px Arial"
    ctx[1].fillStyle='red';
    ctx[1].fillText((momentoMinimoFrequente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMinimoFrequenteMaximoUltima * 80)-12)
    ctx[1].stroke()

    //Momento Máximo para combinação quase-permanente
    ctx[0].beginPath()
    ctx[0].lineWidth = 1
    ctx[0].fillStyle='black';
    ctx[0].moveTo(35,55)

    let proporcaoMomentoMaximoQuasePermanenteMaximoUltima = combinacoes['quase-permanente']['cargaDistribuidaMaxima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMaximoQuasePermanente = combinacoes['quase-permanente']['cargaDistribuidaMaxima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['quase-permanente']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[0].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillStyle='blue';
    ctx[0].fillText((momentoMaximoQuasePermanente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMaximoQuasePermanenteMaximoUltima * 80)+15)
    ctx[0].stroke()

    //Momento Mínimo para combinação quase-permanente
    ctx[0].beginPath()
    ctx[0].lineWidth = 1
    ctx[0].fillStyle='black';
    ctx[0].moveTo(35,55)

    let proporcaoMomentoMinimoQuasePermanenteMaximoUltima = combinacoes['quase-permanente']['cargaDistribuidaMinima'] / combinacoes['ultima']['cargaDistribuidaMaxima']
    let momentoMinimoQuasePermanente = combinacoes['quase-permanente']['cargaDistribuidaMinima'] * dados['vao'] * dados['vao'] /8

    for(let i = 36; i <= 365 ; i++){
        let distReal = (i-35) * (dados['vao']/330)
        let momentox = (combinacoes['quase-permanente']['cargaDistribuidaMinima'] * distReal/2) * ( - distReal + dados['vao'])
        let deslocamentoEmPixel = momentox / momentoPorPixel
        ctx[0].lineTo(i, 55 + (deslocamentoEmPixel))
    }
    ctx[0].font = "bold 11px Arial"
    ctx[0].fillStyle='red';
    ctx[0].fillText((momentoMinimoQuasePermanente).toFixed(2)+' kNm',170,55+(proporcaoMomentoMinimoQuasePermanenteMaximoUltima * 80)-12)
    ctx[0].stroke()
}


export {desenharEsforcoCortante,desenharMomentoFletor}