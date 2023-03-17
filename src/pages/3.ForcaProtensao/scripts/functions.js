function objeto(){
    const optionSelected = document.getElementById('opcoes-salvas').value
    const objetoSelecionado = dadosSalvosdaRotina2[optionSelected]
    return objetoSelecionado
}

function pegarDados(obj){
    const tipo = obj.rotina1.tipo
    const dados = obj.rotina1.dados
    const centroide = obj.rotina1.centroide

    console.log(tipo, dados, centroide)

    return{
        tipo: tipo,
        dados: dados,
        centroide: centroide
    }
}

function mostrarInputs(){
    
    const [inputsRange] = [document.querySelectorAll("input[type='range']")]
    const arr = [...inputsRange]
    arr.map(element => element.setAttribute("class", "inputep inline-block m-0 height height-30 margin-auto"))

}

function adicionarFuncionalidadeRangeInput(disYAcimaDoCentroide, disYAbaixoDoCentroide){
    const [input1, input2] = [document.querySelectorAll("input[type='range']")[0], document.querySelectorAll("input[type='range']")[1]]
    input1.setAttribute('min', 0)
    input1.setAttribute('max', disYAcimaDoCentroide)
    input2.setAttribute('min', 0)
    input2.setAttribute('max', disYAbaixoDoCentroide)
}



export { adicionarFuncionalidadeRangeInput, mostrarInputs, objeto, pegarDados }