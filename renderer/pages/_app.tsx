import './global.scss'

import type { AppProps } from 'next/app'

import Buffer from '../components/Buffer'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Buffer></Buffer>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default MyApp
