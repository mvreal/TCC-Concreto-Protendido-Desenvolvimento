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
        dlinhaProtensao: dadosRotina3['secoes'][0]['posicaoCaboProtensao']['meioVao'],
        fptk: dadosRotina3['tensaoCaracteristicaTracao']
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

function pegarDadosRotina5(index){
    const dadosRotina5 = dadosSalvosdaRotina5[index]['dadosRotina5']


    return {
        indexRotina5: dadosRotina5['index'],
        limiteInferiorc1: dadosRotina5['limiteInferiorc1'],
        limiteInferiorc2: dadosRotina5['limiteInferiorc2'],
        limiteSuperiorc1: dadosRotina5['limiteSuperiorc1'], 
        limiteSuperiorc2: dadosRotina5['limiteSuperiorc2'],
        sigmaInferiorc1: dadosRotina5['sigmaInferiorc1'],
        sigmaInferiorc2: dadosRotina5['sigmaInferiorc2'],
        sigmaSuperiorc1: dadosRotina5['sigmaSuperiorc1'],
        sigmaSuperiorc2: dadosRotina5['sigmaSuperiorc2'],
        sigmac1: dadosRotina5['sigmac1'],
        sigmac2: dadosRotina5['sigmac2']
    }
}

function calcularLinhaNeutra(tipo, sigmacd, fpyd, Ap, ds, dp, Mdmax, index, fyd, AsLinha = 0){

    // AsLinha já está em m²
    Ap = Ap / 1000000 // m²
    ds = ds / 100 // m
    dp = dp / 100 // m
    sigmacd = sigmacd * 1000000 // N / m²
    fpyd = fpyd * 1000000 // N / m²
    Mdmax = Mdmax * 1000 // N * m

    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']['dados']

    if(tipo == 'T' || tipo == 'I'){
        
        let {bf, hf, bw, h, bmis, hmis} = dadosRotina1
        
        bf = bf/100
        hf = hf/100
        bw = bw/100
        h = h/100
        bmis = bmis/100
        hmis = hmis/100

        //Tem que corrigir as unidades
        const a = - 0.32 * sigmacd * bw
        const b = 0.8 * sigmacd * bw * ds
        const c = (hf * sigmacd * (bf - bw) * (ds - (hf / 2))) + (AsLinha * fyd * (ds - 0.05)) (- fpyd * Ap * (ds - dp)) - Mdmax

        console.log(a,b,c)
        
        return bhaskara(a, b, c)  
    }
}

function pegarDistanciasRotina1(index){
    
    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']['dados']

    if(tipo == 'T' || tipo == 'I'){ 

        let {bf, hf, bw, h, bmis, hmis} = dadosRotina1
        
        return {
            bf: bf,
            hf: hf,
            bw: bw,
            h: h,
            bmis: bmis,
            hmis: hmis
        }
    }else if(tipo == 'Rentangular'){

        let {b, h} = dadosRotina1
        
        return {
            b: b,
            h: h
        }
    }else{console.log('Erro ao definir a geometria da figura')}
}

function calcularfyd(number){
    return number / 1.15
}

function bhaskara(a, b, c){
    //ax² + bx + c = 0

    const delta = (b ** 2) - 4 * a * c
    const raiz1 = (- b + Math.sqrt(delta)) / (2 * a)
    const raiz2 = (- b - Math.sqrt(delta)) / (2 * a)
    return [raiz1, raiz2]
}

function textoDescricaoArmaduraBordaSuperior(boolean, As = 0){
    const ctnDescricao = document.getElementById('descricaoArmaduraSuperior')
    if(boolean == true){
        ctnDescricao.innerHTML = `Como existam tensões de tração na borda superior no ato da protensão, é necessário calcular uma armadura para resistir a esses esforços, a armadura calculada é de: ${As} cm², a distância entre a face superior e a armadura na borda superior será de <input type='number' value='5'> cm` 
    }else if(boolean == false){
        ctnDescricao.innerHTML = 'Como não existem tensões de tração na borda superior no ato da protensão, não é necessário calcular uma armadura passiva nessa região' 
    }
}

function armaduraTracaoAtoProtensao(h, bf, arrTensoes1, arrTensoes2){

    h = h / 100
    bf = bf / 100

    //Tem que verificar se a posição crítica será sempre no meio do vão
    const posicaoCritica = Math.floor(Number(arrTensoes1.length)/2)

    const tensaoCriticaBordaSuperior = arrTensoes2[posicaoCritica]
    const tensaoCriticaBordaInferior = arrTensoes1[posicaoCritica]

    const x = (h * tensaoCriticaBordaSuperior) / (tensaoCriticaBordaSuperior - tensaoCriticaBordaInferior)
    const Rct = (x * tensaoCriticaBordaSuperior * bf) / 2
    const As = Rct / 25000000 //em m²

    return As
}

function verificarLinhaNeutra(arr){
    //Verifica as duas raizes e analisa qual delas se deve utilizar, verifica se existe alguma negativa, caso não exista a rotina pega o menor valor
    if(arr[0] < 0){
        return arr[1]
    }else if(arr[1] < 0){
        return arr[0]
    }else{
        var menor = arr[0] < arr[1] ? arr[0] : arr[1]
    }
    return menor
}

function verificarTensoesTracao(arr){
    return arr.some((element)=>{
        if(element > 0){
            return true
        }
    })
}

 export { verificarLinhaNeutra, pegarDistanciasRotina1, verificarTensoesTracao, armaduraTracaoAtoProtensao, textoDescricaoArmaduraBordaSuperior, calcularLinhaNeutra, bhaskara, pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4, pegarDadosRotina5 }