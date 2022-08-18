export type IsWin = boolean

export type GoplusPath = {
  home: string
  // go+ files
  gop_root: string
  gop_bin: string
  // env for go files
  env: string
  go_root: string
  go_path: string
  go_bin: string
  // original document
  source: string
}
