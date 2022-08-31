import { useRecoilValue } from 'recoil'

import ModuleTemplate from '../../components/Module/template'
import { GopReleasesStore } from '../../store'

export default function Manage() {
  // TODO 1 manage ui
  const getGopReleasesStore = useRecoilValue(GopReleasesStore)
  console.log(getGopReleasesStore)
  return (
    <div>
      <ModuleTemplate />
    </div>
  )
}
