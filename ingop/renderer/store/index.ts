import { AxiosError } from 'axios'
import { atom } from 'recoil'

import { ExistsAllEnvResult } from '../apis/ipc/types'
import { GopReleases } from '../apis/releases/types'

export const InitOKStore = atom({
  key: 'InitOKStore',
  default: false
})

export const RouterModuleStore = atom({
  key: 'RouterModuleStore',
  default: 'init' as string
})

export const GopReleasesStore = atom({
  key: 'GopReleasesStore',
  default: null as GopReleases | null
})

export const ExistsAllEnvStore = atom({
  key: 'ExistsAllEnvStore',
  default: {} as ExistsAllEnvResult
})

export const IsNetErrorStore = atom({
  key: 'IsNetErrorStore',
  default: null as AxiosError | null
})
