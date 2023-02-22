
function pegarDadosRotina1(index){
    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']
    
    return{
        areaConcreto: dadosRotina1['area'],
        centroide: dadosRotina1['ixg'],
        w1: dadosRotina1['w1'],
        w2: dadosRotina1['w2'],
        ixg: dadosRotina1['ixg'],
        tipo: dadosRotina1['tipo'],
        h: Number(dadosRotina1['dados']['h'])
    }
}

function pegarDadosRotina2(index){
    const dadosRotina2 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']

    return{
        psi1: Number(dadosRotina2['&#936<sub>1</sub>']),
        psi2: Number(dadosRotina2['&#936<sub>2</sub>']),
        g1: dadosRotina2['g<sub>1</sub>'],
        g2: dadosRotina2['g<sub>2</sub>'],
        q: dadosRotina2['q'],
        'gamag1': Number(dadosRotina2['&#947<sub>g<sub>1</sub></sub>']),
        'gamag2': Number(dadosRotina2['&#947<sub>g<sub>2</sub></sub>']),
        'gamaq': Number(dadosRotina2['&#947<sub>q</sub>']),
    }
}

function pegarDadosRotina3(index){
    const dadosRotina3 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']

    return{
        fck: Number(dadosRotina3['fck']),
        Ap: dadosRotina3['Ap'],
        ep: dadosRotina3['secoes'].map(el=>el['ep']),
        vao: Number(dadosRotina3['secoes'][0]['Vao']),
        secoes: dadosRotina3['secoes'].map(el => el['X']),
        tipoProtensao: dadosRotina3['tipoProtensao'],
        dlinhaProtensao: dadosRotina3['secoes'][0]['posicaoCaboProtensao']['meioVao']
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

function calcularA(tipo, sigmacd, fpyd, Ap, ds, dp, Mdmax){
    if(tipo == 'T'){
        const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']['dados']

        const {bf, hf, bw, h, bmis, hmis} = dadosRotina1
        
        bf = bf/100
        hf = hf/100
        bw = bw/100
        h = h/100
        bmis = bmis/100
        hmis = hmis/100

        //Tem que corrigir as unidades
        const a = - 0.32 * sigmacd * bw
        const b = 0.8 * sigmacd * bw * ds
        const c = - fpyd * Ap * (ds - dp) - Mdmax
    }
}

export { pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4 }