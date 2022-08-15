import InGopIcon from './InGopIcon'
import Spinner from './Spinner'
import styles from './style.module.css'

export default function Buffer() {
  return (
    <div className={styles.wrapper}>
      <InGopIcon size={'50vw'} />
      <Spinner />
    </div>
  )
}
