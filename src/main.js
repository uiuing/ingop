import { createApp } from 'vue'

import InGop from '@/InGop.vue'
import router from '@/router'
import language from '@/utils/language'
import initMain from '@/utils/window/initMain'

initMain.initSize()
initMain.initLang()

const app = createApp(InGop)
app.use(router)
app.use(language)
app.mount('ingop-dom')
