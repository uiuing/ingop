import ButtonGithub from './ButtonGithub'
import ButtonHelp from './ButtonHelp'
import gopLogo from './images/base64/gopLogo'
import qiniuDoll from './images/base64/qiniuDoll'
import SelectLang from './SelectLang'
import styles from './style.module.scss'

export default function Banner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.option}>
        <ButtonHelp />
        <ButtonGithub />
        <SelectLang />
      </div>
      <img src={gopLogo} alt="goplus go+ logo" className={styles.gopLogo} />
      <img src={qiniuDoll} className={styles.qiniuDoll} alt="qiniu doll" />
    </div>
  )
}
