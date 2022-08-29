import {
  IllustrationNoAccess,
  IllustrationNoAccessDark
} from '@douyinfe/semi-illustrations'
import { Button, Empty } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import styles from '../../utils/content.module.scss'

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
        </div>
        <Button theme="light" type="primary" onClick={again}>
          {t('error.again')}
        </Button>
      </div>
    </>
  )
}
