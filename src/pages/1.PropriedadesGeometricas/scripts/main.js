import {NotacaoCientifica, sucess, erro, resetInputs, criarTabela, insertCell, insertInputs, inserirUnidades, recParams, tParams, iParams, dittoParams, showImage, resetMassage} from "./functions.js"
import {verificacaoVigaRet, verificacaoVigaT, verificacaoVigaI} from "./functionsGeometria.js"


let formTransversal = document.getElementById('formTransversal')

formTransversal.addEventListener('change',()=>{
    let checkedFormTransversal = document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
    let tabelaInputsObrigatorios = document.getElementById('inputsObrigatorios')
    let tabelaInputsOpcionais = document.getElementById('inputsOpcionais')
    let ctnInfo = document.getElementById('ctnInfo')
    

    ctnInfo.style.display = 'flex'
    let optionalTitle = document.getElementById('optionalTitle')
    resetInputs()

    switch(checkedFormTransversal) {
        case 'retangulo':
            optionalTitle.style.display = 'none'
            criarTabela(tabelaInputsObrigatorios, tabelaInputsOpcionais, 2, 0)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            inserirUnidades()
            recParams()
            
        break

        case 'triangulo':
            optionalTitle.style.display = 'block'
            criarTabela(tabelaInputsObrigatorios, tabelaInputsOpcionais, 4, 2)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            inserirUnidades()
            tParams()
        break

        case 'i':
            optionalTitle.style.display = 'block'
            criarTabela(tabelaInputsObrigatorios, tabelaInputsOpcionais, 6, 4)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            inserirUnidades()
            iParams()
        break

        case 'ditto':
            optionalTitle.style.display = 'none'
            criarTabela(tabelaInputsObrigatorios, tabelaInputsOpcionais, 3, 0)
            insertCell()
            showImage(checkedFormTransversal)
            insertInputs()
            inserirUnidades()
            dittoParams()
        break
        }
    }      

)
     
var resposta = []
let btnCalc = document.getElementById('btnCalc')
btnCalc.addEventListener('click',()=>{

    let resArea = document.getElementById('resArea')
    let resInerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    
    

    let message = document.querySelectorAll('.message')
    let inputs = document.querySelectorAll('.numberInput')

      try{
        document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
      }  
        catch(e){
            erro("A seção transversal não foi definida, clique em uma das imagens")
            return
        }

    
        let checkedFormTransversal = document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
    

    let arrInputs = Array.from(inputs)
    let numberInputs = []


    arrInputs.forEach((element)=>{
        numberInputs.push(Number(element.value))
    })

    resetMassage(message)
    switch(checkedFormTransversal) {

        case 'retangulo':
            var [b,h] = numberInputs
            resposta = verificacaoVigaRet(resArea,resInerciaBaricentricaX,b,h)
        break

        case 'triangulo':
            var [bf,hf,bw,h,bmis,hmis] = numberInputs
            resposta = verificacaoVigaT(resArea,resInerciaBaricentricaX,bf,hf,bw,h,bmis,hmis,message)
        break

        case 'i':
            var [bf,hf,bw,h,bi,hi,bmissup,hmissup,bmisinf,hmisinf] = numberInputs
            resposta = verificacaoVigaI(resArea,resInerciaBaricentricaX,bf,hf,bw,h,bi,hi,bmissup,hmissup,bmisinf,hmisinf,message)
            break

        case 'ditto':
            
        break
    }
})

//Perimetro foi calculado



document.addEventListener('keydown',function (e) {
    if(e.key === '-'){
        e.preventDefault();
    }
})
       
    

var resetResults = () => {
    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    let message = document.querySelectorAll('.message')

    resArea.innerText = ''
    InerciaBaricentricaX.innerText = ''

    message[0].innerHTML=''
    message[1].innerHTML='Todos os alertas estarão aqui!'
}


var respostasSalvas = []
var contadorDeRespostasSalvas = 0

let btnSave = document.getElementById('btnSave')

