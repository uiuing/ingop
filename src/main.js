import { createApp } from 'vue';
import InGop from '@/InGop.vue';
import router from './router';
import language from './controllers/utils/language';
import initMain from '@/initMain';

initMain.initSize();
initMain.initLang();

const app = createApp(InGop);
app.use(router);
app.use(language);
app.mount('ingop-dom');
