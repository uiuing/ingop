export type FileDataParams = {
  fileName: string
  base64Data: string
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
