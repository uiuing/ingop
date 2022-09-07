import { Spin } from '@douyinfe/semi-ui'

import { envManage, ingopHome } from '../../../apis/ipc'
import { refresh } from '../../../utils/url'

export default function ManageUninstall() {
  async function run() {
    await ingopHome.remove.all()
    await envManage.remove()
    refresh()
  }
  run()
  return <Spin size="large" style={{ width: '100%', height: '100vh' }} />
}
