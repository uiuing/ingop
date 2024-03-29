import './global.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

import Banner from './components/Banner'
import Buffer from './components/InitBuffer'
import ResetHead from './components/ResetHead'
import Routers from './components/Routers'
import styles from './style.module.scss'

ReactDOM.createRoot(
  document.getElementsByTagName('igop')[0] as HTMLElement
).render(
  <RecoilRoot>
    <ResetHead />
    <Buffer />
    <main className={styles.wrapper}>
      <div className={styles.banner}>
        <Banner />
      </div>
      <div className={styles.content}>
        <Routers />
      </div>
    </main>
  </RecoilRoot>
)
