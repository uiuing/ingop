import {
  IllustrationNoAccess,
  IllustrationNoAccessDark
} from '@douyinfe/semi-illustrations'
import { Button, Empty } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import { rebootWindows } from '../../../apis/ipc'
import styles from '../../../utils/content.module.scss'

export default function TipsReboot() {
  const { t } = useTranslation()
  return (
    <div className={styles.wrapper}>
      <div className={styles.empty}>
        <Empty
          image={<IllustrationNoAccess style={{ width: '50vw' }} />}
          darkModeImage={<IllustrationNoAccessDark style={{ width: '50vw' }} />}
          description={t('tips.reboot.tip')}
        />
      </div>
      <Button
        theme="light"
        type="primary"
        style={{ marginRight: '1vw' }}
        onClick={() => rebootWindows()}
      >
        {t('tips.reboot.re')}
      </Button>
    </div>
  )
}
