function calcularMomentoFletor(peso, vao, secoes){
    let momentoFletorViga = secoes.map(sec => (peso * vao * sec/2) - (peso * (sec ** 2)/2))
    return momentoFletorViga
}

function criaroption(arr){
    const quantidadeOption = arr.length
    const select = document.getElementById('situacoes')

    arr.forEach((element, index)=>{
        const criarOption = document.createElement('option')
        select.appendChild(criarOption)
        criarOption.innerText = 'Id:' + index
        criarOption.value = index
    })
}

function calcularSigmac1(P0, Ac, ep, w1, Mg1){
    let sigmac1 = []

    P0 = P0.map(el => el * 1000) // convertendo para N
    Ac = Ac / 10000 // convertendo para m² 
    w1 = w1 / 1000000 //convertendo para m³
    Mg1 = Mg1.map(el => el * 1000) //convertendo para N * m 


    for(let i = 0; i < P0.length; i++){
        sigmac1[i] = (-1.1 * P0[i] * ((1 / Ac) + (ep[i] / w1))) - (Mg1[i] / w1)
    }
    return sigmac1.map(el => el / 1000000)
}

function calcularSigmac2(P0, Ac, ep, w2, Mg1){
    let sigmac2 = []

    P0 = P0.map(el => el * 1000) // convertendo para N
    Ac = Ac / 10000 // convertendo para m² 
    w2 = w2 / 1000000 //convertendo para m³
    Mg1 = Mg1.map(el => el * 1000) //convertendo para N * m 
    
    for(let i = 0; i < P0.length; i++){
        sigmac2[i] = (-1.1 * P0[i] * ((1 / Ac) + (ep[i] / w2))) - (Mg1[i] / w2)
    }
    return sigmac2.map(el => el / 1000000)
}

function pegarDadosRotina1(index){
    const dadosRotina1 = dadosSalvosdaRotina4[index]['dadosSalvosdaRotina3']['rotina2']['rotina1']
    return{
        areaConcreto: dadosRotina1['area'],
        centroide: dadosRotina1['ixg'],
        w1: dadosRotina1['w1'],
        w2: dadosRotina1['w2'],
        ixg: dadosRotina1['ixg'],
        tipo: dadosRotina1['tipo']
    }
}

function pegarDadosRotina2(index){
    const dadosRotina2 = dadosSalvosdaRotina4[index]['dadosSalvosdaRotina3']['rotina2']

    return{
        psi1: Number(dadosRotina2['&#936<sub>1</sub>']),
        psi2: Number(dadosRotina2['&#936<sub>2</sub>']),
        g1: dadosRotina2['g<sub>1</sub>'],
        g2: dadosRotina2['g<sub>2</sub>'],
        q: dadosRotina2['q']
    }
}

function pegarDadosRotina3(index){
    const dadosRotina3 = dadosSalvosdaRotina4[index]['dadosSalvosdaRotina3']

    return{
        fck: Number(dadosRotina3['fck']),
        Ap: dadosRotina3['Ap'],
        ep: dadosRotina3['secoes'].map(el=>el['ep']),
        vao: dadosRotina3['secoes'][0]['Vao'],
        secoes: dadosRotina3['secoes'].map(el => el['X']),
        tipoProtensao: dadosRotina3['tipoProtensao']
    }
}

function pegarDadosRotina4(index){
    const dadosRotina4 = dadosSalvosdaRotina4[index]

    return{
        perdaAtrito: dadosRotina4['perdaAtrito'],
        perdaAncoragem: dadosRotina4['perdaAncoragem'],
        perdaEncurtamento: dadosRotina4['perdaEncurtamento'],
        perdaFinal: dadosRotina4['perdaFinal'],
        dataProtensao: dadosRotina4['dataProtensao']
    }
}

function escreverSigmac1Sigmac2(sigmac1, sigmac2, secoes){
    const divSigmac1 = document.getElementById('sigmac1')
    const divSigmac2 = document.getElementById('sigmac2')
    const repeticoes = sigmac1.length

    let txtSigmac1 = ''
    let txtSigmac2 = ''

    for(let i = 0; i < repeticoes; i++){
        txtSigmac1 += 'Seção: ' + secoes[i] + 'm - ' + sigmac1[i].toFixed(2) + ' MPa' + '</br>' 
        txtSigmac2 += 'Seção: ' + secoes[i] + 'm - ' + sigmac2[i].toFixed(2) + ' MPa' + '</br>' 
    }
    divSigmac1.innerHTML = txtSigmac1
    divSigmac2.innerHTML = txtSigmac2
}

