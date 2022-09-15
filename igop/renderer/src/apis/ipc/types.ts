export type IGopHome = {
  init: () => void
  remove: {
    all: () => Promise<void>
    gop: () => Promise<void>
  }
}

export type FileDataParams = {
  fileName: string
  base64Data: string
}

export type AutoSaveFile = {
  gop: (fileData: FileDataParams) => Promise<boolean>
  env: {
    go: (fileData: FileDataParams) => Promise<boolean>
  }
}

export type EnvManage = {
  initGop: () => Promise<void>
  env: {
    initGo: () => void
  }
  remove: () => Promise<void>
}

type ExistsValue = {
  exist: boolean
  isNew: boolean
  isIGop: boolean
  version: string | null
}

export type ExistsAllEnvResult = {
  gop: ExistsValue
  env: {
    go: ExistsValue
  }
  system: {
    platform: string
    arch: string
  }
}

export type ExistsAllEnvParams = {
  gopNewVersion: string
  env: { goNewVersion: string }
}
