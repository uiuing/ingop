import { useRecoilValue } from 'recoil'

import { GopReleasesStore } from '../../store'

export default function Manage() {
  const getGopReleasesStore = useRecoilValue(GopReleasesStore)
  return (
    <div>
      <h1>Manage</h1>
    </div>
  )
}
