import EffectLogo from './EffectLogo'
import styles from './style.module.scss'

type Props = {
  isHide: boolean
}

export default function Buffer({ isHide }: Props) {
  return (
    <div className={`${styles.mask} ${isHide ? '' : styles.fadeOutTop}`}>
      <EffectLogo />
    </div>
  )
}
