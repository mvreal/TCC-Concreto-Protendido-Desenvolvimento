const { contextBridge, ipcRenderer } = require('electron')

const API = {
    abrirJanela1: () => ipcRenderer.send('abrirJanelaSecundaria1'),
    abrirJanela2: () => ipcRenderer.send('abrirJanelaSecundaria2'),
    abrirJanela3: () => ipcRenderer.send('abrirJanelaSecundaria3'),
    abrirJanela4: () => ipcRenderer.send('abrirJanelaSecundaria4'),
    abrirJanela5: () => ipcRenderer.send('abrirJanelaSecundaria5'),
    abrirJanela6: () => ipcRenderer.send('abrirJanelaSecundaria6'),

    dadosRotina1: (dados1) => ipcRenderer.send('enviarDados1', dados1),
    dadosRotina2: (dados2) => ipcRenderer.send('enviarDados2', dados2),
    dadosRotina3: (dados3) => ipcRenderer.send('enviarDados3', dados3),
    dadosRotina4: (dados4) => ipcRenderer.send('enviarDados4', dados4),
    dadosRotina5: (dados5) => ipcRenderer.send('enviarDados5', dados5),
    dadosRotina5: (dados6) => ipcRenderer.send('enviarDados5', dados6),

    enviarDados: async (callback) => ipcRenderer.on("dadosSalvos", (event,args) => {
        callback(args)
    })
}

contextBridge.exposeInMainWorld("api", API)