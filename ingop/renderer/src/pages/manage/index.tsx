import { useTranslation } from 'react-i18next'

import ReinstallIcon from '../../components/Module/Reinstall'
import ModuleTemplate from '../../components/Module/template'
import UninstallIcon from '../../components/Module/UninstallIcon'
import UpdateIcon from '../../components/Module/UpdateIcon'
import useInitManage from '../../hooks/useInitManage'
import styles from './style.module.scss'

export default function Manage() {
  const { t } = useTranslation()
  const { isNew } = useInitManage()
  const P = [
    {
      iC: UpdateIcon,
      tK: 'manage.update.title',
      dK: 'manage.update.desc',
      nV: isNew ? undefined : 'manage.update.notification',
      bC: isNew ? undefined : 'NEW',
      f: () => {}
    },
    {
      iC: ReinstallIcon,
      tK: 'manage.reinstall.title',
      dK: 'manage.reinstall.desc',
      nV: undefined,
      bC: undefined,
      f: () => {}
    },
    {
      iC: UninstallIcon,
      tK: 'manage.uninstall.title',
      dK: 'manage.uninstall.desc',
      nV: undefined,
      bC: undefined,
      f: () => {}
    }
  ]
  return (
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
  )
}
