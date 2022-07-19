import { createApp } from 'vue'

import initMain from '@/controllers/utils/window/initMain'
import InGop from '@/InGop.vue'

import language from './controllers/utils/language'
import router from './router'

initMain.initSize()
initMain.initLang()

const app = createApp(InGop)
app.use(router)
app.use(language)
app.mount('ingop-dom')
