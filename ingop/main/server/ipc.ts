import { ipcMain } from 'electron'

// TODO
ipcMain.handle('message', (_event, message: unknown) => {
  console.log(message)
  return message + ' from main process'
})
