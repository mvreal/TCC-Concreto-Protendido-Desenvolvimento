let dadosSalvosdaRotina1 = []

window.api.enviarDados((data) => {
    console.log(data)
    dadosSalvosdaRotina1 = data[0];
    console.log(dadosSalvosdaRotina1)
})