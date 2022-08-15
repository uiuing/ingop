/* eslint-disable no-var */
import { IpcRenderer, ipcRenderer } from 'electron'

declare global {
  var ipcRenderer: IpcRenderer
}

process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer
})
