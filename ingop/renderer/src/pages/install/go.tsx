import { Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { existsAllEnv } from '../../apis/ipc'
import EffectBinary from '../../components/Effect/Binary'
import EffectLogo from '../../components/Effect/Logo'
import StateDownload from '../../components/State/Download'
import useInstallGo from '../../hooks/useInstallGo'
import { ExistsAllEnvStore } from '../../store'
import { useControlRouter } from '../../utils/router'

export default function InstallGo() {
  const setExistsAllEnvStore = useSetRecoilState(ExistsAllEnvStore)
  const { percent, runState } = useInstallGo()
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
    existsAllEnv({
      gopNewVersion: '0.0.0',
      env: { goNewVersion: '1.16' }
    }).then((e) => {
      setExistsAllEnvStore(e)
    })
    setTimeout(() => toInstallGop(), 2000)
    return <EffectLogo />
  }
  return (
    <>
      <Title heading={3} style={{ margin: '10% 0 4% 0' }}>
        {t(`install.${runState}.go`)}
      </Title>
      {activeLoadEffect()}
    </>
  )
}
