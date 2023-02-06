import {importarDados,getSelect} from "./criarInputs.js"
import {escreverTextosBtn, escreverTitulos, esconderContainerResultados, mostrarContainerResultados, apagarCanvas, desenharBasico, calcular, erro, sucesso, verificarInputs} from "./functions.js"
import {desenharEsforcoCortante, desenharMomentoFletor} from "./desenhar.js"

if( typeof getSelect === 'undefined'){
    getSelect = document.getElementById('selectCargas')
}

//Código para salvar os dados e apresentar na seção "Dados Salvos"

let contador = 0;
let btnSave =document.querySelector('#btnSave')
let novoDado = [];
let tabelaResultados = document.querySelector('#tabelaResultados')
let arrayInputs = [...document.querySelectorAll('.inputCalc')]



    btnSave.addEventListener('click',()=>{
    if(document.querySelector('#ctn2').style.display == 'none' || document.querySelector('#ctn2').style.display == ''){erro("É necessário calcular as combinações antes de salvar"); return}

    
    //Para determinar qual figura foi selecionada
    let selectSelecionado = document.getElementById('selectCargas')
    let valorSelecionado = selectSelecionado.options[selectSelecionado.selectedIndex].value;
    let [combinacoes,dados] = calcular()

    //Salvando os dados em um array de objetos
    novoDado[contador] = {
    Figura: valorSelecionado,
    Vao: arrayInputs[0].value,
    "g<sub>1</sub>": arrayInputs[1].value,
    "g<sub>2</sub>": arrayInputs[2].value,
    q: arrayInputs[3].value,
    "&#936<sub>1</sub>": arrayInputs[4].value,
    "&#936<sub>2</sub>": arrayInputs[5].value,
    "&#947<sub>g<sub>1</sub></sub>": arrayInputs[6].value,
    "&#947<sub>g<sub>2</sub></sub>": arrayInputs[7].value,
    "&#947<sub>q</sub>": arrayInputs[8].value,
    'combinacoes': combinacoes,
    'dados':dados,
    'rotina1':importarDados[Number(valorSelecionado)-1]
    }
    console.log(importarDados[Number(valorSelecionado)-1])
     
    let novaLinha = tabelaResultados.insertRow()
    let novaCelula = novaLinha.insertCell()
 

    novaCelula.innerHTML = "Id: " + contador + "; "
    + "Figura" + ": " + novoDado[contador]["Figura"] +"; "
    + "Vão" + ": " + novoDado[contador]["Vao"] + " m;  "
    + "g<sub>1</sub>" + ": " + novoDado[contador]["g<sub>1</sub>"] + " kN/m;  "
    + "g<sub>2</sub>" + ": " + novoDado[contador]["g<sub>2</sub>"] + " kN/m;  "
    + "q" + ": " + novoDado[contador]["q"] + " kN/m;  "
    + "&#936<sub>1</sub>" + ": " + novoDado[contador]["&#936<sub>1</sub>"] + ";  "
    + "&#936<sub>2</sub>" + ": " + novoDado[contador]["&#936<sub>2</sub>"] + ";  "
    + "&#947<sub>g<sub>1</sub></sub>" + ": " + novoDado[contador]["&#947<sub>g<sub>1</sub></sub>"] + ";  "
    + "&#947<sub>g<sub>2</sub></sub>" + ": " + novoDado[contador]["&#947<sub>g<sub>2</sub></sub>"] + ";  "
    + "&#947<sub>q</sub>" + ": " + novoDado[contador]["&#947<sub>q</sub>"] + ";  "



    window.api.dadosRotina2(novoDado)
    contador++
    

})

//Criando os campos de Save
let titulotabelaResultados = document.getElementById('tituloTabelaResultados')
titulotabelaResultados.innerText = "Informações Salvas"
tabelaResultados.classList.add('tabelaEstilizada')


//Verificando se existem resultados previos

if(typeof dadosSalvosdaRotina2[0].Figura == 'string'){

    for(let i = 0; i < dadosSalvosdaRotina2.length; i++){
        let novaLinha = tabelaResultados.insertRow()
        let novaCelula = novaLinha.insertCell()


        novaCelula.innerHTML = "Id: " + i + "; "
        + "Figura" + ": " + dadosSalvosdaRotina2[i]["Figura"] +"; "
        + "Vão" + ": " + dadosSalvosdaRotina2[i]["Vao"] + " m;  "
        + "g<sub>1</sub>" + ": " + dadosSalvosdaRotina2[i]["g<sub>1</sub>"] + " kN/m;  "
        + "g<sub>2</sub>" + ": " + dadosSalvosdaRotina2[i]["g<sub>2</sub>"] + " kN/m;  "
        + "q" + ": " + dadosSalvosdaRotina2[i]["q"] + " kN/m;  "
        + "&#936<sub>1</sub>" + ": " + dadosSalvosdaRotina2[i]["&#936<sub>1</sub>"] + ";  "
        + "&#936<sub>2</sub>" + ": " + dadosSalvosdaRotina2[i]["&#936<sub>2</sub>"] + ";  "
        + "&#947<sub>g<sub>1</sub></sub>" + ": " + dadosSalvosdaRotina2[i]["&#947<sub>g<sub>1</sub></sub>"] + ";  "
        + "&#947<sub>g<sub>2</sub></sub>" + ": " + dadosSalvosdaRotina2[i]["&#947<sub>g<sub>2</sub></sub>"] + ";  "
        + "&#947<sub>q</sub>" + ": " + dadosSalvosdaRotina2[i]["&#947<sub>q</sub>"] + ";  "

        novoDado[i] = dadosSalvosdaRotina2[i]
        contador++

    }

    
}



