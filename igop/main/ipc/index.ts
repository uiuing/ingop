import { ipcMain, shell } from 'electron'

import {
  AutoSaveFile,
  envManage,
  existsAllEnv,
  igopHome,
  rebootWindows
} from './methods'
import { ExistsAllEnvParams, FileDataParams } from './types'

ipcMain.handle('igop-home-init', async () => {
  igopHome.init()
})
ipcMain.handle('igop-home-remove', async () => {
  igopHome.remove.all()
})
ipcMain.handle('igop-gop-remove', async () => {
  igopHome.remove.gop()
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

ipcMain.on('reboot-windows', () => {
  rebootWindows()
})
