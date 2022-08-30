import { useRecoilValue } from 'recoil'

import { GopReleasesStore } from '../../store'

export default function Manage() {
  // TODO 1 manage ui
  const getGopReleasesStore = useRecoilValue(GopReleasesStore)
  return (
    <div>
      <h1>Manage</h1>
    </div>
  )
}
