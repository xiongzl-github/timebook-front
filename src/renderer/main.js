import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import vuescroll from 'vuescroll'
import 'view-design/dist/styles/iview.css'
import '@/styles/iconfont/iconfont.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// import { Timeline } from 'ant-design-vue'
import moment from 'moment'; 
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');

import { FlippingWidgets } from "vue-turnjs";
import "vue-turnjs/dist/vue-turnjs.esm.css";
Vue.use(FlippingWidgets);

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

// Vue.use(Antd);



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.config.silent = true
Vue.config.devtools = true
Vue.use(ViewUI);
Vue.use(mavonEditor);
// Vue.use(Timeline);




Vue.use(vuescroll, {
    ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
            size: '8px',
        },
        bar: {
            background: '#c2c2c2',
            showDelay: 500,
            onlyShowBarOnScroll: true,
            keepShow: true,
            // background: '#c1c1c1',
            opacity: 1,
            // hoverStyle: false，
            specifyBorderRadius: false,
            minSize: 0,
            size: '8px',
            disable: false
        },
        scrollButton: {
            enable: false,
            background: 'rgb(3, 185, 118)',
            opacity: 1,
            step: 180,
            mousedownStep: 30
        }
    }
});

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    // ViewUI,
    template: '<App/>'
}).$mount('#app')