function calcularFckjFctj(fck, j){
    const fckj = fck * (Math.E ** ((0.2) * (1 - Math.sqrt(28 / j))))
    const fctmj = 0.3 * (fckj)**(2/3)
    
    return [fckj, fctmj]
}

function limitesSigmac1Sigmac2(fckj, fctmj){
    const limiteSigmac1 = 0.7 * fckj
    const limiteSigmac2 = 1.2 * fctmj

    return [limiteSigmac1, limiteSigmac2]
}

function escreverLimitesAtoProtensao(limiteSigmac1, limiteSigmac2){
    const txtLimiteSigmac1 = document.getElementById('adicionarTxtSigmac1')
    const txtLimiteSigmac2 = document.getElementById('adicionarTxtSigmac2')

    txtLimiteSigmac1.innerHTML = ` = -${limiteSigmac1.toFixed(2)} MPa`
    txtLimiteSigmac2.innerHTML = ` = ${limiteSigmac2.toFixed(2)} MPa`
}

function escreverCombinacao(tipoProtensao){

    const tituloServico = document.getElementById('adicionarTextoTituloServico')
    const tituloCombinacao1 = document.getElementById('tituloCombinacao1Servico')
    const tituloCombinacao2 = document.getElementById('tituloCombinacao2Servico')

    let adicionarTxtTitulo


    if(tipoProtensao == 'limitada'){
        tituloCombinacao1.innerText = 'ELS-F: Combinação frequente'
        tituloCombinacao2.innerText = 'ELS-D: Combinação quase permanente'
        adicionarTxtTitulo = ' 2 (protensão limitada)'
    }else if(tipoProtensao == 'completa'){
        tituloCombinacao1.innerText = 'ELS-F: Combinação rara'
        tituloCombinacao2.innerText = 'ELS-D: Combinação frequente'
        adicionarTxtTitulo = ' 3 (protensão completa)'
    }else{
        console.log('Erro ao importar o dado do tipo de protensão')
    }
    tituloServico.innerText = adicionarTxtTitulo
}

function calcularCombinacoesProtensaoCompleta(Pinf, Ac, ep, w1, w2, psi1, psi2, Mg, Mq, fctm, fck){
    //Combinação Rara - R Frequente F
    let sigmac1R = []
    let sigmac2R = []
    let sigmac1F = []
    let sigmac2F = []

    let limiteSigmac1R, limiteSigmac2R, limiteSigmac1F, limiteSigmac2F

    Pinf = Pinf.map(el => el * 1000) // convertendo para N
    Ac = Ac / 10000 // convertendo para m² 
    w1 = w1 / 1000000 //convertendo para m³
    w2 = w2 / 1000000 //convertendo para m³
    Mg = Mg.map(el => el * 1000) //convertendo para N * m 
    Mq = Mq.map(el => el * 1000) //convertendo para N * m 

    for(let i = 0; i < Pinf.length; i++){

        sigmac1R[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w1))) - ((Mg[i] + Mq[i]) / w1)
        sigmac2R[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w2))) - ((Mg[i] + Mq[i]) / w2)

        sigmac1F[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w1))) - ((Mg[i] + (psi1 * Mq[i])) / w1)
        sigmac2F[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w2))) - ((Mg[i] + (psi1 * Mq[i])) / w2)
    }

    limiteSigmac1R = fctm
    limiteSigmac2R = -0.7 * fck

    limiteSigmac1F = 0
    limiteSigmac2F = -0.7 * fck

    return{
        sigmac1R: sigmac1R,
        sigmac2R: sigmac2R,
        sigmac1F: sigmac1F,
        sigmac2F: sigmac2F,
        limiteSigmac1R: limiteSigmac1R,
        limiteSigmac2R: limiteSigmac2R,
        limiteSigmac1F: limiteSigmac1F,
        limiteSigmac2F: limiteSigmac2F
    }
}

