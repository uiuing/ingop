import { ipcMain, shell } from 'electron'

import {
  autoSaveFile,
  compile,
  envManage,
  existsAllEnv,
  ingopHome
} from './methods'
import { ExistsAllEnvParams, FileDataParams } from './types'

ipcMain.handle('ingop-home-init', async () => {
  ingopHome.init()
})
ipcMain.handle('ingop-home-remove', async () => {
  ingopHome.remove()
})

ipcMain.handle('check-env-all', async (_event, p: ExistsAllEnvParams) => {
  return await existsAllEnv(p)
})

ipcMain.handle(
  'auto-sava-gop-file',
  async (_event, fileData: FileDataParams) => {
    return await new autoSaveFile(fileData).gop()
  }
)
ipcMain.handle(
  'auto-sava-env-go-file',
  async (_event, fileData: FileDataParams) => {
    return await new autoSaveFile(fileData).env.go()
  }
)

ipcMain.handle('compile-gop', async () => {
  return await compile.gop()
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

ipcMain.on('open-url', async (_event, url: string) => {
  await shell.openExternal(url)
})
