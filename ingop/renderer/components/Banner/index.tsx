import { Typography } from '@douyinfe/semi-ui'

import ButtonGithub from './ButtonGithub'
import SelectLang from './SelectLang'
import styles from './style.module.scss'

export default function Banner() {
  const { Title } = Typography

  return (
    <div className={styles.wrapper}>
      <div className={styles.option}>
        <ButtonGithub />
        <SelectLang />
      </div>
      <img
        src="./gop_logo.svg"
        alt="goplus go+ logo"
        className={styles.gopLogo}
      />
      <img
        src="./qiniu_doll.png"
        className={styles.qiniuDoll}
        alt="qiniu doll"
      />
    </div>
  )
}
