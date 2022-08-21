import { useRouter } from 'next/router'

export const useControlRouter = () => {
  const router = useRouter()
  const toInstallGo = () => router.push('/install/go')
  const toInstallGop = () => router.push('/install/gop')
  const toManage = () => router.push('/manage')
  const toErrorNetwork = () => router.push('/error/network')
  return { toInstallGo, toInstallGop, toManage, toErrorNetwork }
}
