function pegarDadosRotina1(index) {
    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']

    return {
        areaConcreto: dadosRotina1['area'],
        centroide: dadosRotina1['ixg'],
        w1: dadosRotina1['w1'],
        w2: dadosRotina1['w2'],
        ixg: dadosRotina1['ixg'],
        tipo: dadosRotina1['tipo'],
        h: Number(dadosRotina1['dados']['h'])
    }
}

function pegarDadosRotina2(index) {
    const dadosRotina2 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']

    return {
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

function pegarDadosRotina3(index) {
    const dadosRotina3 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']

    return {
        fck: Number(dadosRotina3['fck']),
        Ap: dadosRotina3['Ap'],
        ep: dadosRotina3['secoes'].map(el => el['ep']),
        vao: Number(dadosRotina3['secoes'][0]['Vao']),
        secoes: dadosRotina3['secoes'].map(el => el['X']),
        tipoProtensao: dadosRotina3['tipoProtensao'],
        dlinhaProtensao: dadosRotina3['secoes'][0]['posicaoCaboProtensao']['meioVao'],
        fptk: dadosRotina3['tensaoCaracteristicaTracao']
    }
}

function pegarDadosRotina4(index) {
    const dadosRotina4 = dadosSalvosdaRotina5[index]['dadosRotina4']

    return {
        perdaAtrito: dadosRotina4['perdaAtrito'],
        perdaAncoragem: dadosRotina4['perdaAncoragem'],
        perdaEncurtamento: dadosRotina4['perdaEncurtamento'],
        perdaFinal: dadosRotina4['perdaFinal'],
        dataProtensao: dadosRotina4['dataProtensao'],
        anguloAlfa: dadosRotina4['anguloAlfa']
    }
}

function pegarDadosRotina5(index) {
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
        sigmac2: dadosRotina5['sigmac2'],
        fctmj: dadosRotina5['fctmj'],
        fctm: dadosRotina5['fctm']
    }
}

function calcularLinhaNeutra(tipo, sigmacd, fpyd, Ap, ds, dp, Mdmax, index, fyd, AsLinha) {

    AsLinha = 0
    // AsLinha já está em m²
    Ap = Ap / 1000000 // m²
    ds = ds / 100 // m
    dp = dp / 100 // m
    sigmacd = sigmacd * 1000000 // N / m²
    fpyd = fpyd * 1000000 // N / m²
    Mdmax = Mdmax * 1000 // N * m
    fyd = fyd * 1000000 // Pa

    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']['dados']

    if (tipo == 'T' || tipo == 'I') {

        let { bf, hf, bw, h, bmis, hmis } = dadosRotina1

        bf = bf / 100
        hf = hf / 100
        bw = bw / 100
        h = h / 100
        bmis = bmis / 100
        hmis = hmis / 100

        
        const a = - 0.32 * sigmacd * bf
        const b = 0.8 * sigmacd * bf * ds
        const c = (AsLinha * fyd * (ds - 0.05)) + (- fpyd * Ap * (ds - dp)) - Mdmax

        console.log(a,b,c)

        return bhaskara(a, b, c)
    }
}

function calcularLinhaNeutraAlma(tipo, sigmacd, fpyd, Ap, ds, dp, Mdmax, index, fyd, AsLinha = 0) {

    AsLinha = 0
    // AsLinha já está em m²
    Ap = Ap / 1000000 // m²
    ds = ds / 100 // m
    dp = dp / 100 // m
    sigmacd = sigmacd * 1000000 // N / m²
    fpyd = fpyd * 1000000 // N / m²
    Mdmax = Mdmax * 1000 // N * m
    fyd = fyd * 1000000 // Pa

    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']['dados']

    if (tipo == 'T' || tipo == 'I') {

        let { bf, hf, bw, h, bmis, hmis } = dadosRotina1

        bf = bf / 100
        hf = hf / 100
        bw = bw / 100
        h = h / 100
        bmis = bmis / 100
        hmis = hmis / 100

       
        const a = - 0.32 * sigmacd * bw
        const b = 0.8 * sigmacd * bw * ds
        const c = (hf * sigmacd * (bf - bw) * (ds - (hf / 2))) + (AsLinha * fyd * (ds - 0.05)) + (- fpyd * Ap * (ds - dp)) - Mdmax

        console.log(a, b, c)

        return bhaskara(a, b, c)
    }

}

function pegarDistanciasRotina1(index) {

    const dadosRotina1 = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']['dados']
    const tipo = dadosSalvosdaRotina5[index]['dadosRotina4']['dadosSalvosdaRotina3']['rotina2']['rotina1']['tipo']

    if (tipo == 'T' || tipo == 'I') {

        let { bf, hf, bw, h, bmis, hmis } = dadosRotina1

        return {
            bf: bf,
            hf: hf,
            bw: bw,
            h: h,
            bmis: bmis,
            hmis: hmis
        }
    } else if (tipo == 'Rentangular') {

        let { b, h } = dadosRotina1

        return {
            b: b,
            h: h
        }
    } else { console.log('Erro ao definir a geometria da figura') }
}

function calcularfyd(number) {
    return number / 1.15
}

function bhaskara(a, b, c) {
    //ax² + bx + c = 0

    const delta = (b ** 2) - 4 * a * c
    const raiz1 = (- b + Math.sqrt(delta)) / (2 * a)
    console.log(raiz1)
    if(typeof raiz1 !== 'number'){
        raiz1 = -1
    }
    const raiz2 = (- b - Math.sqrt(delta)) / (2 * a)
    console.log(raiz2)
    if(typeof raiz2 !== 'number'){
        raiz2 = -1
    }
    return [raiz1, raiz2]
}

function textoDescricaoArmaduraBordaSuperior(boolean, As = 0) {
    const ctnDescricao = document.getElementById('descricaoArmaduraSuperior')
    if (boolean == true) {
        ctnDescricao.innerHTML = `Como existam tensões de tração na borda superior no ato da protensão, é necessário calcular uma armadura para resistir a esses esforços, a armadura calculada é de: ${As} cm², a distância entre a face superior e a armadura na borda superior será de <input type='number' value='5'> cm`
    } else if (boolean == false) {
        ctnDescricao.innerHTML = 'Como não existem tensões de tração na borda superior no ato da protensão, não é necessário calcular uma armadura passiva nessa região'
    }
}

function armaduraTracaoAtoProtensao(h, bf, arrTensoes1, arrTensoes2) {

    h = h / 100
    bf = bf / 100

    arrTensoes1 = arrTensoes1.map(el=>el * 1000000)
    arrTensoes2 = arrTensoes2.map(el=>el * 1000000)

    //Tem que verificar se a posição crítica será sempre no meio do vão
    const posicaoCritica = Math.floor(Number(arrTensoes1.length) / 2)

    const tensaoCriticaBordaSuperior = arrTensoes2[posicaoCritica]
    const tensaoCriticaBordaInferior = arrTensoes1[posicaoCritica]

    const x = (h * tensaoCriticaBordaSuperior) / (tensaoCriticaBordaSuperior - tensaoCriticaBordaInferior)
    console.log(x)
    const Rct = (x * tensaoCriticaBordaSuperior * bf) / 2
    console.log(Rct)
    const As = Rct / 250000000 //em m²
    console.log(As)

    return As
}

function verificarLinhaNeutra(arr) {
    //Verifica as duas raizes e analisa qual delas se deve utilizar, verifica se existe alguma negativa, caso não exista a rotina pega o menor valor
    if (arr[0] < 0) {
        return arr[1]
    } else if (arr[1] < 0) {
        return arr[0]
    } else {
        var menor = arr[0] < arr[1] ? arr[0] : arr[1]
    }
    return menor
}

function verificarTensoesTracao(arr) {
    return arr.some((element) => {
        if (element > 0) {
            return true
        }
    })
}

function calcularArmaduraLongitudinal(bf, bw, hf, sigmacd, Ap, fpyd, fyd){
    bf = bf/100
    bw = bw/100
    sigmacd = sigmacd * 1000000
    Ap = Ap/1000000
    fpyd = fpyd * 1000000
    fyd = fyd * 1000000
    
    const As = (((bf - bw) * hf *sigmacd) + (0.8 * bw * sigmacd) + (-Ap * fpyd))/fyd

    return As
}

function calcularArmaduraMinimaLongitudinal(fctmj, w1, bf, ds, sigmacd, fyd, Ac){
    
    fctmj = fctmj * 1000000
    bf = bf / 100
    ds = ds / 100
    sigmacd = sigmacd * 1000000
    fyd = fyd * 1000000
    Ac = Ac / 10000

    const fctksup = 1.3 * fctmj

    const momentoProjetoMinimo = Math.abs(0.8 * w1 * fctksup)
    const momentoFletorReduzido = momentoProjetoMinimo/(bf * ds * ds * sigmacd)
    const posicaoRelativaLinhaNeutra = 1.25 * (1 - Math.sqrt(1 - 2 * momentoFletorReduzido))
    const areaEstimadaArmadura = 0.8 * posicaoRelativaLinhaNeutra * bf * ds * (sigmacd/fyd)
    const areaMinimaAdotada = Math.max(areaEstimadaArmadura, 0.15 * Ac)
}

function calcularForcaNormalProtensao(perdaFinal, anguloAlfa){
    let FNP = []
    for(let i = 0; i < perdaFinal.length; i++){
        FNP[i] = perdaFinal[i] * Math.cos(anguloAlfa[i])
    }
    return FNP
}

function calcularForcaVerticalProtensao(perdaFinal, anguloAlfa){
    let FVP = []
        for(let i = 0; i < perdaFinal.length; i++){
            FVP[i] = perdaFinal[i] * Math.abs(Math.sin(anguloAlfa[i]))
    }
    return FVP
}

function calcularEsforcoCortante(carga, secoes, vao){
    let arrEsforcoCortante = []
    for(let i = 0; i < secoes.length; i++){
        arrEsforcoCortante[i] = ((((carga * vao )/ 2) - (carga * secoes[i]))) * 1000
    }

    return arrEsforcoCortante
}

function calcularEsforcoCortanteReduzidoProjeto(gamag1, gamag2, gamaq, esforcoCortanteCarregamentoPermanenteg1, esforcoCortanteCarregamentoPermanenteg2, esforcoCortanteCarregamentoVariavel, FVP){
    FVP = FVP.map(el => el * 1000)
    let esforcoCortanteReduzidoProjeto = []
    for(let i = 0; i < esforcoCortanteCarregamentoPermanenteg1.length; i++){
        esforcoCortanteReduzidoProjeto[i] = (gamag1 * esforcoCortanteCarregamentoPermanenteg1[i]) + (gamag2 * esforcoCortanteCarregamentoPermanenteg2[i]) + (gamaq * esforcoCortanteCarregamentoVariavel[i]) - (0.9 * FVP[i])
    }
    return esforcoCortanteReduzidoProjeto   
}

function calcularTensaoConvencional(esforcoCortanteReduzidoProjeto, bwcorrigido, ds){

    ds = ds/100

    console.log(esforcoCortanteReduzidoProjeto, bwcorrigido, ds)

    const tensaoConvencional = []
    for(let i = 0; i < esforcoCortanteReduzidoProjeto.length; i++){
        tensaoConvencional[i] = esforcoCortanteReduzidoProjeto[i] / (bwcorrigido * ds)
    }
    return tensaoConvencional
}

function compararTensoesEsforcoCortante(tauwd, tauwu){

    tauwd = tauwd.map(el => el / 1000000)
    tauwu = tauwu / 1000000

    for(let i = 0; i < tauwd.length; i++){
        if(tauwd[i] > tauwu){
            return {
                estado: false,
                msg: `A tensão convencional na seção ${i} foi superior a tensão limite, ${tauwd[i].toFixed(2)} é superior a ${tauwu[i].toFixed(2)}`
            }
        }
    }
    return {
        estado: true,
        msg: 'Não houve problema ao verificar as tensões nas bielas na viga'
    }
}

function calcularMomentoAnulaTensaoCompressao(FNP, areaConcreto, ep, w1){

    console.log(FNP, areaConcreto, ep, w1)
    FNP = FNP.map(el => el * 1000)

    areaConcreto = areaConcreto / 10000 // m²
    w1 = w1 / 1000000 // m³

    const momento0 =  - 0.9 * FNP[0] * (((1 / areaConcreto) + (ep[0] / w1)) * w1) // N * m

    return momento0    
}

function calcularCoeficienteCorrecao(momentoAnulaTensaoCompressao, Mdmax){
    Mdmax = Mdmax * 1000 // N
    const coeficiente = Math.min(0.09 * (1 + (momentoAnulaTensaoCompressao/Mdmax)),0.18)
    return coeficiente
}

function calculartaud(tauwd, tauC){
    const maxtauwd = Math.max(...tauwd)
    const taud = Math.max(1.11 * (maxtauwd - tauC), 0)
    return taud
}

function calcularTaxaArmaduraTransversal(taud, fyd, fctm){
    fyd = fyd / 1000000
    fctm = fctm / 1000000

    console.log(taud, fyd, fctm)

    //REVER A PARCELA 1 ESTÁ COM RESULTADO DIFERENTE DO ESPERADO
    const parcela1 = taud/fyd
    const parcela2 = (0.2 * fctm)/fyd
    console.log('parcela1' + parcela1)
    console.log('parcela2' + parcela2)

    const taxaArmaduraTransversal = Math.max(parcela1, parcela2)

    return taxaArmaduraTransversal
}

function calcularAreaAco(taxaArmaduraTransversal, bw){

    console.log(taxaArmaduraTransversal, bw)
    const areaAco = taxaArmaduraTransversal * bw * 100
    return areaAco / 10000
}


export { calcularAreaAco, calcularTaxaArmaduraTransversal, calculartaud, calcularCoeficienteCorrecao, calcularMomentoAnulaTensaoCompressao, compararTensoesEsforcoCortante, calcularTensaoConvencional, calcularEsforcoCortanteReduzidoProjeto, calcularEsforcoCortante, calcularForcaNormalProtensao, calcularForcaVerticalProtensao ,calcularArmaduraMinimaLongitudinal, calcularArmaduraLongitudinal, calcularLinhaNeutraAlma, calcularfyd, verificarLinhaNeutra, pegarDistanciasRotina1, verificarTensoesTracao, armaduraTracaoAtoProtensao, textoDescricaoArmaduraBordaSuperior, calcularLinhaNeutra, bhaskara, pegarDadosRotina1, pegarDadosRotina2, pegarDadosRotina3, pegarDadosRotina4, pegarDadosRotina5 }