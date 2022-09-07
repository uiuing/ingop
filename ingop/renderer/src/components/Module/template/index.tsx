import { Badge, Typography } from '@douyinfe/semi-ui'
import { ReactNode } from 'react'

import styles from './style.module.scss'

type Props = {
  iconComponent: () => ReactNode
  title: string
  description: string
  notification?: string
  badgeCount?: string
  click?: () => void
}

export default function ModuleTemplate({
  iconComponent,
  title,
  description,
  notification,
  badgeCount,
  click = () => {}
}: Props) {
  const { Title, Text } = Typography
  function badgeC() {
    const t = <Title heading={4}>{title}</Title>
    return typeof badgeCount === 'undefined' ? (
      t
    ) : (
      <Badge type="danger" count={badgeCount}>
        {t}
      </Badge>
    )
  }
  function notificationC() {
    return typeof notification === 'undefined' ? (
      <></>
    ) : (
      <Text type="danger" size="small">
        {notification}
      </Text>
    )
  }
  return (
    <div className={`${styles.template}`} role="presentation" onClick={click}>
      <div className={styles.icon}>{iconComponent()}</div>
      <div className={styles.info}>
        <div className={styles.desc}>
          {badgeC()}
          <Text type="secondary" size="small">
            {description}
          </Text>
        </div>
        {notificationC()}
      </div>
    </div>
  )
}
