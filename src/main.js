import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useKakao } from 'vue3-kakao-maps/@utils';
import axios from 'axios';

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

useKakao('{KAKAO_JSAPI_KEY}');

const app = createApp(App)

// axios에서 세션 쿠키 자동 전달
axios.defaults.withCredentials = true;

app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')
