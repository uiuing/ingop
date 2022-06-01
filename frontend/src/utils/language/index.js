import { createI18n } from 'vue-i18n';
import en from './en';
import zh from './zh';

const language = createI18n({
    locale: navigator.language.slice(0, 2),
    messages: {
        en,
        zh
    }
});

export default language;