import { calcularFct, pegarInputs, pegarDadosRotina2, pegarDadosRotina1, mostrarInputs, objeto, pegarDados } from "./functions.js"; 


function main(){
    
    const objetoSelecionado = objeto()
    console.log(objetoSelecionado)
    const { area, centroide, b, h, ixg, tipo, w1, w2 } = pegarDadosRotina1(objetoSelecionado)   
    const { vao, g1, g2, q, qsi1, qsi2, esfDistQuasePermanente, esfDistFrequente, esfDistRara} = pegarDadosRotina2(objetoSelecionado)
    const { input1, input2, fck, grauProtensao, numSecoes } = pegarInputs()
    const { fctm, fctk_inf, fct_f } = calcularFct(fck, tipo)

    console.log(fctm, fctk_inf, fct_f)

    let ponto1 = [0, input1 + centroide]
    let ponto2 = [vao/2,input2]
    let ponto3 = [vao, input1 + centroide]

    const n = input2
    const m = input1 + centroide
}
    

export { main }   



// //--------------------------------------------------------------------------------------------------------------------------------------



// let w1, w2, tipo, area, g1, g2, g, q, esfDistQuasePermanente, esfDistFrequente,esfDistRara, objRotina3, resultadosDaRotina3 = [], resFct, fct_f, contador = 0 //Apenas quando nao tem dados salvos --> depois tem que alterar a lógica
// let areaConvertida, w1Convertido, w2Convertido, completaELSDSorteado = []

// //Pegar o esforço distribuido em que a viga é sujeita nas combinacoes quase permanente e frequente

// let btnDimFinal = document.getElementById('btnDimFinal')
// btnDimFinal.addEventListener('click', dimensionarForcaFinal)

// function dimensionarForcaFinal(){


//     //Pegar o vao que eu quero dimensionar indexSelecionado
//     let vao = dadosSalvosdaRotina2[indexSelecionado]['Vao']
//     let secoes = Number(document.getElementById('subdivisoes-viga').value)
//     let dadosCombinacoes = dadosSalvosdaRotina2[indexSelecionado]['dados']
//     console.log(dadosSalvosdaRotina2)



//     esfDistQuasePermanente = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['quase-permanente']['cargaDistribuidaMaxima']
//     esfDistFrequente = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['frequente']['cargaDistribuidaMaxima']
//     esfDistRara = dadosSalvosdaRotina2[indexSelecionado]['combinacoes']['rara']['cargaDistribuidaMaxima']



//     w1 = PropriedadesDasFiguras[opcoesSalvasValue]['w1']
//     w2 = PropriedadesDasFiguras[opcoesSalvasValue]['w2']
//     w1Convertido = w1/1000000 //converção de cm³ para m³
//     w2Convertido = w2/1000000 //converção de cm³ para m³
//     area = PropriedadesDasFiguras[opcoesSalvasValue]['area'] //
//     areaConvertida = area/10000 //converção de cm² para m²
//     tipo = PropriedadesDasFiguras[opcoesSalvasValue]['tipo']

//     resFct = calcularFct() // depende do tipo
//     fct_f = Number(resFct['fct_f']) * 1000


//     //dadosSalvosdaRotina2[opcoesSalvasValue]
//     resultadosDaRotina3[contador] = new Array()
//     completaELSDSorteado[contador] = new Array()

//     for(let i = 0; i < secoes; i++){

//         let posicao = (i * vao)/(secoes - 1)
//         let equacaoDoCaboDeProtensao = ((-4*n + 4*m)/((vao**2)/100))*((posicao**2)/100) + (((4*n - 4*m)/(vao/100)) * (posicao/100)) + m

//         let momentoFrequente = (esfDistFrequente * vao * posicao/2) + (- esfDistFrequente * posicao * posicao/2)
//         let momentoQP = (esfDistQuasePermanente * vao * posicao/2) + (- esfDistQuasePermanente * posicao * posicao/2)
//         let momentoRara = (esfDistRara * vao * posicao/2) + (- esfDistRara * posicao * posicao/2)

