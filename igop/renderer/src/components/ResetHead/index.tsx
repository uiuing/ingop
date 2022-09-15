import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { InitOKStore, RouterModuleStore } from '../../store'

export default function ResetHead() {
  const { t } = useTranslation()
  const routerModule = useRecoilValue(RouterModuleStore)
  const initOK = useRecoilValue(InitOKStore)
  return (
    <Helmet>
      <title>{`IGop - ${
        initOK ? t(`title.${routerModule}`) : t('title.init')
      }`}</title>
    </Helmet>
  )
}
