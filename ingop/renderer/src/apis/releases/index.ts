import get from 'axios'

import { parseFileName } from '../../utils/url'
import { CallBackFile, CallBackGopR, CallBackGoR, ReleasesUrl } from './types'

export const getReleases = {
  gop: (callback: CallBackGopR) => {
    requestReleases(
      'https://s-ingop.uiuing.com/mirrors/gop/releases.json',
      callback
    )
  },
  env: {
    go: (callback: CallBackGoR) =>
      requestReleases(
        'https://s-ingop.uiuing.com/mirrors/go/releases.json',
        callback
      )
  }
}
function requestReleases(url: ReleasesUrl, callback: (...arg) => void) {
  const t = Math.floor(new Date().getTime() / 1000 / 3600)
  get(url, {
    params: {
      t
    }
  })
    .then((r) => callback(null, r.data))
    .catch((e) => callback(e, null))
}

export function getRemoteFile(url: string, callback: CallBackFile) {
  let complete = 0
  get(url, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const nowComplete = Math.floor(
        (progressEvent.loaded / progressEvent.total) * 100
      )
      if (complete !== nowComplete) {
        complete = nowComplete === 100 ? 99 : nowComplete
        callback(false, null, false, complete, null, null)
      }
    }
  })
    .then((r) => {
      const reader = new FileReader()
      reader.onload = () =>
        callback(
          false,
          null,
          true,
          100,
          typeof reader.result === 'string' ? reader.result : null,
          parseFileName(url)
        )
      reader.readAsDataURL(r.data)
    })
    .catch((e) => callback(true, e, false, 0, null, null))
}
