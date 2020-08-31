// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stroe'

// 引入element-ui组件
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import '@/plugins/element.js'

// 统一登录认证
import './permission.js'

import bts from "@/mock/mock.js";
bts.bootstrap();

// Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
