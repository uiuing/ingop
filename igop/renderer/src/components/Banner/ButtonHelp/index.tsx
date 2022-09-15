import { IconHelpCircle } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'
import { ReactNode } from 'react'
import { openUrl } from '../../../apis/ipc'

export default function ButtonHelp(): ReactNode {
  const openHelp = () => {
    openUrl('https://ingop.uiuing.com/ingop-guide/igop/help')
  }
  return (
    <Button
      onClick={openHelp}
      theme="borderless"
      type="tertiary"
      icon={<IconHelpCircle size="extra-large" />}
    />
  )
}