//         let ep = (- centroide + equacaoDoCaboDeProtensao)/100
//        // let momentox = (combinacoes['ultima']['cargaDistribuidaMaxima'] * distReal/2) * ( - distReal + dados['vao'])
//        // vao é tudo e distancia real é a posicao

//        objRotina3 = {
//             'X': posicao,
//             'Vao':vao,
//             'CaboY': equacaoDoCaboDeProtensao,
//             'ep': ep, //Excentricidade em metros
//             'momentoQP': momentoQP,
//             'momentoFrequente': momentoFrequente,
//             'completa-ELS-D': momentoFrequente/(((1/areaConvertida) + (ep/w1Convertido)) * w1Convertido),
//             'completa-ELS-F': ((momentoRara/w1Convertido) + fct_f)/((1/areaConvertida) + (ep/w1Convertido)),
//             'limitada-ELS-D': momentoQP/(((1/areaConvertida) + (ep/w1Convertido)) * w1Convertido),
//             'limitada-ELS-F': ((momentoFrequente/w1Convertido) + fct_f)/((1/areaConvertida) + (ep/w1Convertido)),
//             'protensao': grauProtensao,
//             'posicaoCaboProtensao':{
//                 inicio: m,
//                 meioVao: n
//             },
//             'dadosCombinacoes':dadosCombinacoes
//        }

//         resultadosDaRotina3[contador].push(objRotina3)
//         completaELSDSorteado[contador] = [...resultadosDaRotina3[contador]]
//         completaELSDSorteado[contador] = completaELSDSorteado[contador].sort((c1, c2) => (c1['completa-ELS-D'] > c2['completa-ELS-D']) ? 1 : (c1['completa-ELS-D'] < c2['completa-ELS-D']) ? -1 : 0)
//     }

//     salvarResultados(contador)
//     contador++

// }


// let celulas, pegarUltimoRegistro

// function salvarResultados(contador){
//     resTBody = document.getElementById('res-tbody')

//     //Criando a linha inserindo no DOM
//     let createTr = document.createElement('tr')
//     resTBody.appendChild(createTr)
//     createTr.classList.add('linha'+(contador+1))

//     //Criando 9 células para os registros da seção 'Salvar'
//     for(let i = 0; i<9; i++){
//         let createTd = document.createElement('td')
//         createTr.appendChild(createTd)
//         createTd.classList.add('elemento' + (i+1))
//     }

//     celulas = document.querySelector('.linha'+(contador + 1)).children
//     pegarUltimoRegistro = resultadosDaRotina3[resultadosDaRotina3.length -1]

//     celulas[0].innerText = contador
//     celulas[1].innerText = pegarUltimoRegistro[0]['protensao']

//     let registros = []

//     if(pegarUltimoRegistro[0]['protensao'] == 'limitada'){
//       for(let i = 0; i<pegarUltimoRegistro.length; i++){
//         registros.push(pegarUltimoRegistro[i]['limitada-ELS-D'])
//         registros.push(pegarUltimoRegistro[i]['limitada-ELS-F'])
//       }
//       var registroMinimo = Math.min(...registros)
//       celulas[2].innerText = registroMinimo.toFixed(2) + ' kN'

//     }
//     if(pegarUltimoRegistro[0]['protensao'] == 'completa'){
//       for(let i = 0; i<pegarUltimoRegistro.length; i++){
//         registros.push(pegarUltimoRegistro[i]['completa-ELS-D'])
//         registros.push(pegarUltimoRegistro[i]['completa-ELS-F'])
//       }

//       var registroMinimo = Math.min(...registros)
//       celulas[2].innerText = registroMinimo.toFixed(2) + ' kN'
//     }

//     let perdasEmPorcentagem = Number(document.getElementById('inputPerdas').value)

