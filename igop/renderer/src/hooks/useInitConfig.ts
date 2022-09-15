import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { existsAllEnv, igopHome } from '../apis/ipc'
import { getReleases } from '../apis/releases'
import { ExistsAllEnvStore, GopReleasesStore, IsNetErrorStore } from '../store'
import { initLanguage } from '../utils/i18n'
import { useControlRouter } from '../utils/router'
import { parseVersion } from '../utils/url'

type InitConfigResult = {
  initOK: boolean
}

export default function useInitConfig(canError: boolean): InitConfigResult {
  const setNetErrorStore = useSetRecoilState(IsNetErrorStore)
  const setGopReleasesStore = useSetRecoilState(GopReleasesStore)
  const setExistsAllEnvStore = useSetRecoilState(ExistsAllEnvStore)
  const [initOK, setInitOK] = useState<boolean>(false)
  const { toInstall, toManage, toErrorNetwork } = useControlRouter()
  useEffect(() => {
    igopHome.init()
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
      if ((!e.env.go.exist || !e.gop.exist) && !canError) {
        await toInstall()
      }
      if (e.gop.exist && e.env.go.exist && !canError) {
        await toManage()
      }
      if (canError && releasesData === null) {
        toErrorNetwork()
      } else {
        setInitOK(true)
      }
    }
    getReleases.gop(initEnvReleases)
  }, [])
  return { initOK }
}
