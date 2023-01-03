const getSelect = document.getElementById('dadosEntrada')

let script = () =>{
    inserirDadosSelect(dadosSalvosdaRotina3)   
}


window.addEventListener('DOMContentLoaded', script)


function inserirDadosSelect(dadosSalvosdaRotina3){
    dadosSalvosdaRotina3.forEach(element => {
        let createOption = document.createElement('option')
        getSelect.appendChild(createOption)
        createOption.innerText = ` Index: ${element.id}, Número de cabos: ${element.numCabos}, Número de Cordoalhas: ${element.numCordoalhasArredondado}`
        createOption.value = element.id
    });
}

getSelect.addEventListener('change',mudarOption)

function mudarOption(){
    let indexSelecionado = verificarIndex()
    let secoes = pegarSecoes(dadosSalvosdaRotina3[indexSelecionado]) //Não esta funcionando
    let pontoInicial = dadosSalvosdaRotina3[indexSelecionado]['secoes'][0]['posicaoCaboProtensao']['inicio']
    let pontoIntermediario = dadosSalvosdaRotina3[indexSelecionado]['secoes'][0]['posicaoCaboProtensao']['meioVao']
    let vao = dadosSalvosdaRotina3[indexSelecionado]['secoes'][0]['Vao']

    console.log(calcularPerdasAtrito(pontoInicial, pontoIntermediario, vao, secoes))

    
}

function verificarIndex(){
    return getSelect.value
}

function pegarSecoes(objeto){
    let arr = objeto.secoes
    let secoes = arr.map((sec)=>{
        return sec.X

    })
    return secoes
}

function calcularPerdasAtrito(pontoInicial, pontoIntermediario, vao, posicao){

    //Os resultados não são os esperados - rever
    let derivadaY = posicao.map((posi)=>{
        return ((-8*pontoIntermediario + 8*pontoInicial)/((vao**2)/100))*((posi**2)/100) + ((4*pontoIntermediario - 4*pontoInicial)/(vao/100)) 
    })
    console.log(derivadaY)

    let anguloAnfa = derivadaY.map((derY)=>{
        return Math.atan(derY)
    })
    console.log(anguloAnfa)

    return anguloAnfa
}