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