function escreverSigmasLimitesCompleta(sigmac1R, sigmac2R, sigmac1F, sigmac2F, limiteSigmac1R, limiteSigmac2R, limiteSigmac1F, limiteSigmac2F){

    //Entrada em N * m - Limites em MPa
    sigmac1R = sigmac1R.map(el => el/1000000)
    sigmac2R = sigmac2R.map(el => el/1000000)
    sigmac1F = sigmac1F.map(el => el/1000000)
    sigmac2F = sigmac2F.map(el => el/1000000)

    let sigmac1ServicoCombinacao1 = document.getElementById('sigmac1ServicoCombinacao1') //Array com sigmac1 frequente
    let adicionarTxtSigmac1ServicoCombinacao1 = document.getElementById('adicionarTxtSigmac1ServicoCombinacao1')
    let sigmac2ServicoCombinacao1 = document.getElementById('sigmac2ServicoCombinacao1')
    let adicionarTxtSigmac2ServicoCombinacao1 = document.getElementById('adicionarTxtSigmac2ServicoCombinacao1')

    let sigmac1ServicoCombinacao2 = document.getElementById('sigmac1ServicoCombinacao2')
    let adicionarTxtSigmac1ServicoCombinacao2 = document.getElementById('adicionarTxtSigmac1ServicoCombinacao2')
    let sigmac2ServicoCombinacao2 = document.getElementById('sigmac2ServicoCombinacao2')
    let adicionarTxtSigmac2ServicoCombinacao2 = document.getElementById('adicionarTxtSigmac2ServicoCombinacao2')

    let txtadicionado11 = ''
    let txtadocionado12 = ''
    let txtadicionado21 = ''
    let txtadocionado22 = ''

    for(let i = 0; i < sigmac1R.length; i++){
        txtadicionado11 += sigmac1R[i].toFixed(2) + ' MPa' + '</br>'
        txtadocionado12 += sigmac2R[i].toFixed(2) + ' MPa' + '</br>'
        txtadicionado21 += sigmac1F[i].toFixed(2) + ' MPa' + '</br>'
        txtadocionado22 += sigmac2F[i].toFixed(2) + ' MPa' + '</br>'
    }

    sigmac1ServicoCombinacao1.innerHTML = txtadicionado11
    sigmac2ServicoCombinacao1.innerHTML = txtadocionado12
    sigmac1ServicoCombinacao2.innerHTML = txtadicionado21
    sigmac2ServicoCombinacao2.innerHTML = txtadocionado22

    adicionarTxtSigmac1ServicoCombinacao1.innerText = limiteSigmac1R.toFixed(2) + ' MPa'
    adicionarTxtSigmac2ServicoCombinacao1.innerText = limiteSigmac2R.toFixed(2) + ' MPa'
    adicionarTxtSigmac1ServicoCombinacao2.innerHTML = `f<sub>ctm</sub> = ${limiteSigmac1F.toFixed(2)} MPa`
    adicionarTxtSigmac2ServicoCombinacao2.innerHTML = `0.70 f<sub>ck</sub> = ${limiteSigmac2F.toFixed(2)} MPa`
}

function calcularCombinacoesProtensaoLimitada(Pinf, Ac, ep, w1, w2, psi1, psi2, Mg, Mq, fctm, fck){

    // Combinação quase permanente - QP Frequente - F
    let sigmac1QP = []
    let sigmac2QP = []
    let sigmac1F = []
    let sigmac2F = []
    let limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F

    Pinf = Pinf.map(el => el * 1000) // convertendo para N
    Ac = Ac / 10000 // convertendo para m² 
    w1 = w1 / 1000000 //convertendo para m³
    w2 = w2 / 1000000 //convertendo para m³
    Mg = Mg.map(el => el * 1000) //convertendo para N * m 
    Mq = Mq.map(el => el * 1000) //convertendo para N * m 

    for(let i = 0; i < Pinf.length; i++){

        sigmac1QP[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w1))) - ((Mg[i] + (psi2 * Mq[i])) / w1)
        sigmac2QP[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w2))) - ((Mg[i] + (psi2 * Mq[i])) / w2)

        sigmac1F[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w1))) - ((Mg[i] + (psi1 * Mq[i])) / w1)
        sigmac2F[i] = (-Pinf[i] * ((1 / Ac) + (ep[i] / w2))) - ((Mg[i] + (psi1 * Mq[i])) / w2)
    }

    limiteSigmac1QP = 0
    limiteSigmac2QP = -0.7 * fck

    limiteSigmac1F = fctm
    limiteSigmac2F = -0.7 * fck

    return {
        sigmac1QP: sigmac1QP, 
        sigmac2QP: sigmac2QP, 
        sigmac1F: sigmac1F, 
        sigmac2F: sigmac2F,
        limiteSigmac1QP: limiteSigmac1QP,
        limiteSigmac2QP: limiteSigmac2QP,
        limiteSigmac1F: limiteSigmac1F,
        limiteSigmac2F: limiteSigmac2F
    }
}

