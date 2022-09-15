export type FileDataParams = {
  fileName: string
  base64Data: string
}

type ExistsValue = {
  exist: boolean
  isNew: boolean
  isIGop: boolean
  version: string | null
}

export type ExistsAllEnvParams = {
  gopNewVersion: string
  env: { goNewVersion: string }
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
