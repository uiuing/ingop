import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { autoSaveFile, envManage } from '../apis/ipc'
import { FileDataParams } from '../apis/ipc/types'
import { getReleases, getRemoteFile } from '../apis/releases'
import { ExistsAllEnvStore, IsNetErrorStore } from '../store'
import { useControlRouter } from '../utils/router'

type RunState = 'download' | 'compile' | 'success'

export default function useInstallGo() {
  const setIsNetError = useSetRecoilState(IsNetErrorStore)
  const { toErrorNetwork } = useControlRouter()
  const existsAllEnv = useRecoilValue(ExistsAllEnvStore)
  const [percent, setPercent] = useState(0)
  const [runState, setRunState] = useState<RunState>('download')
  useEffect(() => {
    getReleases.env.go((errorInfo, releasesData) => {
      if (errorInfo === null && releasesData === null) {
        setIsNetError(errorInfo)
        toErrorNetwork()
      } else {
        getRemoteFile(
          releasesData?.[existsAllEnv.system.platform][
            existsAllEnv.system.arch
          ],
          (isError, errorInfo, downloadOk, progress, base64Data, fileName) => {
            setPercent(progress)
            if (isError) {
              setIsNetError(errorInfo)
              toErrorNetwork()
            } else if (downloadOk) {
              setTimeout(() => {
                setRunState('compile')
                autoSaveFile.env
                  .go({ fileName, base64Data } as FileDataParams)
                  .then(() => {
                    envManage.env.initGo()
                    setTimeout(() => {
                      setTimeout(() => {
                        setRunState('success')
                      }, 500)
                    }, 500)
                  })
              }, 500)
            }
          }
        )
      }
    })
  }, [])
  return { percent, runState }
}
