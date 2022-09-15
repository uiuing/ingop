import { IpcRenderer } from 'electron'

import {
  AutoSaveFile,
  EnvManage,
  ExistsAllEnvParams,
  ExistsAllEnvResult,
  FileDataParams,
  IGopHome
} from './types'

// @ts-ignore
const ipc: IpcRenderer = window.ipcRenderer

export const igopHome: IGopHome = {
  init: async () => {
    await ipc.invoke('igop-home-init')
  },
  remove: {
    all: async () => {
      await ipc.invoke('igop-home-remove')
    },
    gop: async () => {
      await ipc.invoke('igop-gop-remove')
    }
  }
}

export async function existsAllEnv(
  p: ExistsAllEnvParams
): Promise<ExistsAllEnvResult> {
  return ipc.invoke('check-env-all', p)
}

export const autoSaveFile: AutoSaveFile = {
  gop: async (fileData: FileDataParams): Promise<boolean> =>
    ipc.invoke('auto-sava-gop-file', fileData),
  env: {
    go: async (fileData: FileDataParams): Promise<boolean> =>
      ipc.invoke('auto-sava-env-go-file', fileData)
  }
}

export const envManage: EnvManage = {
  initGop: async () => {
    await ipc.invoke('env-gop-init')
  },
  env: {
    initGo: async () => {
      await ipc.invoke('env-env-go-init')
    }
  },
  remove: async () => {
    await ipc.invoke('env-all-remove')
  }
}

export function openUrl(url: string) {
  ipc.send('open-url', url)
}

export function rebootWindows() {
  ipc.send('reboot-windows')
}
