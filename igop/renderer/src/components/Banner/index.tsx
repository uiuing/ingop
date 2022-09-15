import { Tooltip } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import ButtonGithub from './ButtonGithub'
import ButtonHelp from './ButtonHelp'
import IGopSite from './IGopSite'
import gopLogo from './images/base64/gopLogo'
import qiniuDoll from './images/base64/qiniuDoll'
import SelectLang from './SelectLang'
import styles from './style.module.scss'

export default function Banner() {
  const { t } = useTranslation()
  const O = [
    {
      needTip: true,
      oC: IGopSite,
      dK: 'banner.tips.site',
      p: 'bottom'
    },
    {
      needTip: true,
      oC: ButtonHelp,
      dK: 'banner.tips.help',
      p: 'bottom'
    },
    {
      needTip: true,
      oC: ButtonGithub,
      dK: 'banner.tips.github',
      p: 'bottom'
    },
    {
      needTip: false,
      oC: SelectLang
    }
  ]
  return (
    <div className={styles.wrapper}>
      <div className={styles.option}>
        {O.map((v, index) => (
          <div key={index.toString()}>
            {v.needTip ? (
              <Tooltip
                content={t(v.dK as string)}
                // @ts-ignore
                position={v.p}
              >
                {v.oC()}
              </Tooltip>
            ) : (
              <>{v.oC()}</>
            )}
          </div>
        ))}
      </div>
      <img src={gopLogo} alt="goplus go+ logo" className={styles.gopLogo} />
      <img src={qiniuDoll} className={styles.qiniuDoll} alt="qiniu doll" />
    </div>
  )
}
