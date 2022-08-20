import { AutoSaveFile, EnvManage, FileDataParams } from './types'

export const ingopHome = {
  init: async () => {
    await global.ipcRenderer.invoke('ingop-home-init')
  },
  remove: async () => {
    await global.ipcRenderer.invoke('ingop-home-remove')
  }
}

export const autoSaveFile: AutoSaveFile = {
  gop: async (fileData: FileDataParams) => {
    await global.ipcRenderer.invoke('auto-sava-gop-file', fileData)
  },
  env: {
    go: async (fileData: FileDataParams) => {
      await global.ipcRenderer.invoke('auto-sava-env-go-file', fileData)
    }
  }
}

export const envManage: EnvManage = {
  initGop: async () => {
    await global.ipcRenderer.invoke('env-gop-init')
  },
  env: {
    initGo: async () => {
      await global.ipcRenderer.invoke('env-env-go-init')
    }
  },
  remove: async () => {
    await global.ipcRenderer.invoke('env-all-remove')
  }
}
