import { Button, Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { ExistsAllEnvStore } from '../../store'
import { useControlRouter } from '../../utils/router'
import styles from './style.module.scss'

export default function InstallIndex() {
  const { Title, Text } = Typography
  const { t } = useTranslation()
  const existsAllEnv = useRecoilValue(ExistsAllEnvStore)
  const { toInstallGo, toInstallGop } = useControlRouter()
  async function start() {
    if (!existsAllEnv.env.go.exist) {
      await toInstallGo()
    } else if (!existsAllEnv.gop.exist) {
      await toInstallGop()
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.desc}>
        <Title className={styles.c1}>Hi 👋🏻</Title>
        <Title className={styles.c2}>{t('install.title')}</Title>
        <Text type="secondary">{t('install.desc')}</Text>
      </div>
      <Button
        theme="solid"
        type="secondary"
        size="large"
        className={styles.btn}
        onClick={() => start()}
      >
        {t('install.button')}
      </Button>
    </div>
  )
}
