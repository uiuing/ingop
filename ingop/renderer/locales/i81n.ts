import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enUS from './data/en-US.json'
import zhCN from './data/zh-CN.json'
const resources = {
  'en-US': {
    translation: enUS
  },
  'zh-CN': {
    translation: zhCN
  }
}
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en-US'
})

export default i18n
