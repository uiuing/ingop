import { createApp } from 'vue';
import App from './App.vue';
import language from './utils/language/index';

createApp(App)
    .use(language)
    .mount('#app');
