import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import ErrorIngop from '../../pages/error/Ingop'
import ErrorNetwork from '../../pages/error/network'
import ErrorVersion from '../../pages/error/version'
import InstallIndex from '../../pages/install'
import InstallGo from '../../pages/install/go'
import InstallGop from '../../pages/install/gop'
import Manage from '../../pages/manage'
import ManageReinstall from '../../pages/manage/reinstall'
import ManageUninstall from '../../pages/manage/uninstall'
import ManageUpdate from '../../pages/manage/update'
import TipsIngopGo from '../../pages/tips/ingop-go'
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
    errorIngop: <ErrorIngop />,
    tipsReboot: <TipsReboot />,
    tipsIngopGo: <TipsIngopGo />
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
