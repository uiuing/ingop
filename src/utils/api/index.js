import axios from 'axios'

import { nativeLanguage } from '@/utils/language/languageEncapsulation'

const getReleasesJSON = async () => {
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

const {
  startInstall,
  startUpdate,
  startReload,
  startUninstall,
  getGoplusVersion,
  stateMessages
} = window.ipcAPI

export {
  getGoplusVersion,
  getReleasesJSON,
  startInstall,
  startReload,
  startUninstall,
  startUpdate,
  stateMessages
}
