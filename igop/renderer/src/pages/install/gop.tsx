import {
  IllustrationSuccess,
  IllustrationSuccessDark
} from '@douyinfe/semi-illustrations'
import { Empty, Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import EffectBinary from '../../components/Effect/Binary'
import StateDownload from '../../components/State/Download'
import useIGopGo from '../../hooks/useIGopGo'
import useInstallGop from '../../hooks/useInstallGop'
import { ExistsAllEnvStore } from '../../store'
import { useControlRouter } from '../../utils/router'
import { refresh } from '../../utils/url'

export default function InstallGop() {
  const { isLoad } = useIGopGo()
  const { percent, runState } = useInstallGop(isLoad)
  const existsAllEnv = useRecoilValue(ExistsAllEnvStore)
  const { toTipsReboot } = useControlRouter()
  const { Title } = Typography
  const { t } = useTranslation()
  function activeLoadEffect() {
    if (runState === 'download') {
      return <StateDownload percent={percent} />
    }
    if (runState === 'compile') {
      return <EffectBinary title={t('install.compile.title')} />
    }
    if (runState === 'success') {
      setTimeout(() => {
        if (existsAllEnv.system.platform === 'win32') {
          toTipsReboot()
        } else {
          refresh()
        }
      }, 2000)
      return (
        <Empty
          image={<IllustrationSuccess style={{ width: '50vw' }} />}
          darkModeImage={<IllustrationSuccessDark style={{ width: '50vw' }} />}
        />
      )
    }
    return <></>
  }
  return (
    <>
      <Title heading={3} style={{ margin: '10% 0' }}>
        {t(`install.${runState}.gop`)}
      </Title>
      {activeLoadEffect()}
    </>
  )
}