btnSave.addEventListener('click',()=>{
    try{
        document.querySelector('input[name="inputSecaoTrasnversal"]:checked').value
      }  
        catch(e){
            erro("A seção transversal não foi definida, clique em uma das imagens")
            return
        }

    if(message[1].innerText == "Os parâmetros da seção foram calculados com sucesso"){
    
        let createTr = document.createElement('tr')
        let createTd = [document.createElement('td'),document.createElement('td'),document.createElement('td'),document.createElement('td')]
        respostasSalvas.push(resposta)
        let getTBody = document.querySelector('#tableSave>tbody')
        
        getTBody.appendChild(createTr)
        createTd.forEach((element)=>{
            createTr.appendChild(element)
        })

        let getUpdateTr = document.querySelectorAll('#tableSave>tbody>tr')[contadorDeRespostasSalvas]
        let getUpdateTd = getUpdateTr.querySelectorAll('td')

        
        getUpdateTd[0].innerHTML = contadorDeRespostasSalvas+1
        getUpdateTd[1].innerHTML = respostasSalvas[contadorDeRespostasSalvas].slug
        getUpdateTd[2].innerHTML = NotacaoCientifica(respostasSalvas[contadorDeRespostasSalvas].area)
        getUpdateTd[3].innerHTML = NotacaoCientifica(respostasSalvas[contadorDeRespostasSalvas].ixg)

        if(respostasSalvas[contadorDeRespostasSalvas].slug == "T"){
            getUpdateTd[1].classList.add('mediumText')
        }
        contadorDeRespostasSalvas++

        window.api.dadosRotina1(respostasSalvas);
    }
})

//Criando os campos da área de save

let titleSave = document.getElementById('titleSave')
let message = document.querySelectorAll('.message')
let tableSave = document.getElementById('tableSave')

titleSave.innerText = "Seções Salvas"
let createThead = document.createElement('thead')
let createTr = document.createElement('tr')
let createTh = [document.createElement('th'),document.createElement('th'),document.createElement('th'),document.createElement('th')]
var createTbody = document.createElement('tbody')

tableSave.appendChild(createThead)
tableSave.appendChild(createTbody)
createTbody.classList.add('textAlignCenter')
createThead.appendChild(createTr)
createTh.forEach((element)=>{
    createTr.appendChild(element)
})

createTh[0].innerText = " Número "
createTh[1].innerText = " Figura "
createTh[2].innerText = " Área (cm²) "
createTh[3].innerText = " Ixg (cm⁴) "
createTh[2].classList.add('mediumInput')
createTh[3].classList.add('mediumInput')


//Verificando se já existem elementos previos 
if( typeof dadosSalvosdaRotina1[0].tipo == 'string'){

    let getTBody = document.querySelector('#tableSave>tbody')

    for(let i = 0; i < dadosSalvosdaRotina1.length; i++){

        let createTr = document.createElement('tr')
        let createTd = [document.createElement('td'),document.createElement('td'),document.createElement('td'),document.createElement('td')]

        getTBody.appendChild(createTr)
        createTd.forEach((element2)=>{
           createTr.appendChild(element2)
        })
    
        let getUpdateTr = document.querySelectorAll('#tableSave>tbody>tr')[contadorDeRespostasSalvas]
        let getUpdateTd = getUpdateTr.querySelectorAll('td')

        getUpdateTd[0].innerHTML = contadorDeRespostasSalvas+1
        getUpdateTd[1].innerHTML = dadosSalvosdaRotina1[contadorDeRespostasSalvas].slug
        getUpdateTd[2].innerHTML = NotacaoCientifica(dadosSalvosdaRotina1[contadorDeRespostasSalvas].area)
        getUpdateTd[3].innerHTML = NotacaoCientifica(dadosSalvosdaRotina1[contadorDeRespostasSalvas].ixg)

        respostasSalvas[contadorDeRespostasSalvas] = dadosSalvosdaRotina1[contadorDeRespostasSalvas] 
        contadorDeRespostasSalvas++
    }; 
}






