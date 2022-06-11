import { createApp } from 'vue';
import App from './App.vue';
import language from './utils/language/index';
import router from "./router";
import controller from "./controller/router";
import api from "./controller/api";

const app = createApp(App);

app.config.globalProperties.$controller = controller;
app.config.globalProperties.$api = api;

app.use(router)
    .use(language)
    .mount('#app');


document.documentElement.style.setProperty("--internal-height", window.innerHeight + "px");
