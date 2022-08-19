export type Bash = {
  gop: string
  env: {
    go: string
  }
  remove: string
}

export type EnvManage = {
  initGop: () => void
  env: {
    initGo: () => void
  }
  remove: () => void
}
