const { ipcMain } = require("electron");
const CMain = require("../controllers/CMain");

/*
 * @param {Object} IpcMainSend - Send message to renderer process.
 */
const Listen = (IpcMainSend) => {
  /*
   * @Description Start the Installation GoPlus
   * @param {Object} releases.json
   */
  ipcMain.on("start-install", (e, releasesJSON) => {
    CMain.startInstall(IpcMainSend.stateMessages, releasesJSON);
  });

  /*
   * @Description Start the Update GoPlus
   * @param {Object} releases.json
   */
  // eslint-disable-next-line no-unused-vars
  ipcMain.on("start-update", (e, releasesJSON) => {
    CMain.startUpdate(IpcMainSend.stateMessages, releasesJSON);
  });

  /*
   * @Description Start the Reload GoPlus
   */
  ipcMain.on("start-reload", () => {
    CMain.startReload(IpcMainSend.stateMessages);
  });

  /*
   * @Description Start the Uninstallation GoPlus
   */
  ipcMain.on("start-uninstall", () => {
    CMain.startUninstall(IpcMainSend.stateMessages);
  });

  /*
   * @Description Check if you have the latest version of GoPlus
   */
  ipcMain.on("get-new-goplus-version", () => {
    CMain.getNewGoplusVersion(IpcMainSend.stateMessages);
  });
};

module.exports = {
  Listen,
};
