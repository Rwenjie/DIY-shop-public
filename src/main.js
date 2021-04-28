import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'es6-promise/auto'


/*router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem("tokenStr")) {
        if (this.$store.state.profile.userId==null) {
            this.$store.dispatch("getUserDetail");
        }
    }
    });*/
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
