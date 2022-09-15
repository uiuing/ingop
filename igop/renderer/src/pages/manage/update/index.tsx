import { Spin } from '@douyinfe/semi-ui'

import useInitConfig from '../../../hooks/useInitConfig'
import { useControlRouter } from '../../../utils/router'

export default function ManageUpdate() {
  const { initOK } = useInitConfig(true)
  const { toInstallGop } = useControlRouter()
  if (initOK) toInstallGop()
  return <Spin size="large" style={{ width: '100%', height: '100vh' }} />
}
