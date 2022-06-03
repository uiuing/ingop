import { createApp } from 'vue';
import App from './App.vue';
import language from './utils/language/index';
import router from "./router";
import controller from "./controller/index";

const app = createApp(App);

app.config.globalProperties.$controller = controller;

app.use(router)
    .use(language)
    .mount('#app');


document.documentElement.style.setProperty("--internal-height", window.innerHeight + "px");
