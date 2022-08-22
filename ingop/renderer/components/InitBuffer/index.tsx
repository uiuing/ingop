import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import useInitConfig from '../../hooks/useInitConfig'
import { InitOKStore } from '../../store'
import EffectLogo from './EffectLogo'
import styles from './style.module.scss'

export default function InitBuffer() {
  const { initOK } = useInitConfig()
  const [unBuffer, setUnBuffer] = useState(false)
  const [hideBuffer, setHideBuffer] = useState(false)
  const setInitOKStore = useSetRecoilState(InitOKStore)
  if (initOK)
    setTimeout(() => {
      setHideBuffer(true)
      setTimeout(() => {
        setUnBuffer(true)
      }, 500)
      setInitOKStore(true)
    }, 1600)
  return unBuffer ? (
    <></>
  ) : (
    <div className={`${styles.mask} ${hideBuffer ? styles.fadeOutTop : ''}`}>
      <EffectLogo />
    </div>
  )
}
