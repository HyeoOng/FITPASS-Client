import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('10ed9e6688fa4fbe8a3c511a3c098194');

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
