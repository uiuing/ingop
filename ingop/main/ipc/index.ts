import { ipcMain } from 'electron'

import {
  autoSaveFile,
  compile,
  envManage,
  existsEnv,
  ingopHome
} from './methods'
import { FileDataParams } from './types'

ipcMain.handle('ingop-home-init', async () => {
  ingopHome.init()
})
ipcMain.handle('ingop-home-remove', async () => {
  ingopHome.remove()
})

ipcMain.handle('check-gop-exist', async () => {
  return await existsEnv.gop.exist()
})
ipcMain.handle('check-gop-isNew', async (_event, newVersion: string) => {
  return await existsEnv.gop.isNew(newVersion)
})
ipcMain.handle('check-env-go-exist', async () => {
  return await existsEnv.env.go.exist()
})
ipcMain.handle('check-env-go-isNew', async (_event, newVersion: string) => {
  return await existsEnv.env.go.isNew(newVersion)
})

ipcMain.handle(
  'auto-sava-gop-file',
  async (_event, fileData: FileDataParams) => {
    await new autoSaveFile(fileData).gop()
  }
)
ipcMain.handle(
  'auto-sava-env-go-file',
  async (_event, fileData: FileDataParams) => {
    await new autoSaveFile(fileData).env.go()
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
