/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { autoSaveFile, compile, envManage } from '../apis/ipc'
import { FileDataParams } from '../apis/ipc/types'
import { getReleases, getRemoteFile } from '../apis/releases'
import { ExistsAllEnvStore, GopReleasesStore, IsNetErrorStore } from '../store'
import { useControlRouter } from '../utils/router'

type RunState = 'download' | 'compile' | 'success'

export default function useInstallGop() {
  const setIsNetError = useSetRecoilState(IsNetErrorStore)
  const gopReleases = useRecoilValue(GopReleasesStore)
  const { toErrorNetwork } = useControlRouter()
  const existsAllEnv = useRecoilValue(ExistsAllEnvStore)
  const [percent, setPercent] = useState(0)
  const [runState, setRunState] = useState<RunState>('download')
  useEffect(() => {
    if (gopReleases === null) {
      toErrorNetwork()
    } else {
      getRemoteFile(
        gopReleases.tarball_url,
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
                  compile.gop().then(() => {
                    envManage.initGop()
                    setTimeout(() => {
                      setRunState('success')
                    }, 2000)
                  })
                })
            }, 2000)
          }
        }
      )
    }
  }, [])
  return { percent, runState }
}
