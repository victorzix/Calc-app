const { app, BrowserWindow, ipcMain, remote, shell } = require("electron");
const path = require("path");
const ipc = ipcMain


const isMac = process.platform === "darwin";

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Calc",
    width: 280,
    height: 457,
    resizable: false,
    closable: true,
    movable: true,
    frame: false,
    webPreferences:{
        contextIsolation: false,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
        devTools: true,
    },
    icon: __dirname + './IMG/calc_ico.png'
  });

  mainWindow.loadFile(path.join(__dirname, "./public/index.html"));


  ipc.on('openGit', ()=>{
    console.log("Opening author's GitHub")
    shell.openExternal("https://github.com/victorzix")
  })

  ipc.on('closeApp', ()=>{
    console.log('Clicked on Close Btn')
    mainWindow.close()
  })
  ipc.on('minimize', ()=>{
    console.log('Clicked on Minimize Btn')
    mainWindow.minimize()
  })
}

   


app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});



app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
