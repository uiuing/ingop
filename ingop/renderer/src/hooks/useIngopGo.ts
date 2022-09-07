import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { ExistsAllEnvStore } from '../store'
import { useControlRouter } from '../utils/router'

export default function useIngopGo() {
  const existsAllEnv = useRecoilValue(ExistsAllEnvStore)
  const { toErrorVersion, toTipsIngopGo } = useControlRouter()
  const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    if (!existsAllEnv.env.go.isNew) {
      toErrorVersion()
    }
    if (!existsAllEnv.env.go.isIngop) {
      const s = window.sessionStorage.getItem('ingop-tips-isIngop-go')
      if (s !== 'true') {
        toTipsIngopGo()
        window.sessionStorage.setItem('ingop-tips-isIngop-go', 'true')
      } else {
        setIsLoad(true)
      }
    } else {
      setIsLoad(true)
    }
  }, [])
  return { isLoad }
}
