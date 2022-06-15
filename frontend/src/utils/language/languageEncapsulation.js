import English from "./English";
import Chinese from "./Chinese";
import Japanese from "./Japanese";

// --------------------------------------------------
const LANGUAGES = {
    English,
    Chinese,
    Japanese
};
// --------------------------------------------------
const ACRONYM_COMPARISON = {
    en: "English",
    zh: "Chinese",
    ja: "Japanese"
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