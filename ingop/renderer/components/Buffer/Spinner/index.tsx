import styles from './style.module.css'

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className="bounce3"></div>
    </div>
  )
}
