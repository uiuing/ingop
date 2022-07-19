const { app, globalShortcut, BrowserWindow, Menu, screen } = require('electron')
const path = require('path')

const { NODE_ENV } = process.env

Menu.setApplicationMenu(null)

const IpcMainSend = {}

function createWindow() {
  // Auto resize window to fit content
  const autoScreen = { width: 800, height: 500 }
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  if (width <= 800 || height <= 500) {
    autoScreen.width = Math.floor(width * 0.625)
    autoScreen.height = Math.floor(autoScreen.width * 0.625)
  }

  // noinspection JSValidateTypes
  const mainWindow = new BrowserWindow({
    width: autoScreen.width,
    height: autoScreen.height,
    resizable: false,
    maximizable: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow
    .loadURL(
      NODE_ENV === 'development'
        ? 'http://localhost:5100'
        : `file://${path.join(__dirname, '../dist/index.html')}`
    )
    .catch((err) => {
      throw new Error(err)
    })

  if (NODE_ENV === 'development') {
    globalShortcut.register('CommandOrControl+Shift+i', () => {
      mainWindow.webContents.openDevTools()
    })
  }

  /*
   * @Description Send download/unzip/compile/install/uninstall/update state message to renderer process.
   * @param {Object} status - Almost all the data of the above interfaces.
   */
  IpcMainSend.stateMessages = (status) => {
    mainWindow.webContents.send('state-messages', status)
  }
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const ipc = require('./ipc/ipcMain')

ipc.Listen(IpcMainSend)
