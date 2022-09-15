import { IconBookmark } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'
import { ReactNode } from 'react'
import { openUrl } from '../../../apis/ipc'

export default function IGopSite(): ReactNode {
  const openSite = () => {
    openUrl('https://ingop.uiuing.com/')
  }
  return (
    <Button
      onClick={openSite}
      theme="borderless"
      type="tertiary"
      icon={<IconBookmark size="extra-large" />}
    />
  )
}
