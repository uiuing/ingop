import './global.scss'
import '../locales/i81n'

import type { AppProps } from 'next/app'

import Buffer from '../components/Buffer'
import Layout from '../components/Layout'
import useInitConfig from '../hooks/useInitConfig'

function MyApp({ Component, pageProps }: AppProps) {
  const { initOK } = useInitConfig()
  return (
    <>
      <Buffer isHide={initOK}></Buffer>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default MyApp
