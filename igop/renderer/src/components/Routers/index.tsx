import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import ErrorIGop from '../../pages/error/iGop'
import ErrorNetwork from '../../pages/error/network'
import ErrorVersion from '../../pages/error/version'
import InstallIndex from '../../pages/install'
import InstallGo from '../../pages/install/go'
import InstallGop from '../../pages/install/gop'
import Manage from '../../pages/manage'
import ManageReinstall from '../../pages/manage/reinstall'
import ManageUninstall from '../../pages/manage/uninstall'
import ManageUpdate from '../../pages/manage/update'
import TipsIGopGo from '../../pages/tips/igop-go'
import TipsReboot from '../../pages/tips/reboot'
import { ET } from '../../types/router'

export default function Routers() {
  const E: ET = {
    install: <InstallIndex />,
    installGo: <InstallGo />,
    installGop: <InstallGop />,
    manage: <Manage />,
    manageUpdate: <ManageUpdate />,
    manageReinstall: <ManageReinstall />,
    manageUninstall: <ManageUninstall />,
    errorNet: <ErrorNetwork />,
    errorVersion: <ErrorVersion />,
    errorIGop: <ErrorIGop />,
    tipsReboot: <TipsReboot />,
    tipsIGopGo: <TipsIGopGo />
  }
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<></>} />
        {Object.keys(E).map((k) => (
          <Route key={k} path={k} element={E[k]} />
        ))}
      </Routes>
    </HashRouter>
  )
}
