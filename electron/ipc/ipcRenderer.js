const { contextBridge, ipcRenderer } = require('electron')

const Listen = () => {
  contextBridge.exposeInMainWorld('ipcAPI', {
    /*
     * @Description Tell the main process to start the Installation GoPlus
     * @param {Object} releases.json
     */
    startInstall: (releasesJSON) => {
      ipcRenderer.send('start-install', releasesJSON)
    },

    /*
     * @Description Tell the main process to start the Update GoPlus
     * @param {Object} releases.json
     */
    startUpdate: (releasesJSON) => {
      ipcRenderer.send('start-update', releasesJSON)
    },

    /*
     * @Description Tell the main process to start the
     */
    startReload: () => {
      ipcRenderer.send('start-reload')
    },

    /*
     * @Description Tell the main process to start the Uninstallation GoPlus
     */
    startUninstall: () => {
      ipcRenderer.send('start-uninstall')
    },

    /*
     * @Description Get the version of GoPlus, if not installed, return false, if installed, return the version.
     */
    getGoplusVersion: () => {
      ipcRenderer.send('get-goplus-version')
    },

    /*
     * @Description Listening From main process download/unzip/compile/install/uninstall/update state message.
     * @param {function} stateMessages - Callback function to receive the state message.
     */
    stateMessages: (callback) => {
      ipcRenderer.on('state-messages', callback)
    }
  })
}

module.exports = {
  Listen
}
