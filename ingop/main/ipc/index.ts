import { ipcMain } from 'electron'

import { autoSaveFile, envManage, ingopHome } from './api'
import { FileData } from './types'

ipcMain.handle('ingop-home-init', async () => {
  ingopHome.init()
})
ipcMain.handle('ingop-home-remove', async () => {
  ingopHome.remove()
})

ipcMain.handle('auto-sava-gop-file', async (_event, fileData: FileData) => {
  await new autoSaveFile(fileData).gop()
})
ipcMain.handle('auto-sava-env-go-file', async (_event, fileData: FileData) => {
  await new autoSaveFile(fileData).env.go()
})

ipcMain.handle('env-gop-init', () => {
  envManage.initGop()
})
ipcMain.handle('env-env-go-init', () => {
  envManage.env.initGo()
})
ipcMain.handle('env-all-remove', () => {
  envManage.remove()
})
