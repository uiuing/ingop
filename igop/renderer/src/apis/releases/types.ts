import { AxiosError } from 'axios'

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
  errorInfo: string | null,
  releasesData: GopReleases | null
) => void
export type CallBackGoR = (
  errorInfo: string | null,
  releasesData: GoReleases | null
) => void
export type CallBackFile = (
  isError: boolean,
  errorInfo: AxiosError | null,
  downloadOk: boolean,
  progress: number,
  base64Data: string | null,
  fileName: string | null
) => void

export type ReleasesUrl =
  | 'https://s-ingop.uiuing.com/mirrors/gop/releases.json'
  | 'https://s-ingop.uiuing.com/mirrors/go/releases.json'
