import get from 'axios'

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
function requestReleases(url: ReleasesUrl, callback: any) {
  get(url)
    .then((r) => callback(false, true, r.data))
    .catch((e) => callback(true, e, false, null))
}

export function getRemoteFile(url: string, callback: CallBackFile) {
  let complete = 0
  get(url, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const nowComplete =
        ((progressEvent.loaded / progressEvent.total) * 100) | 0
      if (complete !== nowComplete) {
        complete = nowComplete === 100 ? 99 : nowComplete
        callback(false, null, false, complete, null)
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
          typeof reader.result === 'string' ? reader.result : ''
        )
      reader.readAsDataURL(r.data)
    })
    .catch((e) => callback(true, e, false, 0, ''))
}
