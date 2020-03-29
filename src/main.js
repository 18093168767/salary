// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import Vuex from "vuex"
import store from "./store"
import router from './router'
import moment from 'moment'



// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.use(ElementUI);
Vue.use(Vuex)
Vue.use(VueAxios,axios);
Vue.prototype.$store = store
Vue.prototype.$moment = moment;

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern)

})



Vue.config.productionTip = false  


// router.beforeEach((to, from, next) => {
//   if (store.state.userInfo || to.path === "/login") {
//       next()
//   } else {
//       next({
//           path: "/login"
//       })
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
