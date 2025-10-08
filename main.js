const { app, BrowserWindow } = require("electron");
require("@electron/remote/main").initialize();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  require("@electron/remote/main").enable(win.webContents);

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
