/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { autoSaveFile, envManage } from '../apis/ipc'
import { FileDataParams } from '../apis/ipc/types'
import { getRemoteFile } from '../apis/releases'
import { GopReleasesStore, IsNetErrorStore } from '../store'
import { useControlRouter } from '../utils/router'

type RunState = 'download' | 'compile' | 'success'

export default function useInstallGop(isLoad: boolean) {
  const setIsNetError = useSetRecoilState(IsNetErrorStore)
  const gopReleases = useRecoilValue(GopReleasesStore)
  const { toErrorNetwork } = useControlRouter()
  const [percent, setPercent] = useState(0)
  const [runState, setRunState] = useState<RunState>('download')
  useEffect(() => {
    if (!isLoad) return
    if (gopReleases === null) {
      toErrorNetwork()
    } else {
      setTimeout(() => {
        run(gopReleases.tarball_url)
      }, 1200)
    }
    function run(tarball_url: string) {
      getRemoteFile(
        tarball_url,
        (isError, errorInfo, downloadOk, progress, base64Data, fileName) => {
          setPercent(progress)
          if (isError) {
            setIsNetError(errorInfo)
            toErrorNetwork()
          } else if (downloadOk) {
            setTimeout(() => {
              setRunState('compile')
              autoSaveFile
                .gop({ fileName, base64Data } as FileDataParams)
                .then(() => {
                  envManage.initGop().then(() => {
                    setTimeout(() => {
                      setRunState('success')
                    }, 3500)
                  })
                })
            }, 1500)
          }
        }
      )
    }
  }, [isLoad])
  return { percent, runState }
}
