import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()
import { VantComponents } from './lib/vant'
import VueWechatTitle from 'vue-wechat-title'
import VueCookies from 'vue-cookies'

const app = createApp(App)
app.config.globalProperties.$cookies = VueCookies
VantComponents(app)
app.use(router)
app.use(VueWechatTitle)
app.use(pinia)
app.mount('#app')
