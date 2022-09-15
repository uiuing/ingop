import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ExistsAllEnvStore } from '../store'
import { useControlRouter } from '../utils/router'

export default function useIGopGo() {
  const existsAllEnv = useRecoilValue(ExistsAllEnvStore)
  const { toErrorVersion, toTipsIGopGo } = useControlRouter()
  const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    if (!existsAllEnv.env.go.isNew) {
      toErrorVersion()
    }
    if (!existsAllEnv.env.go.isIGop) {
      const s = window.sessionStorage.getItem('igop-tips-isIGop-go')
      if (s !== 'true') {
        toTipsIGopGo()
        window.sessionStorage.setItem('igop-tips-isIGop-go', 'true')
      } else {
        setIsLoad(true)
      }
    } else {
      setIsLoad(true)
    }
  }, [])
  return { isLoad }
}
