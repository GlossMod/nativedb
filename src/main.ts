
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'


import { vuetify } from '@/plugins/vuetify'
import i18n from '@/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
