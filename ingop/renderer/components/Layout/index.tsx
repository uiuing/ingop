import Head from 'next/head'
import React from 'react'
import { getI18n, useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { RouterModuleStore } from '../../store'
import Banner from '../Banner'
import styles from './style.module.scss'

export default function Layout({ children }: React.PropsWithChildren) {
  const { t } = useTranslation()
  const routerModule = useRecoilValue(RouterModuleStore)
  console.log(t('title.' + routerModule))
  return (
    <>
      <Head>
        <title>{`InGop - ${t('title.' + routerModule)}`}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0,width=device-width,user-scalable=no"
        />
      </Head>
      <main className={styles.wrapper}>
        <div className={styles.banner}>
          <Banner></Banner>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </>
  )
}
