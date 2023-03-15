
let dadosSalvosdaRotina1 = []
let dadosSalvosdaRotina2 = []
let dadosSalvosdaRotina3 = []
let dadosSalvosdaRotina4 = []
let dadosSalvosdaRotina5 = []
let dadosSalvosdaRotina6 = []

window.api.enviarDados((data) => {
    dadosSalvosdaRotina1 = data[0]
    dadosSalvosdaRotina2 = data[1]
    dadosSalvosdaRotina3 = data[2]
    dadosSalvosdaRotina4 = data[3]
    dadosSalvosdaRotina5 = data[4]
    dadosSalvosdaRotina6 = data[5]
})

