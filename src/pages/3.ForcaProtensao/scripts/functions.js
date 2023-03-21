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
    const perdas = document.getElementById('inputPerdas').value

    const valorArmaduraProtensao = document.getElementById('armadura-protensao').value
    const resistenciaArmaduraProtensao = valorArmaduraProtensao.slice(0,3)
    const diametroCabo = valorArmaduraProtensao.slice(4,8)
    const areaArmaduraProtensao1cordoalha = Number(valorArmaduraProtensao.slice(9))


    return{
        input1: Number(input1.value),
        input2: Number(input2.value),
        fck: Number(fck),
        grauProtensao: grauProtensao,
        numSecoes: Number(numSecoes),
        porcentagemPerdas: Number(perdas),
        valorArmaduraProtensao: Number(valorArmaduraProtensao),
        resistenciaArmaduraProtensao: Number(resistenciaArmaduraProtensao),
        diametroCabo: Number(diametroCabo),
        areaArmaduraProtensao1cordoalha: Number(areaArmaduraProtensao1cordoalha)
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

function calcularMomento(cargaDistribuida, vao, numeroSecoes){

    let ArrMomento = new Array()
    const posicoes = calcularPosicoes(vao, numeroSecoes)

    for(let i = 0; i < numeroSecoes; i++){
        ArrMomento[i] = (cargaDistribuida * vao * posicoes[i]/2) + (- cargaDistribuida * posicoes[i] * posicoes[i]/2)
    }

    return ArrMomento
}

function calcularPosicoes(vao, numeroSecoes){

    let arrPosicoes = new Array()

    for(let i = 0; i<numeroSecoes; i++){
        arrPosicoes[i] = (i * vao)/ (numeroSecoes - 1)
    }

    return arrPosicoes
}

function calcularEp(m, n, vao, posicao, centroide){

    const equacaoDoCaboDeProtensao = new Array()
    const ep = new Array()

    for(let i = 0; i < posicao.length; i++){
        equacaoDoCaboDeProtensao[i] = (((-4*n + 4*m)/((vao**2)/100))*((posicao[i]**2)/100) + (((4*n - 4*m)/(vao/100)) * (posicao[i]/100)) + m)

        ep[i] = (-centroide + equacaoDoCaboDeProtensao[i])/100

    }

    return ep
}

function dimensionarSecoes(momentoQuasePermanente, momentoFrequente, momentoRara, w1, w2, ep, area, resFct, tipo, grauProtensao, numSecoes, posicao, m, n){
    
    const momentoQuasePermanenteConvertido = momentoQuasePermanente.map(el => el * 1000) // N * m
    const momentoFrequenteConvertido = momentoFrequente.map(el => el * 1000) // N * m
    const momentoRaraConvertido = momentoRara.map(el => el * 1000) // N * m

    const fct_f = resFct['fct_f'] * 1000000

    const w1Convertido = w1/1000000 //converção de cm³ para m³
    const w2Convertido = w2/1000000 //converção de cm³ para m³
    const areaConvertida = area/10000 //converção de cm² para m²
    const objRotina3 = new Array()

    console.log('fct_f'+fct_f)

    for(let i = 0; i<numSecoes; i++){


        objRotina3[i] = {

            'X': posicao[i],
            'ep': ep[i], //Excentricidade em metros
            'momentoQP': momentoQuasePermanente[i],
            'momentoFrequente': momentoFrequente[i],
            'momentoRara': momentoRara[i],
            'completa-ELS-D': momentoFrequenteConvertido[i]/(((1/areaConvertida) + (ep[i]/w1Convertido)) * w1Convertido),
            'completa-ELS-F': ((momentoRaraConvertido[i]/w1Convertido) + fct_f)/((1/areaConvertida) + (ep[i]/w1Convertido)),
            'limitada-ELS-D': momentoQuasePermanenteConvertido[i]/(((1/areaConvertida) + (ep[i]/w1Convertido)) * w1Convertido),
            'limitada-ELS-F': ((momentoFrequenteConvertido[i]/w1Convertido) + fct_f)/((1/areaConvertida) + (ep[i]/w1Convertido)),
            'protensao': grauProtensao,
            'posicaoCaboProtensao':{
                inicio: m,
                meioVao: n
            }
        }
    }  

    return objRotina3
}

function calcularForcasProtensaoCalculo(grauProtensao, secoesDimensionadas, porcentagemPerdas){

   const forcaProtensaoFinalCompletaRara = secoesDimensionadas.map(el=>el['completa-ELS-F'])
   const forcaProtensaoFinalCompletaFrequente = secoesDimensionadas.map(el=>el['completa-ELS-D'])
   const forcaProtensaoFinalLimitadaFrequente = secoesDimensionadas.map(el=>el['limitada-ELS-F'])
   const forcaProtensaoFinalLimitadaQuasePermanente = secoesDimensionadas.map(el=>el['limitada-ELS-D'])
   

   console.log(forcaProtensaoFinalCompletaRara, forcaProtensaoFinalCompletaFrequente, forcaProtensaoFinalLimitadaFrequente, forcaProtensaoFinalLimitadaQuasePermanente)

   let forcaProtensaoFinalCalculo;
   let forcaProtensaoInicialCalculo;

   if(grauProtensao =='completa'){
    forcaProtensaoFinalCalculo = Math.min(...forcaProtensaoFinalCompletaRara, ...forcaProtensaoFinalCompletaFrequente)
   }else if(grauProtensao =='limitada'){
    forcaProtensaoFinalCalculo = Math.min(...forcaProtensaoFinalLimitadaFrequente, ...forcaProtensaoFinalLimitadaQuasePermanente)
   }else{
    console.log('Problema ao definir o grau de protensão')
   }



   
   console.log(forcaProtensaoFinalCalculo, porcentagemPerdas)
   forcaProtensaoInicialCalculo = forcaProtensaoFinalCalculo * (1 / (1 - (porcentagemPerdas/100)))
   console.log(forcaProtensaoInicialCalculo)


   return {
    forcaProtensaoFinalCalculo: forcaProtensaoFinalCalculo,
    forcaProtensaoInicialCalculo: forcaProtensaoInicialCalculo
   }
}

function criarLinhaColuna(){

    const resTBody = document.getElementById('res-tbody')
    const contador = document.querySelectorAll('tbody > tr').length

    //Criando a linha inserindo no DOM
    const createTr = document.createElement('tr')
    resTBody.appendChild(createTr)
    createTr.classList.add('linha'+(contador+1))

    //Criando 9 células para os registros da seção 'Salvar'
    for(let i = 0; i<9; i++){
        const createTd = document.createElement('td')
        createTr.appendChild(createTd)
        createTd.classList.add('elemento' + (i+1))
    }

    const celulas = document.querySelector('.linha'+(contador + 1)).children
    //const pegarUltimoRegistro = resultadosDaRotina3[resultadosDaRotina3.length -1]

    return {
        celulas: celulas,
        contador : contador
    }

}

function calcularNumeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero, pegarNumeroCabos = 1){

    const sigmapi = 0.82 * 0.9 * resistenciaArmaduraProtensao * 10 //MPa
    const areaAcoProtendido = Number(-pZero)/(sigmapi * 100) //em cm²
    const numeroCordoalhas = (areaAcoProtendido/(areaArmaduraProtensao1cordoalha/100))/pegarNumeroCabos

    console.log(sigmapi, areaAcoProtendido, numeroCordoalhas, pZero)

    return [numeroCordoalhas,sigmapi]
}

