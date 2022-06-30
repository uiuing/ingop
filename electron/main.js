const { app, globalShortcut, BrowserWindow, Menu } = require("electron");
const path = require("path");

const { NODE_ENV } = process.env;

Menu.setApplicationMenu(null);

const IpcMainSend = {
  stateMessages: () => {},
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 850,
    height: 550,
    resizable: false,
    maximizable: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow
    .loadURL(
      NODE_ENV === "development"
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../dist/index.html")}`
    )
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });

  if (NODE_ENV === "development") {
    globalShortcut.register("CommandOrControl+Shift+i", () => {
      mainWindow.webContents.openDevTools();
    });
  }

  /*
   * @Description Send download/unzip/compile/install/uninstall/update state message to renderer process.
   * @param {Object} status - Almost all the data of the above interfaces.
   */
  IpcMainSend.stateMessages = (status) => {
    mainWindow.webContents.send("state-messages", status);
  };
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const ipc = require("./ipc/ipcMain");

ipc.Listen(IpcMainSend);
