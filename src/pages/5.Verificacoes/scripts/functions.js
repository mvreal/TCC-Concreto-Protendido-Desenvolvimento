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
        psi1: dadosRotina2['&#936<sub>1</sub>'],
        psi2: dadosRotina2['&#936<sub>2</sub>'],
        g1: dadosRotina2['g<sub>1</sub>'],
        g2: dadosRotina2['g<sub>2</sub>'],
        q: dadosRotina2['q']
    }
}

function pegarDadosRotina3(index){
    const dadosRotina3 = dadosSalvosdaRotina4[index]['dadosSalvosdaRotina3']

    return{
        fck: dadosRotina3['fck'],
        Ap: dadosRotina3['Ap'],
        ep: dadosRotina3['secoes'].map(el=>el['ep']),
        vao: dadosRotina3['secoes'][0]['Vao'],
        secoes: dadosRotina3['secoes'].map(el=>el['X'])
    }
}

function pegarDadosRotina4(index){
    const dadosRotina4 = dadosSalvosdaRotina4[index]

    return{
        perdaAtrito: dadosRotina4['perdaAtrito'],
        perdaAncoragem: dadosRotina4['perdaAncoragem'],
        perdaEncurtamento: dadosRotina4['perdaEncurtamento'],
        perdaFinal: dadosRotina4['perdaFinal']
    }
}

export { pegarDadosRotina4, pegarDadosRotina3, pegarDadosRotina2, pegarDadosRotina1, calcularSigmac1, calcularSigmac2, calcularMomentoFletor, criaroption }