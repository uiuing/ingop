const { ipcMain } = require('electron')
const {
  getNewGoplusVersion,
  startInstall,
  startReload,
  startUninstall,
  startUpdate
} = require('../controllers/CMain')

/*
 * @param {Object} IpcMainSend - Send message to renderer process.
 */
const Listen = (IpcMainSend) => {
  /*
   * @Description Start the Installation GoPlus
   * @param {Object} releases.json
   */
  ipcMain.on('start-install', (e, releasesJSON) => {
    startInstall(IpcMainSend.stateMessages, releasesJSON)
  })

  /*
   * @Description Start the Update GoPlus
   * @param {Object} releases.json
   */
  // eslint-disable-next-line no-unused-vars
  ipcMain.on('start-update', (e, releasesJSON) => {
    startUpdate(IpcMainSend.stateMessages, releasesJSON)
  })

  /*
   * @Description Start the Reload GoPlus
   */
  ipcMain.on('start-reload', () => {
    startReload(IpcMainSend.stateMessages)
  })

  /*
   * @Description Start the Uninstallation GoPlus
   */
  ipcMain.on('start-uninstall', () => {
    startUninstall(IpcMainSend.stateMessages)
  })

  /*
   * @Description Check if you have the latest version of GoPlus
   */
  ipcMain.on('get-new-goplus-version', () => {
    getNewGoplusVersion(IpcMainSend.stateMessages)
  })
}

module.exports = {
  Listen
}
