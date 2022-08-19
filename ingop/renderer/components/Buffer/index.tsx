import EffectLogo from './EffectLogo'
import styles from './style.module.scss'

export default function Buffer() {
  return (
    <div className={styles.mask}>
      <EffectLogo />
    </div>
  )
}
