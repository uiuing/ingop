const { ipcMain } = require('electron')
const {
  getGoplusVersion,
  startInstall,
  startReload,
  startUninstall,
  startUpdate
} = require('../controllers/CMain')
const { Message } = require('../controllers/Message')

/*
 * @param {Object} IpcMainSend - Send message to renderer process.
 */
const Listen = (IpcMainSend) => {
  /*
   * @Description Start the Installation GoPlus
   * @param {Object} releases.json
   */
  ipcMain.on('start-install', (e, releasesJSON) => {
    const m = new Message(IpcMainSend.stateMessages, 'install')
    startInstall(m.send, releasesJSON)
  })

  /*
   * @Description Start the Update GoPlus
   * @param {Object} releases.json
   */
  // eslint-disable-next-line no-unused-vars
  ipcMain.on('start-update', (e, releasesJSON) => {
    const m = new Message(IpcMainSend.stateMessages, 'update')
    startUpdate(m.send, releasesJSON)
  })

  /*
   * @Description Start the Reload GoPlus
   */
  ipcMain.on('start-reload', () => {
    const m = new Message(IpcMainSend.stateMessages, 'reload')
    startReload(m.send)
  })

  /*
   * @Description Start the Uninstallation GoPlus
   */
  ipcMain.on('start-uninstall', () => {
    const m = new Message(IpcMainSend.stateMessages, 'uninstall')
    startUninstall(m.send)
  })

  /*
   * @Description Get the version of GoPlus, if not installed, return false, if installed, return the version.
   */
  ipcMain.on('get-goplus-version', () => {
    const m = new Message(IpcMainSend.stateMessages, 'version')
    getGoplusVersion(m.send)
  })
}

module.exports = {
  Listen
}
