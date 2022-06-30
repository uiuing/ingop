import English from "./data/English";
import Chinese from "./data/Chinese";

// --------------------------------------------------
const LANGUAGES = {
  English,
  Chinese,
};
// --------------------------------------------------
const ACRONYM_COMPARISON = {
  en: "English",
  zh: "Chinese",
};
// --------------------------------------------------

const nativeLanguage = navigator.language.slice(0, 2);

const feasibleLanguage =
  nativeLanguage in ACRONYM_COMPARISON ? nativeLanguage : "en";

const locale = ACRONYM_COMPARISON[feasibleLanguage];

export { nativeLanguage, locale, feasibleLanguage, LANGUAGES };
