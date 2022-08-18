export interface GopReleases {
  html_url: string
  id: number
  name: string
  published_at: string
  tarball_url: string
  body: string
  old_tarball_url: string
}

export interface GoReleases {
  win32: {
    x64: string
    ia32: string
    arm64: string
  }
  darwin: {
    x64: string
    arm64: string
  }
  linux: {
    ia32: string
    arm64: string
  }
}

export type CallBackGopR = (
  isError: boolean,
  errorInfo: string,
  downloadOk: boolean,
  releasesData: GopReleases
) => void
export type CallBackGoR = (
  isError: boolean,
  errorInfo: string,
  downloadOk: boolean,
  releasesData: GoReleases
) => void
export type CallBackFile = (
  isError: boolean,
  errorInfo: string,
  downloadOk: boolean,
  progress: number,
  base64Data: string
) => void

export type ReleasesUrl =
  | 'https://s-ingop.uiuing.com/mirrors/gop/releases.json'
  | 'https://s-ingop.uiuing.com/mirrors/go/releases.json'
