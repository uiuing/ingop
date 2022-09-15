export type AsyncString = Promise<string>

export type AsyncStringNull = Promise<string | null>

export type AsyncBoolean = Promise<boolean>

type ExistsMethod = {
  exist: () => Promise<{ e: boolean; v: string }>
  isNew: (newVersion: string) => Promise<boolean>
  isIGop: () => Promise<boolean>
}
export type ExistsEnv = {
  gop: ExistsMethod
  env: {
    go: ExistsMethod
  }
}
