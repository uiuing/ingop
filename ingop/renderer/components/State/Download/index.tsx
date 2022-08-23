import { Progress } from '@douyinfe/semi-ui'
import { Typography } from '@douyinfe/semi-ui'
import { useTranslation } from 'react-i18next'

import { redToBlueToGreen } from './colors'

type Props = {
  module: string
  percent: number
}

export default function Download({ module, percent }: Props) {
  const { Title } = Typography
  const { t } = useTranslation()
  return (
    <>
      <Title heading={3} style={{ margin: '10% 0 7% 0' }}>
        {`${t('install.download.title')} [${module}] ...`}
      </Title>
      <Progress
        percent={percent}
        showInfo
        strokeLinecap="round"
        type="circle"
        stroke={redToBlueToGreen[percent]}
        format={(per) => per + '%'}
        width={200}
        aria-label="download"
      />
    </>
  )
}
