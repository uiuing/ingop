import Head from 'next/head'
import React from 'react'

import Banner from '../Banner'
import styles from './style.module.scss'

export default function Layout({ children }: React.PropsWithChildren) {
  const meta = {
    title: 'InGop'
  }
  return (
    <>
      <Head>
        <title>{meta.title}</title>
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
