import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ExistsAllEnvStore, GopReleasesStore } from '../store'
import { isNewVersion, parseVersion } from '../utils/url'

export default function useInitManage() {
  const getGopReleasesStore = useRecoilValue(GopReleasesStore)
  const existsAllEnvStore = useRecoilValue(ExistsAllEnvStore)
  const [isNew, setIsNew] = useState(true)
  useEffect(() => {
    if (
      getGopReleasesStore !== null &&
      Object.keys(existsAllEnvStore).length !== 0
    ) {
      setIsNew(
        isNewVersion(
          existsAllEnvStore.gop.version as string,
          parseVersion(getGopReleasesStore.tarball_url)
        )
      )
    }
  }, [getGopReleasesStore, existsAllEnvStore])
  return { isNew }
}
