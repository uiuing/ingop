/* eslint-disable no-var */
import { IpcRenderer, ipcRenderer } from 'electron'

declare global {
  var ipcRenderer: IpcRenderer
}

global.ipcRenderer = ipcRenderer
