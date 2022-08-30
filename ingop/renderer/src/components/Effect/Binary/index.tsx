import styles from './style.module.scss'

type Proxy = {
  title: string
}

export default function EffectBinary({ title }: Proxy) {
  return (
    <div className={`${styles.loader} ${styles.active}`}>
      <span className={styles.binary} />
      <span className={styles.binary} />
      <span className={styles.title}>{title}</span>
    </div>
  )
}
