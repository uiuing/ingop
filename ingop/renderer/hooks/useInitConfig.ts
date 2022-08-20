import { useEffect, useState } from 'react'

import { initLanguage } from '../utils/i18n'

type InitConfigResult = {
  initOK: boolean
}

export default function useInitConfig(): InitConfigResult {
  const [initOK, setInitOK] = useState<boolean>(false)
  useEffect(() => {
    initLanguage()
    // TODO more
    setTimeout(() => {
      setInitOK(true)
    }, 1500)
  }, [])
  return { initOK }
}
