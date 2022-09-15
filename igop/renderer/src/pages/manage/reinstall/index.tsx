import { Spin } from '@douyinfe/semi-ui'

import { envManage, igopHome } from '../../../apis/ipc'
import useInitConfig from '../../../hooks/useInitConfig'
import { useControlRouter } from '../../../utils/router'

export default function ManageReinstall() {
  const { initOK } = useInitConfig(true)
  const { toInstallGo } = useControlRouter()
  async function run() {
    await igopHome.remove.all()
    await envManage.remove()
  }
  if (initOK) run().then(() => toInstallGo())
  return <Spin size="large" style={{ width: '100%', height: '100vh' }} />
}
