import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '@/styles/font_1214118_p0n25bk7lpg/iconfont.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.config.silent = true
Vue.config.devtools = true
Vue.use(ViewUI);

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    // ViewUI,
    template: '<App/>'
}).$mount('#app')