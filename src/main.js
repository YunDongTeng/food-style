// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 全局使用
Vue.use(VueResource)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
