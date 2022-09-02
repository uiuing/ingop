import {
  IllustrationNoAccess,
  IllustrationNoAccessDark
} from '@douyinfe/semi-illustrations'
import { Button, Empty } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import styles from '../../utils/content.module.scss'
import { refresh } from '../../utils/url'

export default function ErrorIngop() {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.empty}>
        <Empty
          image={<IllustrationNoAccess style={{ width: '50vw' }} />}
          darkModeImage={<IllustrationNoAccessDark style={{ width: '50vw' }} />}
          description={t('error.ingop')}
        />
      </div>
      <Button theme="light" type="primary" onClick={refresh}>
        {t('error.again')}
      </Button>
    </div>
  )
}
