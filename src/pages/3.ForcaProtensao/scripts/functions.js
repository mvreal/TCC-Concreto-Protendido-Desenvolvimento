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

//     esfDistQuasePermanente = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['quase-permanente']['cargaDistribuidaMaxima']
//     esfDistFrequente = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['frequente']['cargaDistribuidaMaxima']
//     esfDistRara = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['rara']['cargaDistribuidaMaxima']


    return{
        vao: Number(objeto.Vao),
        g1: objeto.dados.carregamentos.g1,
        g2: objeto.dados.carregamentos.g2,
        q: objeto.dados.carregamentos.q,
        qsi1: objeto.dados.coeficientesServico.qsi1,
        qsi2: objeto.dados.coeficientesServico.qsi2,
        esfDistQuasePermanente: objeto.combinacoes['quase-permanente'].cargaDistribuidaMaxima,
        esfDistFrequente: objeto.combinacoes.frequente.cargaDistribuidaMaxima,
        esfDistRara: objeto.combinacoes.rara.cargaDistribuidaMaxima
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

function calcularFct(fck, tipo){

    console.log(fck, tipo)

    let fctm = 0.3 * (fck)**(2/3)
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
        fctm: fctm,
        fctk_inf: fctk_inf,
        fct_f: fct_f
    }

    return resultadoCalcularFct

}

export { calcularFct, pegarInputs, pegarDadosRotina2, pegarDadosRotina1, adicionarFuncionalidadeRangeInput, mostrarInputs, objeto, pegarDados }