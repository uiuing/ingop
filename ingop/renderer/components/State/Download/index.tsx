import { Progress } from '@douyinfe/semi-ui'

import { redToBlueToGreen } from './colors'

type Props = {
  percent: number
}

export default function StateDownload({ percent }: Props) {
  return (
    <Progress
      percent={percent}
      showInfo
      strokeLinecap="round"
      type="circle"
      stroke={redToBlueToGreen[percent]}
      format={(per) => per + '%'}
      width={180}
      aria-label="download"
    />
  )
}
