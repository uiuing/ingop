import './global.scss'
import '../locales/i81n'

import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import Buffer from '../components/InitBuffer'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Buffer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  )
}
export default MyApp
