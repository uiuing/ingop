import English from "./English";
import Chinese from "./Chinese";

// --------------------------------------------------
const LANGUAGES = {
    English,
    Chinese
};
// --------------------------------------------------
const ACRONYM_COMPARISON = {
    en: "English",
    zh: "Chinese"
};
// --------------------------------------------------

const getLocale = () => {
    const browser_language = navigator.language.slice(0, 2);
    if (browser_language in ACRONYM_COMPARISON) {
        return ACRONYM_COMPARISON[browser_language];
    }
    return ACRONYM_COMPARISON["en"];
};

export {
    getLocale,
    LANGUAGES
};