function escreverSigmasLimitesLimitada(sigmac1QP, sigmac2QP, sigmac1F, sigmac2F, limiteSigmac1QP, limiteSigmac2QP, limiteSigmac1F, limiteSigmac2F){
  
    //Entradas em N * m - Limites em MPa
    sigmac1QP = sigmac1QP.map(el => el/1000000)
    sigmac2QP = sigmac2QP.map(el => el/1000000)
    sigmac1F = sigmac1F.map(el => el/1000000)
    sigmac2F = sigmac2F.map(el => el/1000000)

    let sigmac1ServicoCombinacao1 = document.getElementById('sigmac1ServicoCombinacao1') //Array com sigmac1 frequente
    let adicionarTxtSigmac1ServicoCombinacao1 = document.getElementById('adicionarTxtSigmac1ServicoCombinacao1')
    let sigmac2ServicoCombinacao1 = document.getElementById('sigmac2ServicoCombinacao1')
    let adicionarTxtSigmac2ServicoCombinacao1 = document.getElementById('adicionarTxtSigmac2ServicoCombinacao1')

    let sigmac1ServicoCombinacao2 = document.getElementById('sigmac1ServicoCombinacao2')
    let adicionarTxtSigmac1ServicoCombinacao2 = document.getElementById('adicionarTxtSigmac1ServicoCombinacao2')
    let sigmac2ServicoCombinacao2 = document.getElementById('sigmac2ServicoCombinacao2')
    let adicionarTxtSigmac2ServicoCombinacao2 = document.getElementById('adicionarTxtSigmac2ServicoCombinacao2')

    let txtadicionado11 = ''
    let txtadocionado12 = ''
    let txtadicionado21 = ''
    let txtadocionado22 = ''

    for(let i = 0; i < sigmac1QP.length; i++){
        txtadicionado11 += sigmac1F[i].toFixed(2) + ' MPa' + '</br>'
        txtadocionado12 += sigmac2F[i].toFixed(2) + ' MPa' + '</br>'
        txtadicionado21 += sigmac1QP[i].toFixed(2) + ' MPa' + '</br>'
        txtadocionado22 += sigmac2QP[i].toFixed(2) + ' MPa' + '</br>'
    }

    sigmac1ServicoCombinacao1.innerHTML = txtadicionado11
    sigmac2ServicoCombinacao1.innerHTML = txtadocionado12
    sigmac1ServicoCombinacao2.innerHTML = txtadicionado21
    sigmac2ServicoCombinacao2.innerHTML = txtadocionado22

    adicionarTxtSigmac1ServicoCombinacao1.innerText = limiteSigmac1F.toFixed(2) + ' MPa'
    adicionarTxtSigmac2ServicoCombinacao1.innerText = limiteSigmac2F.toFixed(2) + ' MPa'
    adicionarTxtSigmac1ServicoCombinacao2.innerHTML = `f<sub>ctm</sub> = ${limiteSigmac1QP.toFixed(2)} MPa`
    adicionarTxtSigmac2ServicoCombinacao2.innerHTML = `0.70 f<sub>ck</sub> = ${limiteSigmac2QP.toFixed(2)} MPa`


}

function salvarDados(sigmaInferiorc1, sigmaSuperiorc1, sigmaInferiorc2, sigmaSuperiorc2, limiteInferiorc1, limiteSuperiorc1, limiteInferiorc2, limiteSuperiorc2, dadosSalvos, contador, sigmac1, sigmac2, fctmj, fctm){

    return{
        'dadosRotina5':{   
            index: contador,  
            sigmac1: sigmac1,
            sigmac2: sigmac2,  
            sigmaInferiorc1: sigmaInferiorc1,
            sigmaSuperiorc1: sigmaSuperiorc1,
            sigmaInferiorc2, sigmaInferiorc2,
            sigmaSuperiorc2, sigmaSuperiorc2,
            limiteInferiorc1: limiteInferiorc1,
            limiteSuperiorc1, limiteSuperiorc1,
            limiteInferiorc2, limiteInferiorc2,
            limiteSuperiorc2: limiteSuperiorc2,
            fctmj: fctmj,
            fctm: Number(fctm)
        },
        'dadosRotina4': dadosSalvos
    }
}

export { salvarDados, escreverSigmasLimitesCompleta, calcularCombinacoesProtensaoCompleta, escreverSigmasLimitesLimitada,calcularCombinacoesProtensaoLimitada, escreverCombinacao, escreverLimitesAtoProtensao, calcularFckjFctj, limitesSigmac1Sigmac2, escreverSigmac1Sigmac2, pegarDadosRotina4, pegarDadosRotina3, pegarDadosRotina2, pegarDadosRotina1, calcularSigmac1, calcularSigmac2, calcularMomentoFletor, criaroption }