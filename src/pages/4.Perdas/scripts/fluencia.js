import fluencia from '../data/fluencia.js'

function calcularCoeficienteFluencia(umidade, espessura, classeConcreto, tempo){
    let filtroEspessura, filtroTipoConcreto, filtroTempo, filtroUmidade = []

    //Filtro da espessura fictícia
    if(espessura<=20){
        filtroEspessura = fluencia.filter((element, indice, array) => {
            if(element.f_espessura_fluencia == 20){
                return element
            }
        })
    }else if(espessura > 20 && espessura <= 60){
        filtroEspessura = fluencia
    }else if(espessura >=60){
        filtroEspessura = fluencia.filter((element, indice, array) => {
            if(element.f_espessura_fluencia >= 60){
                return element
            }
        })
    }
    //Filtro da classe do concreto
    filtroTipoConcreto = filtroEspessura.filter((element, indice, array) => {
        if(element['i_tipoConcreto_fluencia'] == classeConcreto){
            return element
        }
    })
    //Filtro tempo
    filtroTempo = filtroTipoConcreto.filter((element, indice, array) => {
        if(element['i_tempo_fluencia'] == tempo){
            return element
        }
    })
    console.log(filtroTempo)
    //Filtro umidade
    filtroUmidade = filtroTempo.filter((element, indice, array) => {
        if(element['i_umidade_fluencia'] == umidade){
            return element
        }
    })
    return calcularInterpolacaoCoeficienteFluencia(espessura, filtroUmidade)
}

function calcularInterpolacaoCoeficienteFluencia(espessura, arr){
    let coeficienteFluencia

    if(arr.length == 1){
        return arr[0]['f_coeficiente_fluencia']
    }
    if(arr.length == 2){
        const espessura20 = arr.filter(element => element.f_espessura_fluencia == 20)
        const espessura60 = arr.filter(element => element.f_espessura_fluencia == 60)
        console.log(espessura20, espessura60)
        const deltaCoeficienteFluenciaTotal = (espessura60[0].f_coeficiente_fluencia - espessura20[0].f_coeficiente_fluencia)/40 
        const deltaCoeficienteFluenciaCalculado = Number(espessura) - 20
        console.log(deltaCoeficienteFluenciaTotal, deltaCoeficienteFluenciaCalculado)
        coeficienteFluencia = espessura20[0].f_coeficiente_fluencia + (deltaCoeficienteFluenciaCalculado * deltaCoeficienteFluenciaTotal)
        return coeficienteFluencia
    }  
} 

export  { calcularCoeficienteFluencia, calcularInterpolacaoCoeficienteFluencia }