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

type ExistsValue = {
  exist: boolean
  isNew: boolean
}

export type ExistsAllEnvResult = {
  gop: ExistsValue
  env: {
    go: ExistsValue
  }
}

export type ExistsAllEnvParams = {
  gopNewVersion: string
  env: { goNewVersion: string }
}

export type Compile = {
  gop: () => Promise<boolean>
}
