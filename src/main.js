import { createApp } from "vue";

import InGop from "@/InGop.vue";
import initMain from "@/initMain";

import language from "./controllers/utils/language";
import router from "./router";

initMain.initSize();
initMain.initLang();

const app = createApp(InGop);
app.use(router);
app.use(language);
app.mount("ingop-dom");
