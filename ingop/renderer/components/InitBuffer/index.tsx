import { useState } from 'react'

import useInitConfig from '../../hooks/useInitConfig'
import EffectLogo from './EffectLogo'
import styles from './style.module.scss'

export default function InitBuffer() {
  const { initOK } = useInitConfig()
  const [unBuffer, setUnBuffer] = useState(false)
  const [hideBuffer, setHideBuffer] = useState(false)
  if (initOK)
    setTimeout(() => {
      setHideBuffer(true)
      setTimeout(() => {
        setUnBuffer(true)
      }, 500)
    }, 1600)
  return unBuffer ? (
    <></>
  ) : (
    <div className={`${styles.mask} ${hideBuffer ? styles.fadeOutTop : ''}`}>
      <EffectLogo />
    </div>
  )
}
