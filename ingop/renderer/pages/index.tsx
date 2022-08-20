import { useEffect } from 'react'

import { autoSaveFile, ingopHome } from '../apis/ipc'
import { FileData } from '../apis/ipc/types'
import { getReleases, getRemoteFile } from '../apis/releases'

export default function Index() {
  useEffect(() => {
    ingopHome.init().then(() => {
      getReleases.gop((isError, errorInfo, downloadOk, releasesData) => {
        if (downloadOk) {
          getRemoteFile(
            releasesData?.tarball_url as string,
            (
              isError,
              errorInfo,
              downloadOk,
              progress,
              base64Data,
              fileName
            ) => {
              if (downloadOk) {
                autoSaveFile.gop({ fileName, base64Data } as FileData)
              }
            }
          )
        }
      })
    })
  }, [])
  return <></>
}
