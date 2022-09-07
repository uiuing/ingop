import { ReactNode, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import ReinstallIcon from '../components/Module/Reinstall'
import UninstallIcon from '../components/Module/UninstallIcon'
import UpdateIcon from '../components/Module/UpdateIcon'
import { ExistsAllEnvStore, GopReleasesStore } from '../store'
import { useControlRouter } from '../utils/router'
import { isNewVersion, parseVersion } from '../utils/url'

type PT = {
  iC: () => ReactNode
  tK: string
  dK: string
  nV: string | undefined
  bC: string | undefined
  f: () => void
}

export default function useInitManage() {
  const { toManageUpdate, toManageReinstall, toManageUninstall, toErrorIngop } =
    useControlRouter()
  const getGopReleasesStore = useRecoilValue(GopReleasesStore)
  const existsAllEnvStore = useRecoilValue(ExistsAllEnvStore)
  const [isNew, setIsNew] = useState(true)
  const [nowTm, setNowTm] = useState<{
    dK: string
    confirm: () => void
    close: () => void
  } | null>(null)
  const [P, setP] = useState<Array<PT>>([])
  useEffect(() => {
    if (Object.keys(existsAllEnvStore).length !== 0) {
      if (getGopReleasesStore !== null) {
        setIsNew(
          isNewVersion(
            existsAllEnvStore.gop.version as string,
            parseVersion(getGopReleasesStore.tarball_url)
          )
        )
      }
      if (!existsAllEnvStore.gop.isIngop) {
        toErrorIngop()
        return
      }
      const T = {
        update: {
          dK: 'update',
          confirm: isNew ? () => setNowTm(null) : () => toManageUpdate(),
          close: () => setNowTm(null)
        },
        reinstall: {
          dK: 're',
          confirm: () => toManageReinstall(),
          close: () => setNowTm(null)
        },
        uninstall: {
          dK: 'un',
          confirm: () => toManageUninstall(),
          close: () => setNowTm(null)
        }
      }
      setP([
        {
          iC: UpdateIcon,
          tK: 'manage.update.title',
          dK: 'manage.update.desc',
          nV: isNew ? undefined : 'manage.update.notification',
          bC: isNew ? undefined : 'NEW',
          f: () => setNowTm(T.update)
        },
        {
          iC: ReinstallIcon,
          tK: 'manage.reinstall.title',
          dK: 'manage.reinstall.desc',
          nV: undefined,
          bC: undefined,
          f: () => setNowTm(T.reinstall)
        },
        {
          iC: UninstallIcon,
          tK: 'manage.uninstall.title',
          dK: 'manage.uninstall.desc',
          nV: undefined,
          bC: undefined,
          f: () => setNowTm(T.uninstall)
        }
      ])
    }
  }, [isNew, getGopReleasesStore, existsAllEnvStore])
  return { nowTm, P, getGopReleasesStore, existsAllEnvStore, isNew }
}
