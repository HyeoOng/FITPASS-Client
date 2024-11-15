import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useKakao } from 'vue3-kakao-maps/@utils';

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

useKakao('');

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
