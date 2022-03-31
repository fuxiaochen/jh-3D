// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store/store";
import './common/antd'
import './common/message'
import "./assets/fonts/font.css";
import http from './utils/http'
Vue.prototype.$http = http;
Vue.prototype.$store = store;
Vue.config.productionTip = false;
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

// Vue.prototype.$socket_zjb = "http://192.168.81.214:8281";
// Vue.prototype.$socket_xy = "http://192.168.81.217:9002";

Vue.prototype.$socket_zjb = "http://192.168.92.22:81/authorization";
Vue.prototype.$socket_xy = "http://192.168.92.22:81/all";
Vue.prototype.$socket_wrh = "http://192.168.92.22:81/zjb";
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    components: { App },
    template: '<App/>'
})
