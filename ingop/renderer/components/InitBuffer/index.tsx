import { useState } from 'react'

import useInitConfig from '../../hooks/useInitConfig'
import EffectLogo from './EffectLogo'
import styles from './style.module.scss'

export default function InitBuffer() {
  const { initOK } = useInitConfig()
  const [unBuffer, setUnBuffer] = useState(false)
  if (initOK)
    setTimeout(() => {
      setUnBuffer(true)
    }, 500)
  return unBuffer ? (
    <></>
  ) : (
    <div className={`${styles.mask} ${initOK ? styles.fadeOutTop : ''}`}>
      <EffectLogo />
    </div>
  )
}
