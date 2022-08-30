import { ipcMain, shell } from 'electron'

import {
  AutoSaveFile,
  compile,
  envManage,
  existsAllEnv,
  ingopHome,
  rebootWindows
} from './methods'
import { ExistsAllEnvParams, FileDataParams } from './types'

ipcMain.handle('ingop-home-init', async () => {
  ingopHome.init()
})
ipcMain.handle('ingop-home-remove', async () => {
  ingopHome.remove.all()
})
ipcMain.handle('ingop-gop-remove', async () => {
  ingopHome.remove.gop()
})

ipcMain.handle('check-env-all', async (_event, p: ExistsAllEnvParams) =>
  existsAllEnv(p)
)

ipcMain.handle('auto-sava-gop-file', async (_event, fileData: FileDataParams) =>
  new AutoSaveFile(fileData).gop()
)
ipcMain.handle(
  'auto-sava-env-go-file',
  async (_event, fileData: FileDataParams) =>
    new AutoSaveFile(fileData).env.go()
)

ipcMain.handle('compile-gop', async () => compile.gop())

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

ipcMain.on('reboot-windows', async () => {
  await rebootWindows()
})
