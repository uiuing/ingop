import { useTranslation } from 'react-i18next'

import ModuleTemplate from '../../components/Module/template'
import ConfirmTips from '../../components/PopUp/ConfirmTips'
import useInitManage from '../../hooks/useInitManage'
import styles from './style.module.scss'

export default function Manage() {
  const { t } = useTranslation()
  const { nowTm, P } = useInitManage()
  return (
    <>
      <ConfirmTips
        nowTm={nowTm}
        title={t('manage.tips.title')}
        confirmText={t('manage.tips.confirm')}
        closeText={t('manage.tips.close')}
      />
      <div className={styles.wrapper}>
        <div style={{ marginTop: '-10vh' }} />
        {P.map((v) => (
          <ModuleTemplate
            key={v.tK}
            iconComponent={v.iC}
            title={t(v.tK)}
            description={t(v.dK)}
            notification={
              typeof v.nV === undefined ? undefined : t(v.nV as string)
            }
            badgeCount={v.bC}
            click={v.f}
          />
        ))}
        <div />
      </div>
    </>
  )
}
