import Head from 'next/head'

export default function Layout({ children }) {
  const meta = {
    title: 'InGop',
  }
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width,user-scalable=no"></meta>
      </Head>
      <main>{children}</main>
    </>
  )
}
