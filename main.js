const { app, BrowserWindow, ipcMain, webContents } = require("electron");
const url = require("url");
const path = require("path");

let win;
let mpwin;
function createWindow() {
  win = new BrowserWindow({ 
    width: 500, 
    height: 200,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function openModal() {
  const { BrowserWindow } = require('electron');
  
  mpwin = new BrowserWindow({ 
    parent: win, 
    show: false,
    autoHideMenuBar: true,
    frame: false,
    alwaysOnTop: false,
  })
  
  mpwin.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/mediaplayer.html"),
      protocol: "file:",
      slashes: true,
    })
  )

  mpwin.once('ready-to-show', () => {
    mpwin.show()
  })
}

ipcMain.on('openModal', (event, arg) => {
  openModal()
})

ipcMain.on('changeVideo', (event, arg) => {
  mpwin.webContents.executeJavaScript("changeVideo('" + arg + "')")
})