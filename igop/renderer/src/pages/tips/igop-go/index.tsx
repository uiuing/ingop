import {
  IllustrationNoAccess,
  IllustrationNoAccessDark
} from '@douyinfe/semi-illustrations'
import { Button, Empty } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import styles from '../../../utils/content.module.scss'
import { useControlRouter } from '../../../utils/router'
import { refresh } from '../../../utils/url'

export default function TipsIGopGo() {
  const { t } = useTranslation()
  const { toInstallGop } = useControlRouter()
  function again() {
    window.sessionStorage.removeItem('igop-tips-isIGop-go')
    refresh()
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
          description={t('tips.igop.go')}
        />
      </div>
      <div>
        <Button
          theme="light"
          type="primary"
          style={{ marginRight: '1vw' }}
          onClick={() => again()}
        >
          {t('tips.igop.try')}
        </Button>
        <Button
          theme="light"
          type="tertiary"
          style={{ marginLeft: '1vw' }}
          onClick={() => install()}
        >
          {t('tips.igop.cancel')}
        </Button>
      </div>
    </div>
  )
}
