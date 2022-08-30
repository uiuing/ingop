import {
  IllustrationNoAccess,
  IllustrationNoAccessDark
} from '@douyinfe/semi-illustrations'
import { Button, Empty } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import styles from '../../../utils/content.module.scss'
import { useControlRouter } from '../../../utils/router'

export default function TipsIngopGo() {
  const { t } = useTranslation()
  const { toInstallGop } = useControlRouter()
  function again() {
    window.sessionStorage.removeItem('ingop-tips-isIngop-go')
    window.location.reload()
  }
  function install() {
    toInstallGop()
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.empty}>
        <Empty
          image={<IllustrationNoAccess style={{ width: '50vw' }} />}
          darkModeImage={<IllustrationNoAccessDark style={{ width: '50vw' }} />}
          description={t('tips.ingop.go')}
        />
      </div>
      <div>
        <Button
          theme="light"
          type="primary"
          style={{ marginRight: '1vw' }}
          onClick={() => again()}
        >
          {t('tips.ingop.try')}
        </Button>
        <Button
          theme="light"
          type="tertiary"
          style={{ marginLeft: '1vw' }}
          onClick={() => install()}
        >
          {t('tips.ingop.cancel')}
        </Button>
      </div>
    </div>
  )
}
