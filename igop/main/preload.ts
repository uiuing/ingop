/* eslint-disable no-var */
import { IpcRenderer, ipcRenderer } from 'electron'

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

process.once('loaded', () => {
  window.ipcRenderer = ipcRenderer
})
