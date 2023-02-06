function escreverTextosBtn(){
    let getBtnDiagramas = document.querySelectorAll('#ctn2 button')
    getBtnDiagramas[0].innerText = 'D.E.C.'
    getBtnDiagramas[1].innerText = 'D.M.F.'
}

function escreverTitulos(){
    let getTituloPrincipalCombinacoes = document.getElementById('titulo2')
    getTituloPrincipalCombinacoes.innerText = 'Combinações'

    let getTitulos = document.querySelectorAll('.ctnCombinacao h3')
    getTitulos[0].innerText = 'Quase Permanente'
    getTitulos[1].innerText = 'Frequente'
    getTitulos[2].innerText = 'Rara'
    getTitulos[3].innerText = 'Última'
}

function esconderContainerResultados(){
    let mostrardepois = document.querySelector("#ctn2")
    mostrardepois.style.display = 'none'
}

function mostrarContainerResultados(){
    let mostrardepois = document.querySelector("#ctn2")
    mostrardepois.style.display = 'block'
}

function apagarCanvas(){
    let pegarCanvas = document.querySelectorAll('canvas')
    pegarCanvas.forEach((element)=>{
        let context = element.getContext('2d')
        context.clearRect(0,0,element.width,element.height)
    })
}

function desenharBasico(){
    let ctx = []
    let canvas= document.querySelectorAll('canvas')

    canvas.forEach((element,index)=>{
        element.width = 400
        element.height = 150
        
        ctx[index] = element.getContext('2d')
        //Apoio esquerdo
        ctx[index].beginPath()
        ctx[index].lineWidth = 1
        ctx[index].beginPath()
        ctx[index].moveTo(35,55)
        ctx[index].lineTo(25,75)
        ctx[index].lineTo(45,75)
        ctx[index].lineTo(35,55)
        ctx[index].moveTo(25,75)
        ctx[index].lineTo(23,80)
        ctx[index].moveTo(30,75)
        ctx[index].lineTo(28,80)
        ctx[index].moveTo(35,75)
        ctx[index].lineTo(33,80)
        ctx[index].moveTo(40,75)
        ctx[index].lineTo(38,80)
        ctx[index].moveTo(45,75)
        ctx[index].lineTo(43,80)
        //Apoio direito
        ctx[index].moveTo(365,55)
        ctx[index].lineTo(355,75)
        ctx[index].lineTo(375,75)
        ctx[index].lineTo(365,55)
        ctx[index].moveTo(355,80)
        ctx[index].lineTo(375,80)
        //Barra
        ctx[index].moveTo(35,55)
        ctx[index].lineTo(365,55)
        //Renderizar
        ctx[index].stroke()
    })
}

function calcular(){
    let todosInputsDeCalculo = document.querySelectorAll('.inputCalc')
    
    let [vao, g1, g2, q, qsi1, qsi2, gamag1, gamag2, gamaq] = todosInputsDeCalculo
    let dados = {
        'vao': Number(vao.value),
        'carregamentos':{'g1':Number(g1.value),'g2':Number(g2.value),'q':Number(q.value)},
        'coeficientesServico':{'qsi1':Number(qsi1.value),'qsi2':Number(qsi2.value)},
        'coeficientesUltimo':{'gamag1':Number(gamag1.value),'gamag2':Number(gamag2.value),'gamaq':Number(gamaq.value)}
    }
    let combinacoes = {
    'quase-permanente':{
        'cargaDistribuidaMaxima': dados['carregamentos']['g1'] + dados['carregamentos']['g2'] + dados['coeficientesServico']['qsi2'] * dados['carregamentos']['q'],
        'cargaDistribuidaMinima':dados['carregamentos']['g1'] + dados['carregamentos']['g2']
    },
    'frequente':{
        'cargaDistribuidaMaxima': dados['carregamentos']['g1'] + dados['carregamentos']['g2'] + dados['coeficientesServico']['qsi1'] * dados['carregamentos']['q'],
        'cargaDistribuidaMinima':dados['carregamentos']['g1'] + dados['carregamentos']['g2']
    },
    'rara':{
        'cargaDistribuidaMaxima': dados['carregamentos']['g1'] + dados['carregamentos']['g2'] + dados['carregamentos']['q'],
        'cargaDistribuidaMinima':dados['carregamentos']['g1'] + dados['carregamentos']['g2']

    },
    'ultima':{
        'cargaDistribuidaMaxima': (dados['carregamentos']['g1'] * dados['coeficientesUltimo']['gamag1']) + (dados['carregamentos']['g2'] * dados['coeficientesUltimo']['gamag2']) + dados['carregamentos']['q'] * dados['coeficientesUltimo']['gamaq'],
        'cargaDistribuidaMinima':(dados['carregamentos']['g1'] * dados['coeficientesUltimo']['gamag1']) + (dados['carregamentos']['g2'] * dados['coeficientesUltimo']['gamag2'])
    }
}
    combinacoes['quase-permanente'].esforcoCortanteMaximo = combinacoes['quase-permanente']['cargaDistribuidaMaxima'] * (dados['vao'])/2
    combinacoes['frequente'].esforcoCortanteMaximo = combinacoes['frequente']['cargaDistribuidaMaxima'] * (dados['vao'])/2
    combinacoes['rara'].esforcoCortanteMaximo = combinacoes['rara']['cargaDistribuidaMaxima'] * (dados['vao'])/2
    combinacoes['ultima'].esforcoCortanteMaximo = combinacoes['ultima']['cargaDistribuidaMaxima'] * (dados['vao'])/2

    combinacoes['quase-permanente'].esforcoCortanteMinimo = combinacoes['quase-permanente']['cargaDistribuidaMinima'] * (dados['vao'])/2
    combinacoes['frequente'].esforcoCortanteMinimo = combinacoes['frequente']['cargaDistribuidaMinima'] * (dados['vao'])/2
    combinacoes['rara'].esforcoCortanteMinimo = combinacoes['rara']['cargaDistribuidaMinima'] * (dados['vao'])/2
    combinacoes['ultima'].esforcoCortanteMinimo = combinacoes['ultima']['cargaDistribuidaMinima'] * (dados['vao'])/2
    return [combinacoes, dados]
}

