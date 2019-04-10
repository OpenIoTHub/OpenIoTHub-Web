// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {ApiService} from '@/service/service'
import {WsUrlFactory} from '@/service/websocket'
Vue.prototype.$service = new ApiService(process.env.API_ROOT)
let protocol;
if (window.location.protocol === "https:") {
    protocol = 'wss';
} else {
    protocol = 'ws';
}
let wsBaseUrl = protocol + '://'+window.location.host.split(':')[0]
Vue.prototype.$wsUrlFactory = new WsUrlFactory(wsBaseUrl)
Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'small'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  // template: '<App/>'
  render: h => h(App)
})
