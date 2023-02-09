function NotacaoCientifica(number, intereger = 3, float = 2){
    
    let countDigits = 1
    let copynumber = number
 
    while(copynumber>=10){
        countDigits++
        copynumber /= 10
    }

    if(number>10**intereger){
        number /= (10**(countDigits-intereger))
        number = number.toFixed(float)
        return(number + ' E+' + (countDigits-intereger))
    }
    return number.toFixed(2);
}

function sucess(){
    let message = document.querySelectorAll('.message')
    message[0].innerHTML = "<img src=./images/icons/ok.png>"
    message[1].innerHTML = "Os parâmetros da seção foram calculados com sucesso"
    return message[1].innerHTML
}

function erro(resposta){
    let message = document.querySelectorAll('.message')
    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    
    message[0].innerHTML = "<img src=./images/icons/danger.png>" 
    message[1].innerHTML = resposta

    resArea.innerHTML = ""
    InerciaBaricentricaX.innerText = ""       
}

function resetInputs(){
    if(!!document.querySelector('#inputsObrigatorios>tbody>tr>td') == true){
        let deleteRows = document.querySelectorAll('#inputsObrigatorios>tbody>tr,#inputsOpcionais>tbody>tr')
        

        deleteRows.forEach((element=>{
            element.remove()
        }))
    }

    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    let message = document.querySelectorAll('.message')

    resArea.innerText = ''
    InerciaBaricentricaX.innerText = ''

    message[0].innerHTML=''
    message[1].innerHTML='Todos os alertas estarão aqui!'
}

function criarTabela(mandatoryElement, optionalElement, mandatoryRowNumber, optionalRowNumber){
    for(let i = 0; i<mandatoryRowNumber; i++){
        mandatoryElement.insertRow()
    }
    for(let i = 0; i<optionalRowNumber; i++){
        optionalElement.insertRow()
    }
}

function insertCell(){
    let allRows = document.querySelectorAll('#inputsObrigatorios>tbody>tr,#inputsOpcionais>tbody>tr')
    allRows.forEach((element)=>{
        element.insertCell()
        element.insertCell()
        element.insertCell()
    })
}

function insertInputs(){
    let resArea = document.getElementById('resArea')
    let InerciaBaricentricaX = document.getElementById('InerciaBaricentricaX')
    let message = document.querySelectorAll('.message')
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    for(let i = 0; i<allDataCell.length; i++){
        if((i+2) % 3 == 0){
            allDataCell[i].innerHTML = "<input type='number' min='0' class='numberInput'></input>"
            allDataCell[i].addEventListener('change',()=>{
                resArea.innerText = ''
                InerciaBaricentricaX.innerText = ''
            
                message[0].innerHTML=''
                message[1].innerHTML='Todos os alertas estarão aqui!'
            })
        }
    }
    
}

function inserirUnidades(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    for(let i = 0; i<allDataCell.length; i++){
        if((i+1) % 3 == 0){
            allDataCell[i].innerText = 'cm'
        }
    }
}

function recParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerText = 'b'
    allDataCell[3].innerText = 'h'
}

function tParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerHTML = 'b<sub>f</sub>'
    allDataCell[3].innerHTML = 'h<sub>f</sub>'

    allDataCell[6].innerHTML = 'b<sub>w</sub>'
    allDataCell[9].innerHTML = 'h'

    allDataCell[12].innerHTML = 'b<sub>mis</sub>'
    allDataCell[15].innerHTML = 'h<sub>mis</sub>'
}

function iParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerHTML = 'b<sub>f</sub>'
    allDataCell[3].innerHTML = 'h<sub>f</sub>'

    allDataCell[6].innerHTML = 'b<sub>w</sub>'
    allDataCell[9].innerHTML = 'h'

    allDataCell[12].innerHTML = 'b<sub>i</sub>'
    allDataCell[15].innerHTML = 'h<sub>i</sub>'

    allDataCell[18].innerHTML = 'b<sub>mis-sup</sub>'
    allDataCell[21].innerHTML = 'h<sub>mis-sup</sub>'

    allDataCell[24].innerHTML = 'b<sub>mis-inf</sub>'
    allDataCell[27].innerHTML = 'h<sub>mis-inf</sub>'
}

function dittoParams(){
    let allDataCell = document.querySelectorAll('#inputsObrigatorios>tbody>tr>td,#inputsOpcionais>tbody>tr>td')
    
    allDataCell[0].innerHTML = 'h'
    allDataCell[3].innerHTML = 'A'

    allDataCell[6].innerHTML = 'I<sub>xg</sub>'

    allDataCell[5].innerHTML = 'cm²'
    allDataCell[8].innerHTML = 'cm⁴'
}

function showImage(checkedFormTransversal){

    let ctnimg = document.getElementById('ctnimg')
    switch(checkedFormTransversal) {
        case 'retangulo':
              ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/rec.png'></img>"
        break

        case 'triangulo':
            ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/t.png'</img>"
        break

        case 'i':
            ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/i.png'</img>"
        break

        case 'ditto':
            ctnimg.innerHTML = "<img class='middleImg' src='./images/middle/ditto.png'</img>"
        break
    }
} 

function resetMassage(message){
    message[0].innerHTML = ""
    message[1].innerHTML = ""
}

export {NotacaoCientifica, sucess, erro, resetInputs, criarTabela, insertCell, insertInputs, inserirUnidades, recParams, tParams, iParams, dittoParams, showImage, resetMassage}