function calcularForcaProtensaoProjeto(numeroCordoalhas, areaArmaduraProtensao1cordoalha, sigmapi, porcentagemPerdas, numCabos = 1 ){

    
    const numeroCordoalhasArredendadoCima = Math.ceil(numeroCordoalhas)
    const aproveitamento = 1 - (porcentagemPerdas / 100)

    console.log(numeroCordoalhasArredendadoCima, aproveitamento)

    const Ap = numeroCordoalhasArredendadoCima * areaArmaduraProtensao1cordoalha * numCabos/100 //cm²
    const forcaProtencaoInicialProjeto = Ap * sigmapi * 100 // N * m

    console.log(Ap, forcaProtencaoInicialProjeto)
    return{
        forcaProtencaoInicialProjeto: forcaProtencaoInicialProjeto,
        forcaProtensaoFinalProjeto: forcaProtencaoInicialProjeto * aproveitamento
    }
}

function inserirDadosCelulas(celulas, contador, grauProtensao, forcaProtensaoFinalCalculo, forcaProtensaoFinalProjeto, forcaProtensaoInicialCalculo, forcaProtencaoInicialProjeto, resistenciaArmaduraProtensao, diametroCabo, numeroCordoalhas, objetoSelecionado) {

    const tipoArmadura = 'CP ' + resistenciaArmaduraProtensao + ' RB ' + diametroCabo
    celulas[0].innerText = contador
    celulas[1].innerText = grauProtensao
    celulas[2].innerText = (forcaProtensaoFinalCalculo/1000).toFixed(2) + ' kN'
    celulas[3].innerText = (forcaProtensaoFinalProjeto/1000).toFixed(2) + ' kN'
    celulas[4].innerText = (forcaProtensaoInicialCalculo/1000).toFixed(2) + ' kN'
    celulas[5].innerText = (forcaProtencaoInicialProjeto/1000).toFixed(2) + ' kN'
    celulas[6].innerText = tipoArmadura
    celulas[7].innerText = Math.ceil(numeroCordoalhas)
    celulas[8].innerHTML = `<select numero='${contador+1}' id='select${contador+1}' class='selectCabos'><option selected value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>`

    const select = document.getElementById(`select${contador+1}`)
    console.log(select)
    adicionarEventoSelect(select)


}

