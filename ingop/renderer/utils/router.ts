import { useRouter } from 'next/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { RouterModuleStore } from '../store'

export const useControlRouter = () => {
  const setRouterModule = useSetRecoilState(RouterModuleStore)
  const router = useRouter()
  const toInstall = () => {
    router.push('/install').then(() => {
      setRouterModule('install')
    })
  }
  const toInstallGo = () => {
    router.push('/install/go').then(() => {
      setRouterModule('installGo')
    })
  }
  const toInstallGop = () => {
    router.push('/install/gop').then(() => {
      setRouterModule('installGop')
    })
  }
  const toManage = () => {
    router.push('/manage').then(() => {
      setRouterModule('manage')
    })
  }
  const toErrorNetwork = () => {
    router.push('/error/network').then(() => {
      setRouterModule('errorNet')
    })
  }
  const toErrorVersion = () => {
    router.push('/error/version').then(() => {
      setRouterModule('errorVersion')
    })
  }
  const toTipsReboot = () => {
    router.push('/tips/reboot').then(() => {
      setRouterModule('tipsReboot')
    })
  }
  const toTipsIngopGo = () => {
    router.push('/tips/ingop-go').then(() => {
      setRouterModule('tipsIngopGo')
    })
  }
  return {
    toInstall,
    toInstallGo,
    toInstallGop,
    toManage,
    toErrorNetwork,
    toErrorVersion,
    toTipsReboot,
    toTipsIngopGo
  }
}
