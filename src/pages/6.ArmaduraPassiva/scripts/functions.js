
function pegarDadosRotina1(index){
    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']
    
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
    const dadosRotina2 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']

    return{
        psi1: Number(dadosRotina2['&#936<sub>1</sub>']),
        psi2: Number(dadosRotina2['&#936<sub>2</sub>']),
        g1: dadosRotina2['g<sub>1</sub>'],
        g2: dadosRotina2['g<sub>2</sub>'],
        q: dadosRotina2['q']
    }
}

function pegarDadosRotina3(index){
    const dadosRotina3 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']

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
    const dadosRotina4 = dadosSalvosdaRotina5[index]['dadosRotina4']

    return{
        perdaAtrito: dadosRotina4['perdaAtrito'],
        perdaAncoragem: dadosRotina4['perdaAncoragem'],
        perdaEncurtamento: dadosRotina4['perdaEncurtamento'],
        perdaFinal: dadosRotina4['perdaFinal'],
        dataProtensao: dadosRotina4['dataProtensao']
    }
}

export { pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4 }