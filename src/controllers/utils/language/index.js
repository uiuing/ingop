import { createI18n } from "vue-i18n/index";
import { LANGUAGES, locale } from "./languageEncapsulation";

const language = createI18n({
  locale,
  messages: LANGUAGES,
});

export default language;