//     let pZero = registroMinimo/(1-(perdasEmPorcentagem/100))
//     celulas[4].innerText = pZero.toFixed(2) + ' kN'

//     //Pegando o input do tipo de armadura de protensão
//     let valorArmaduraProtensao = document.getElementById('armadura-protensao').value
//     let resistenciaArmaduraProtensao = valorArmaduraProtensao.slice(0,3)
//     let diametrocabo = valorArmaduraProtensao.slice(4,8)
//     let areaArmaduraProtensao1cordoalha = Number(valorArmaduraProtensao.slice(9))

//     celulas[6].innerText = 'CP ' + resistenciaArmaduraProtensao + ' RB ' + diametrocabo
    
//     let numCordoalhas = numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero)[0]
//     let sigmapi = numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero)[1]

//     let numCordoalhasArredondado = Math.ceil(numCordoalhas)

//     celulas[7].innerText = numCordoalhasArredondado
//     celulas[8].innerHTML = `<select numero='${contador+1}'><option selected value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>`

//     celulas[3].innerText = -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * (sigmapi/1000) * (1-(perdasEmPorcentagem/100))).toFixed(2) + ' kN'
//     celulas[5].innerText = -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * sigmapi/1000).toFixed(2) + ' kN'

//     let numCabos = document.querySelector(`[numero="${(contador+1)}"]`).value
//     let fck = document.getElementById('fck').value

//     dadosFinal.push({
//         tensaoCaracteristicaTracao: Number(resistenciaArmaduraProtensao) * 10, 
//         id: contador,
//         areaArmaduraProtensao1cordoalha: areaArmaduraProtensao1cordoalha,
//         tipoProtensao: pegarUltimoRegistro[0]['protensao'],
//         pInfCalc: registroMinimo,
//         PInfProj: -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * (sigmapi/1000) * (1-(perdasEmPorcentagem/100))),
//         pIniCalc: pZero,
//         pIniProj: -(numCordoalhasArredondado * areaArmaduraProtensao1cordoalha * sigmapi/1000),
//         tipoArmadura: 'CP ' + resistenciaArmaduraProtensao + ' RB ' + diametrocabo,
//         numCordoalhasArredondado: numCordoalhasArredondado,
//         numCabos: numCabos,
//         secoes: resultadosDaRotina3[contador],
//         Ap: numCabos * numCordoalhasArredondado * areaArmaduraProtensao1cordoalha, //Ver a unidade
//         fck: fck,
//         rotina2: dadosSalvosdaRotina2[indexSelecionado]
        
//     })
    
//     enviarDados(dadosFinal)

//     celulas[8].addEventListener('change',(element)=>{
//         let el = element.target
//         let novoNumeroCabos = el.value
//         let linha = el.getAttribute('numero')

//         let PegarTd = [document.querySelector(`[class= "linha${(linha)}"]>[class="elemento4"]`), document.querySelector(`[class= "linha${(linha)}"]>[class="elemento6"]`),document.querySelector(`[class= "linha${(linha)}"]>[class="elemento8"]`)]

//         let TdForcaInfProjeto = PegarTd[0]
//         let TdForcaIniProjeto = PegarTd[1]
//         let TdNovoNumeroCordoalhas = PegarTd[2]

//         let novoResultado = numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero, novoNumeroCabos)
//         let novoNumCordoalhas = novoResultado[0]
//         let novoNumCordoalhasArredondado = Math.ceil(novoNumCordoalhas)
//         let novoSigmapi = novoResultado[1]

//         TdNovoNumeroCordoalhas.innerText = novoNumCordoalhasArredondado

//         TdForcaInfProjeto.innerText = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * (novoSigmapi/1000) * (1-(perdasEmPorcentagem/100))).toFixed(2) + ' kN'
//         TdForcaIniProjeto.innerText = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * sigmapi/1000).toFixed(2) + ' kN'

