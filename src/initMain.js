import { feasibleLanguage } from "@/controllers/utils/language/languageEncapsulation";

const innerSize = {
  height: `${window.innerHeight}px`,
  width: `${window.innerWidth}px`,
};
const initDom = {
  html: document.documentElement,
  body: document.body,
};

const initSize = () => {
  initDom.html.style.height = innerSize.height;
  initDom.html.style.width = innerSize.width;
  initDom.body.style.height = innerSize.height;
  initDom.body.style.width = innerSize.width;
};

const initLang = () => {
  initDom.html.lang = feasibleLanguage;
};
export default { initSize, initLang };
