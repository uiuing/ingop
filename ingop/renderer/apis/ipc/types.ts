export type IngopHome = {
  init: () => Promise<void>
  remove: () => Promise<void>
}

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

type ExistsMethod = {
  exist: () => Promise<boolean>
  isNew: (newVersion: string) => Promise<boolean>
}

export type ExistsEnv = {
  gop: ExistsMethod
  env: {
    go: ExistsMethod
  }
}

export type Compile = {
  gop: () => Promise<boolean>
}
