import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'

import { RouterModuleStore } from '../store'

export const useControlRouter = () => {
  const setRouterModule = useSetRecoilState(RouterModuleStore)
  const router = useRouter()
  const toInstall = () => {
    router.push('/install')
    setRouterModule('install')
  }
  const toInstallGo = () => {
    router.push('/install/go')
    setRouterModule('installGo')
  }
  const toInstallGop = () => {
    router.push('/install/gop')
    setRouterModule('installGop')
  }
  const toManage = () => {
    router.push('/manage')
    setRouterModule('manage')
  }
  const toErrorNetwork = () => {
    router.push('/error/network')
    setRouterModule('errorNet')
  }
  return { toInstall, toInstallGo, toInstallGop, toManage, toErrorNetwork }
}
