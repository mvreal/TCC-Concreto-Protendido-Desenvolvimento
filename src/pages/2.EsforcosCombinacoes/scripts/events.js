import {escreverTextosBtn, escreverTitulos, esconderContainerResultados, mostrarContainerResultados, apagarCanvas, desenharBasico, calcular, erro, sucesso, verificarInputs} from "./functions.js"
import {desenharEsforcoCortante, desenharMomentoFletor} from "./desenhar.js"
import { importarDados } from "./criarInputs.js"

const getBtnDiagramas = document.querySelectorAll('.mostrardepois button')
const getSelect = document.getElementById('selectCargas')
const getBtnCalcular = document.getElementById('btnCalcular')
const pegarInputs = document.querySelectorAll('input[type=number]')


getBtnDiagramas[1].addEventListener('click',function(){
    apagarCanvas()
    desenharBasico()
    desenharMomentoFletor(calcular())
})

getBtnDiagramas[0].addEventListener('click',function(){
    
    apagarCanvas()
    desenharBasico()
    desenharEsforcoCortante(calcular())
})

getSelect.addEventListener('change',(event)=>{
    let indexSelecionado = Number(event.target.value-1)
    document.getElementById('inputPrimeiroCarregamento').value = (importarDados[indexSelecionado].area * 25/10000).toFixed(3)
})

getBtnCalcular.addEventListener('click',()=>{
    if(verificarInputs() === true){
        esconderContainerResultados()
        return
    }
    sucesso()
    mostrarContainerResultados()

    let mostrardepois = document.querySelectorAll(".mostrardepois")
    mostrardepois.forEach((element)=>{element.style.display = 'inline'})
  
    escreverTitulos()
    escreverTextosBtn()
    desenharBasico()
    desenharEsforcoCortante(calcular())
})

document.addEventListener('keydown', function (e) {
    if(e.key === '-'){
        e.preventDefault();
    }
})

//Funcionalidade para apagar os desenhos sempre que há uma mudança nos inputs
pegarInputs.forEach((element)=>{
    element.addEventListener('change', () => {
        document.querySelector('#ctn2').style.display = 'none'
    })
})

