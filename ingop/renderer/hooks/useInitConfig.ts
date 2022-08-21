import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { existsAllEnv } from '../apis/ipc'
import { getReleases } from '../apis/releases'
import { ExistsAllEnvStore, GopReleasesStore, IsNetErrorStore } from '../store'
import { initLanguage } from '../utils/i18n'
import { useControlRouter } from '../utils/router'
import { parseVersion } from '../utils/url'

type InitConfigResult = {
  initOK: boolean
}

export default function useInitConfig(): InitConfigResult {
  const setNetErrorStore = useSetRecoilState(IsNetErrorStore)
  const setGopReleasesStore = useSetRecoilState(GopReleasesStore)
  const setExistsAllEnvStore = useSetRecoilState(ExistsAllEnvStore)
  const [initOK, setInitOK] = useState<boolean>(false)
  const { toInstallGop, toInstallGo, toManage } = useControlRouter()
  useEffect(() => {
    initLanguage()
    async function initEnvReleases(errorInfo, releasesData) {
      setNetErrorStore(errorInfo)
      setGopReleasesStore(releasesData)
      const gopNewVersion =
        releasesData === null ? '0.0.0' : parseVersion(releasesData.tarball_url)
      const e = await existsAllEnv({
        gopNewVersion,
        env: { goNewVersion: '1.16' }
      })
      setExistsAllEnvStore(e)
      if (!e.env.go.exist) {
        await toInstallGo()
      } else if (!e.gop.exist) {
        await toInstallGop()
      }
      if (e.gop.exist && e.env.go.exist) {
        await toManage()
      }
      setInitOK(true)
    }
    setTimeout(() => {
      getReleases.gop(initEnvReleases)
    }, 1400)
  }, [])
  return { initOK }
}
