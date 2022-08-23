import { IconHelpCircle } from '@douyinfe/semi-icons'
import { Button } from '@douyinfe/semi-ui'

// import { openUrl } from '../../../apis/ipc'

export default function ButtonHelp() {
  const openHelp = () => {
    // TODO ADD InGop WebSite
    // ? openUrl('...')
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
