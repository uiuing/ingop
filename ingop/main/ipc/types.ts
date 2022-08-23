export type FileDataParams = {
  fileName: string
  base64Data: string
}

type ExistsValue = {
  exist: boolean
  isNew: boolean
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

export type Compile = {
  gop: () => Promise<boolean>
}
