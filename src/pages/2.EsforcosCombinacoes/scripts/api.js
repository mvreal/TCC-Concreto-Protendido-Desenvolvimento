let dadosSalvosdaRotina1 = []
let dadosSalvosdaRotina2 = []

const pegarDados = (() => {
    window.api.enviarDados((data) => {
        dadosSalvosdaRotina1 = data[0];
        dadosSalvosdaRotina2 = data[1];
    })
})

pegarDados()



