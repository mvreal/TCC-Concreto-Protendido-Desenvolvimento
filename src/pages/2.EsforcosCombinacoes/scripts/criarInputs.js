let getSelect = document.getElementById('selectCargas')
let importarDados = dadosSalvosdaRotina1

document.addEventListener('DOMContentLoaded', () => {
    
    importarDados.forEach((element,index)=>{
        let createOption = document.createElement('option')
        createOption.innerText= 'Figura: ' + (index+1) +', Área: ' + element.area +' cm²'
        getSelect.appendChild(createOption)
        createOption.value = index + 1
    })
})

export {importarDados, getSelect}
