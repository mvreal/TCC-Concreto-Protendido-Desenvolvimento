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
    let mi = Number(document.getElementById('coefAtrito').value)
    let coeficienteK = mi * 0.01

    console.log(calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, mi, coeficienteK))
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

function calcularPerdasAtrito(epMax, vao, secoes, forçaInicialdeProtensao, mi, coeficienteK){
    let derivadaY = secoes.map(sec => (((-8 * epMax)/(vao ** 2)) * sec) + ((4 * epMax)/vao))
    let anguloAlfa = derivadaY.map(el => Math.abs(Math.atan(el)))
    let deltaAlfa = []
    for (let i = 0; i < anguloAlfa.length - 1; i++) {
        deltaAlfa.push(Math.abs(anguloAlfa[i] - anguloAlfa[i+1]))
    }
    //----Até aqui eu verifiquei que ta certo
    console.log(anguloAlfa,deltaAlfa)
    let PxsemIndex0 = []
    
    for(let i = 0; i<secoes.length - 1; i++){
        PxsemIndex0.push(forçaInicialdeProtensao * Math.exp(-mi * (deltaAlfa[i]) - coeficienteK * secoes[i]))
    }

    let Px = [forçaInicialdeProtensao,...PxsemIndex0]
    console.log()
    return Px
}