import './global.css'

import type { AppProps } from 'next/app'

import Buffer from '../components/Buffer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Buffer></Buffer>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
