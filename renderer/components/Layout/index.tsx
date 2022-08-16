import Head from 'next/head'
import React from 'react'

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
      <main>{children}</main>
    </>
  )
}
