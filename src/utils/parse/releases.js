import axios from 'axios'

import { nativeLanguage } from '@/utils/language/languageEncapsulation'

async function getReleasesJSON() {
  const config = {
    params: {
      th: Math.floor(new Date().getTime() / 1000 / 60 / 60)
    }
  }
  const res = await axios.get(
    'https://ingop.uiuing.com/mirrors/releases.json',
    config
  )
  const source = nativeLanguage === 'zh' ? 'zh' : 'other'
  return res.data[source]
}

// eslint-disable-next-line import/prefer-default-export
export { getReleasesJSON }
