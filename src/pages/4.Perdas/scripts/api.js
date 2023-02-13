
let dadosSalvosdaRotina1 = []
let dadosSalvosdaRotina2 = []
let dadosSalvosdaRotina3 = []
let dadosSalvosdaRotina4 = []

window.api.enviarDados((data) => {
    dadosSalvosdaRotina1 = data[0]
    dadosSalvosdaRotina2 = data[1]
    dadosSalvosdaRotina3 = data[2]
    dadosSalvosdaRotina4 = data[3]

})
