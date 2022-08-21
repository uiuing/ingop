import { atom } from 'recoil'

import { ExistsAllEnvResult } from '../apis/ipc/types'
import { GopReleases } from '../apis/releases/types'

export const GopReleasesStore = atom({
  key: 'GopReleasesStore',
  default: {} as GopReleases | null
})

export const ExistsAllEnvStore = atom({
  key: 'ExistsAllEnvStore',
  default: {} as ExistsAllEnvResult
})

export const IsNetErrorStore = atom({
  key: 'IsNetErrorStore',
  default: '' as string | null
})