function erro(mensagemDeTexto){
    let getMessage = document.querySelectorAll('.message')
    getMessage[0].innerHTML = "<img src=./images/icons/danger.svg>" 
    getMessage[1].innerHTML = mensagemDeTexto
}

function sucesso(){
    
    let getMessage = document.querySelectorAll('.message')
    getMessage[0].innerHTML = "<img src=./images/icons/ok.svg>"
    getMessage[1].innerHTML = "Os dados de entrada foram inseridos com sucesso!"
}

function verificarInputs(){
    let getInputs = document.querySelectorAll('input[type=number]')
    let getInputsNumber = []

    getInputs.forEach((element)=>getInputsNumber.push(Number(element.value)))

    let [Vao, g1, g2, q, qsi1, qsi2, gamag1, gamag2, gamaq] = getInputsNumber

    let getMessage = document.querySelectorAll('.message')
    let deuErro = []

    getInputs.forEach((element)=>{
        if(Number(element.value) == 0){
            getMessage[0].innerHTML = "<img src=./images/icons/danger.svg>" 
            getMessage[1].innerHTML = element.name + ' não foi inserido'
            deuErro = true
        }    
    })

    if(qsi1 <= qsi2){erro("&#936<sub>1</sub> deve ser maior que &#936<sub>2</sub>"); deuErro = true}
    if(qsi1 < 0.3 || qsi1 > 1){erro("Segundo a NBR 6118-2013 Tabela 11.2 e Seção 23, &#936<sub>1</sub> deve estar entre 0,3 e 1"); deuErro = true}
    if(qsi2 < 0 || qsi2 > 0.6){erro("Segundo a NBR 6118-2013 Tabela 11.2, &#936<sub>2</sub> deve estar entre 0 e 0,6"); deuErro = true}
    if(gamag1 < 1 || gamag1 > 1.4){erro("Segundo a NBR 6118-2013 Tabela 11.1, &#947<sub>g<sub>1</sub></sub> deve estar entre 1 e 1,4"); deuErro = true}
    if(gamag2 < 1 || gamag2 > 1.4){erro("Segundo a NBR 6118-2013 Tabela 11.1, &#947<sub>g<sub>2</sub></sub> deve estar entre 1 e 1,4"); deuErro = true}
    if(gamaq < 1 || gamaq > 1.4){erro("Segundo a NBR 6118-2013 Tabela 11.1, &#947<sub>g<sub>3</sub></sub> deve estar entre 1 e 1,4"); deuErro = true}
    return deuErro
}
export {escreverTextosBtn, escreverTitulos, esconderContainerResultados, mostrarContainerResultados, apagarCanvas, desenharBasico, calcular, erro, sucesso, verificarInputs}