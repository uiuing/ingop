import styles from './style.module.scss'

export default function Banner() {
  return (
    <div>
      <img
        src="./qiniu_doll.png"
        className={styles.qiniuDoll}
        alt="qiniu doll"
      />
    </div>
  )
}
