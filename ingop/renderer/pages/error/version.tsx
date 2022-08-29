import {
  IllustrationNoAccess,
  IllustrationNoAccessDark
} from '@douyinfe/semi-illustrations'
import { Button, Empty, Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { IsNetErrorStore } from '../../store'
import styles from './style.module.scss'

export default function Version() {
  const { t } = useTranslation()
  function again() {
    if (typeof global !== 'undefined') {
      global.location.reload()
    }
  }
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.empty}>
          <Empty
            image={<IllustrationNoAccess style={{ width: '50vw' }} />}
            darkModeImage={
              <IllustrationNoAccessDark style={{ width: '50vw' }} />
            }
            description={t('error.version')}
          />
          <div style={{ marginTop: '2vh' }}>{ErrorTips()}</div>
        </div>
        <Button theme="light" type="primary" onClick={again}>
          {t('error.again')}
        </Button>
      </div>
    </>
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
