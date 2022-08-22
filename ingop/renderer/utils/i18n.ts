import { changeLanguage } from 'i18next'
import { getI18n } from 'react-i18next'

export function initLanguage() {
  if (typeof global !== 'undefined') {
    const { localStorage } = global
    const language = localStorage.getItem('language')
    if (language) {
      changeLanguage(language)
    } else {
      localStorage.setItem('language', 'en-US')
    }
  }
}

export function setLanguage(language: string) {
  if (typeof global !== 'undefined' && getI18n().language !== language) {
    global.localStorage.setItem('language', language)
    changeLanguage(language)
  }
}
