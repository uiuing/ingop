import {
  IllustrationNoResult,
  IllustrationNoResultDark
} from '@douyinfe/semi-illustrations'
import { Button, Empty, Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { IsNetErrorStore } from '../../store'
import styles from '../../utils/content.module.scss'
import { refresh } from '../../utils/url'

export default function ErrorNetwork() {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.empty}>
        <Empty
          image={<IllustrationNoResult style={{ width: '50vw' }} />}
          darkModeImage={<IllustrationNoResultDark style={{ width: '50vw' }} />}
          description={t('error.network')}
        />
        <div style={{ marginTop: '2vh' }}>{ErrorTips()}</div>
      </div>
      <Button theme="light" type="primary" onClick={() => refresh()}>
        {t('error.again')}
      </Button>
    </div>
  )
}

function ErrorTips() {
  const { Text } = Typography
  const isNetError = useRecoilValue(IsNetErrorStore)
  return isNetError !== null ? (
    <Text type="tertiary">url - {isNetError.config.url}</Text>
  ) : (
    <></>
  )
}
