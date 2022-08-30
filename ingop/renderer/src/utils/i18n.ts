import { changeLanguage } from 'i18next'
import { getI18n } from 'react-i18next'

export function initLanguage() {
  const { localStorage } = window
  const language = localStorage.getItem('language')
  if (language) {
    changeLanguage(language)
  } else {
    localStorage.setItem('language', 'en-US')
  }
}

export function setLanguage(language: string) {
  if (getI18n().language !== language) {
    window.localStorage.setItem('language', language)
    changeLanguage(language)
  }
}
