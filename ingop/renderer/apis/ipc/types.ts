export type FileData = {
  fileName: string
  base64Data: string
}

export type AutoSaveFile = {
  gop: (fileData: FileData) => void
  env: {
    go: (fileData: FileData) => void
  }
}

export type EnvManage = {
  initGop: () => void
  env: {
    initGo: () => void
  }
  remove: () => void
}
