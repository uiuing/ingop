export type FileDataParams = {
  fileName: string
  base64Data: string
}

export type AutoSaveFile = {
  gop: (fileData: FileDataParams) => void
  env: {
    go: (fileData: FileDataParams) => void
  }
}

export type EnvManage = {
  initGop: () => void
  env: {
    initGo: () => void
  }
  remove: () => void
}
