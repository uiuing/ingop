/* eslint-disable react-hooks/rules-of-hooks */

import { Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import EffectBinary from '../../components/Effect/Binary'
import EffectLogo from '../../components/Effect/Logo'
import StateDownload from '../../components/State/Download'
import useIngopGo from '../../hooks/useIngopGo'
import useInstallGop from '../../hooks/useInstallGop'
import { ExistsAllEnvStore } from '../../store'
import { useControlRouter } from '../../utils/router'

export default function Gop() {
  const { isLoad } = useIngopGo()
  const { percent, runState } = useInstallGop(isLoad)
  const existsAllEnv = useRecoilValue(ExistsAllEnvStore)
  const { toManage, toTipsReboot } = useControlRouter()
  const { Title } = Typography
  const { t } = useTranslation()
  function activeLoadEffect() {
    if (runState === 'download') {
      return <StateDownload percent={percent} />
    }
    if (runState === 'compile') {
      return <EffectBinary title={t('install.compile.title')} />
    }
    // TODO to manage
    if (runState === 'success') {
      setTimeout(() => {
        if (existsAllEnv.system.platform === 'win32') {
          toTipsReboot()
        } else {
          toManage()
        }
      }, 2000)
      return <EffectLogo />
    }
  }
  return (
    <>
      <Title heading={3} style={{ margin: '10% 0 4% 0' }}>
        {t(`install.${runState}.gop`)}
      </Title>
      {activeLoadEffect()}
    </>
  )
}
