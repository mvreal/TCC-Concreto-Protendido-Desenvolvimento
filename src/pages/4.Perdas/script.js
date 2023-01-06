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
    let secoes = pegarSecoes(dadosSalvosdaRotina3[indexSelecionado])
    let info = dadosSalvosdaRotina3[indexSelecionado]
    let epMax = Math.min(...(info['secoes']).map(el=>el['ep']))
    let vao = Number(dadosSalvosdaRotina3[indexSelecionado]['secoes'][0]['Vao'])
    let forçaInicialdeProtensao =  dadosSalvosdaRotina3[indexSelecionado]['pIniProj']
    let coeficienteK = document.getElementById('coefAtrito').value * 0.01

    calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, coeficienteK)
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

function calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, coeficienteK){
    let derivadaY = secoes.map(sec => (((-8 * epMax)/(vao ** 2)) * sec) + ((4 * epMax)/vao))
    Px = forçaInicialdeProtensao * Math.exp()
}