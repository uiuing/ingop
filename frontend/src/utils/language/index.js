import { createI18n } from 'vue-i18n';
import { getLocale,LANGUAGES } from "./languageEncapsulation";

const language = createI18n({
    locale: getLocale(),
    messages: LANGUAGES
});

export default language;