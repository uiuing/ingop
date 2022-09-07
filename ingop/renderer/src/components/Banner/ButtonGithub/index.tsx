import { IconGithubLogo } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'
import { ReactNode } from 'react'

import { openUrl } from '../../../apis/ipc'

export default function ButtonGithub(): ReactNode {
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
