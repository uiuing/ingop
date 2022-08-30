import { IconGithubLogo } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'

import { openUrl } from '../../../apis/ipc'

export default function ButtonGithub() {
  const openGithub = () => openUrl('https://github.com/goplus/gop')
  return (
    <Button
      onClick={openGithub}
      theme="borderless"
      type="tertiary"
      icon={<IconGithubLogo size="extra-large" />}
    />
  )
}
