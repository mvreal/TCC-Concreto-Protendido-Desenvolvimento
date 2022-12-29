const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

var dados = ['','','','','',''];


function criarJanelaPrincipal() {
    let janelaPrincipal = new BrowserWindow({
        width: 800, height: 600,show: false, webPreferences:{preload: path.join(__dirname, 'preload.js')}
    })
    janelaPrincipal.loadFile('./index.html')
    janelaPrincipal.webContents.send("dadosSalvos", dados)
    janelaPrincipal.maximize()
    janelaPrincipal.show()
}

//---------------------------------------------------------------------------------------------------------------

function criarJanelaSecundaria1() {
    let janelaSecundaria1 = new BrowserWindow({
        width: 820, height: 770, webPreferences:{preload: path.join(__dirname, 'preload.js')}
    })
    janelaSecundaria1.loadFile('./src/pages/1.PropriedadesGeometricas/index.html')
    janelaSecundaria1.webContents.send("dadosSalvos", dados)
}

ipcMain.on('abrirJanelaSecundaria1', (event, args) => {criarJanelaSecundaria1()})
ipcMain.on('enviarDados1', (evento, args) => {dados[0] = args})

//---------------------------------------------------------------------------------------------------------------

function criarJanelaSecundaria2() {
    let janelaSecundaria2 = new BrowserWindow({
        width: 835, height: 800, webPreferences:{preload: path.join(__dirname, 'preload.js')}
    })
    janelaSecundaria2.loadFile('./src/pages/2.EsforcosCombinacoes/index.html')
    janelaSecundaria2.webContents.send("dadosSalvos", dados)
}
ipcMain.on('abrirJanelaSecundaria2', (event, args) => {criarJanelaSecundaria2()})
ipcMain.on('enviarDados2', (evento, args) => {dados[1] = args})

//---------------------------------------------------------------------------------------------------------------

function criarJanelaSecundaria3() {
    let janelaSecundaria3 = new BrowserWindow({
        width: 900, height: 820, webPreferences:{preload: path.join(__dirname, 'preload.js')}
    })
    janelaSecundaria3.loadFile('./src/pages/3.ForcaProtensao/index.html')
    janelaSecundaria3.webContents.send("dadosSalvos", dados)
}
ipcMain.on('abrirJanelaSecundaria3', (event, args) => {criarJanelaSecundaria3()})
ipcMain.on('enviarDados3', (evento, args) => {dados[2] = args})

//---------------------------------------------------------------------------------------------------------------

function criarJanelaSecundaria4() {
    let janelaSecundaria4 = new BrowserWindow({
        width: 900, height: 820, webPreferences:{preload: path.join(__dirname, 'preload.js')}
    })
    janelaSecundaria4.loadFile('./src/pages/4.Perdas/index.html')
    janelaSecundaria4.webContents.send("dadosSalvos", dados)
}
ipcMain.on('abrirJanelaSecundaria4', (event, args) => {criarJanelaSecundaria4()})
ipcMain.on('enviarDados4', (evento, args) => {dados[3] = args})

//---------------------------------------------------------------------------------------------------------------

app.whenReady().then(criarJanelaPrincipal)