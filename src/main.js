/**
 * @description: 项目入口文件
 * @author: Andy Burns
 */

import Vue from 'vue';
import App from './App.vue';
import router from './routers/';
import './routers/intercept';
import store from './stores';
import * as filters from './filters/';
import request from './services/index.js'
import 'lib-flexible';
import './styles/main.less';
import FastClick from 'fastclick';

FastClick.attach(document.body);

Vue.prototype.$http = request
Vue.config.errorHandler = (err, vm, info) => {
  console.error(err);
};
Vue.config.devtools = process.env.NODE_ENV === 'development';
Vue.config.productionTip = process.env.NODE_ENV === 'production';

window.EventBus = new Vue();

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

window.myVue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