//         dadosFinal[(linha-1)]['PInfProj'] = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * (novoSigmapi/1000) * (1-(perdasEmPorcentagem/100)))
//         dadosFinal[(linha-1)]['pIniProj'] = - (novoNumCordoalhasArredondado * novoNumeroCabos * areaArmaduraProtensao1cordoalha * sigmapi/1000)
//         dadosFinal[(linha-1)]['numCabos'] = novoNumeroCabos
//         dadosFinal[(linha-1)]['numCordoalhasArredondado'] = novoNumCordoalhasArredondado
//         //Ainda não foi testado
//         dadosFinal[(linha-1)]['Ap'] = novoNumCordoalhasArredondado * novoNumeroCabos * dadosFinal[(linha-1)]['areaArmaduraProtensao1cordoalha']

//         enviarDados(dadosFinal)
//     })
// }

// function numeroCordoalhas(resistenciaArmaduraProtensao, areaArmaduraProtensao1cordoalha, pZero, pegarNumeroCabos = 1){
//     let sigmapi = 0.82 * 0.9 * Number(resistenciaArmaduraProtensao) * 10
//     let areaAcoProtendido = Number(-pZero * 10)/(sigmapi) //em cm²
//     let numeroCordoalhas = (areaAcoProtendido/(Number(areaArmaduraProtensao1cordoalha)/100))/pegarNumeroCabos
    
//     return [numeroCordoalhas,sigmapi]
// }

// function enviarDados(dados){
//     window.api.dadosRotina3(dados)
// }

// //Rotina para verificar se existem dados prévios

// function adicionarLinhasColunas(number){
//     resTBody = document.getElementById('res-tbody')

//     for(let i = 0; i<number; i++){
//     //Criando a linha inserindo no DOM
//     let createTr = document.createElement('tr')
//     resTBody.appendChild(createTr)
//     createTr.classList.add('linha'+(Number(contador)+1))

//     //Criando 9 células para os registros da seção 'Salvar'
//     for(let j = 0; j<9; j++){
//         let createTd = document.createElement('td')
//         createTr.appendChild(createTd)
//         createTd.classList.add('elemento' + (j+1))
//     }

//     pegarTrTd(contador+1,1).innerText = dadosSalvosdaRotina3[contador]['id']
//     pegarTrTd(contador+1,2).innerText = dadosSalvosdaRotina3[contador]['tipoProtensao']
//     pegarTrTd(contador+1,3).innerText = dadosSalvosdaRotina3[contador]['pInfCalc'].toFixed(2) + ' kN'
//     pegarTrTd(contador+1,4).innerText = dadosSalvosdaRotina3[contador]['PInfProj'].toFixed(2) + ' kN'
//     pegarTrTd(contador+1,5).innerText = dadosSalvosdaRotina3[contador]['pIniCalc'].toFixed(2) + ' kN'
//     pegarTrTd(contador+1,6).innerText = dadosSalvosdaRotina3[contador]['pIniProj'].toFixed(2) + ' kN'
//     pegarTrTd(contador+1,7).innerText = dadosSalvosdaRotina3[contador]['tipoArmadura']
//     pegarTrTd(contador+1,8).innerText = dadosSalvosdaRotina3[contador]['numCordoalhasArredondado']
//     pegarTrTd(contador+1,9).innerText = dadosSalvosdaRotina3[contador]['numCabos']

// }    
// }

// if(typeof dadosSalvosdaRotina3 == 'object') {
//     dadosFinal = dadosSalvosdaRotina3
//     for (let i = 0; i < dadosSalvosdaRotina3.length; i++){
//         adicionarLinhasColunas(1)
//         contador++
//     }
// }

// function pegarTrTd(n1,n2){
//     let linha_celula = document.querySelector(`[class ="linha${n1}"] > [class ="elemento${n2}"]`)
//     return linha_celula
// }

