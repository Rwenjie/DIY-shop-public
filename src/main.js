import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'es6-promise/auto'
import bus from './plugins/bus'



const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.config.globalProperties.$bus = bus
app.mount('#app')
