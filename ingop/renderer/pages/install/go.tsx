import Download from '../../components/State/Download'
import useInstallGo from '../../hooks/useInstallGo'

export default function Go() {
  const { percent, runState } = useInstallGo()
  return (
    <>
      <div>{runState}</div>
      <Download module="Go" percent={percent} />
    </>
  )
}
