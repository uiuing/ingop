import Chinese from './data/Chinese'
import English from './data/English'

// --------------------------------------------------
const LANGUAGES = {
  English,
  Chinese
}
// --------------------------------------------------
const ACRONYM_COMPARISON = {
  en: 'English',
  zh: 'Chinese'
}
// --------------------------------------------------

const nativeLanguage = navigator.language.slice(0, 2)

const feasibleLanguage =
  nativeLanguage in ACRONYM_COMPARISON ? nativeLanguage : 'en'

const locale = ACRONYM_COMPARISON[feasibleLanguage]

export { feasibleLanguage, LANGUAGES, locale, nativeLanguage }