function adicionarEventoSelect(select){
    console.log(select)
    select.addEventListener('change', function(element){

        const el = element.target
        const novoNumeroCabos = el.value
        const  linha = el.getAttribute('numero')

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













    })
}

function salvarResultados(grauProtensao, forcaProtensaoFinalCalculo, forcaProtensaoFinalProjeto, forcaProtensaoInicialCalculo, forcaProtencaoInicialProjeto, resistenciaArmaduraProtensao, diametroCabo, numeroCordoalhas, objetoSelecionado, secoesDimensionadas, areaArmaduraProtensao1cordoalha, fck, resultados ){

    const {celulas, contador} = criarLinhaColuna()

    inserirDadosCelulas(celulas, contador, grauProtensao, forcaProtensaoFinalCalculo, forcaProtensaoFinalProjeto, forcaProtensaoInicialCalculo, forcaProtencaoInicialProjeto, resistenciaArmaduraProtensao, diametroCabo, numeroCordoalhas, objetoSelecionado)

    console.log('contador '+ contador)

    if(contador == 0){
        var dados = []
        console.log('situacao1')
    }else if(contador != 0 && dadosSalvosdaRotina3 == ''){
        var dados = resultados
        console.log('situacao2')
    }else if(contador !=0 && dadosSalvosdaRotina3 != ''){
        var dados = dadosSalvosdaRotina3
        console.log('situacao3')

    }


    let informacoes = {
        tensaoCaracteristicaTracao: Number(resistenciaArmaduraProtensao) * 10, 
        id: contador,
        areaArmaduraProtensao1cordoalha: areaArmaduraProtensao1cordoalha,
        pInfCalc: forcaProtensaoFinalCalculo/1000,
        PInfProj: forcaProtensaoFinalProjeto/1000,
        pIniCalc: forcaProtensaoInicialCalculo/1000,
        pIniProj: forcaProtencaoInicialProjeto/1000,
        tipoArmadura: 'CP ' + resistenciaArmaduraProtensao + ' RB ' + diametroCabo,
        numCordoalhasArredondado: Math.ceil(numeroCordoalhas),
        numCabos: 1,
        secoes: secoesDimensionadas,
        Ap: 1 * Math.ceil(numeroCordoalhas) * areaArmaduraProtensao1cordoalha, //Ver a unidade
        fck: fck,
        rotina2: objeto() 
    }

    
    dados[contador] = informacoes 
    window.api.dadosRotina3(dados)
    return dados
}

function verificarDadosAnteriores(){

    if(typeof dadosSalvosdaRotina3 == 'object') {
        let dados = dadosSalvosdaRotina3
        for (let i = 0; i < dadosSalvosdaRotina3.length; i++){
            inserirDadosCriadosAnteriormente(dados[i], i)
        }
        return true
    } 
    return false
}

function inserirDadosCriadosAnteriormente(dado, index){
    criarLinhaColuna()
    inserirDadoJaCriado(dado, index)
    
}

function inserirDadoJaCriado(dado, index){

    const celulas = document.querySelectorAll(`.linha${(index + 1)} > td`)
    
    console.log()
    celulas[0].innerText = index
    celulas[1].innerText = dado.secoes[0].protensao
    celulas[2].innerText = dado.pInfCalc.toFixed(2) + ' kN'
    celulas[3].innerText = dado.PInfProj.toFixed(2) + ' kN'
    celulas[4].innerText = dado.pIniCalc.toFixed(2) + ' kN'
    celulas[5].innerText = dado.pIniProj.toFixed(2) + ' kN'
    celulas[6].innerText = dado.tipoArmadura
    celulas[7].innerText = dado.numCordoalhasArredondado
    celulas[8].innerText = dado.numCabos

    
}

export { verificarDadosAnteriores, calcularForcaProtensaoProjeto, calcularNumeroCordoalhas, calcularForcasProtensaoCalculo, salvarResultados, dimensionarSecoes, calcularPosicoes, calcularEp, calcularMomento, calcularFct, pegarInputs, pegarDadosRotina2, pegarDadosRotina1, adicionarFuncionalidadeRangeInput, mostrarInputs, objeto, pegarDados }