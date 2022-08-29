import { Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import EffectBinary from '../../components/Effect/Binary'
import EffectLogo from '../../components/Effect/Logo'
import StateDownload from '../../components/State/Download'
import useInstallGo from '../../hooks/useInstallGo'
import { useControlRouter } from '../../utils/router'

export default function Go() {
  const { percent, runState, isInitLoad } = useInstallGo()
  const { toInstallGop } = useControlRouter()
  const { t } = useTranslation()
  const { Title } = Typography
  function activeLoadEffect() {
    if (runState === 'download') {
      return <StateDownload percent={percent} />
    }
    if (runState === 'compile') {
      return <EffectBinary title={t('install.compile.title')} />
    }
    if (runState === 'success') {
      setTimeout(() => toInstallGop(), 1300)
      return <EffectLogo />
    }
  }
  return isInitLoad ? (
    <>
      <Title heading={3} style={{ margin: '10% 0 10% 0' }}>
        {t(`install.${runState}.go`)}
      </Title>
      {activeLoadEffect()}
    </>
  ) : (
    <></>
  )
}
