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

function pegarDadosRotina1(objeto){
    const dadosRotina1 = objeto.rotina1
    return{
        area: dadosRotina1.area,
        centroide: dadosRotina1.centroide,
        b: dadosRotina1.dados.b,
        h: dadosRotina1.dados.h,
        ixg: dadosRotina1.ixg,
        tipo: dadosRotina1.tipo,
        w1: dadosRotina1.w1,
        w2: dadosRotina1.w2
    }
}

function pegarDadosRotina2(objeto){

    return{
        vao: Number(objeto.Vao),
        g1: objeto.dados.carregamentos.g1,
        g2: objeto.dados.carregamentos.g2,
        q: objeto.dados.carregamentos.q,
        qsi1: objeto.dados.coeficientesServico.qsi1,
        qsi2: objeto.dados.coeficientesServico.qsi2,
    }
}

function pegarInputs(){
    const input1 = document.getElementById('inputep1')
    const input2 = document.getElementById('inputep2')
    const fck = document.getElementById('fck').value
    const grauProtensao = document.getElementById('grau-protensao').value
    const numSecoes = document.getElementById('subdivisoes-viga').value


    return{
        input1: Number(input1.value),
        input2: Number(input2.value),
        fck: Number(fck),
        grauProtensao: grauProtensao,
        numSecoes: Number(numSecoes)
    }
}

export { pegarInputRange, pegarDadosRotina2, pegarDadosRotina1, adicionarFuncionalidadeRangeInput, mostrarInputs, objeto, pegarDados }