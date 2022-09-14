import { IconBookmark } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'
import { ReactNode } from 'react'

// import { openUrl } from '../../../apis/ipc'

export default function IngopSite(): ReactNode {
  const openSite = () => {
    // TODO 3 ADD InGop WebSite
    // ? openUrl('...')
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
