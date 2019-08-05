// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

// 发起get或者post通信请求，引入vue-resouce
import VueResource from 'vue-resource'

//引入路由
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)

//自定义指令(全局)
// Vue.directive('rainbow', {
//   bind(el, bingding, vnode) {
//     el.style.color = "red"
//   }
// })

// Vue.directive('theme', {
//   bind(el, bingding, vnode) {
//     if (bingding.value == 'wide') {
//       el.style.maxWidth = "1260px"
//     } else if (bingding.value == 'narrow') {
//       el.style.maxWidth = "560px"
//     }

//     if (bingding.arg == 'colume') {
//       el.style.background = "#6677cc";
//       el.style.padding = '20px';
//     }
//   }
// })

//自定义过滤器(全局)
// Vue.filter("to-uppercase", function (value) {
//   return value.toUpperCase();
// })

// Vue.filter("snippet", function (value) {
//   return value.slice(0, 100) + "..."
// })

//在Vue中如果有任何东西发生改变的话，需要借助computed这个属性来实现最终的效果

//创建路由
const router111 = new VueRouter({
  routes: Routes,
  mode: "history"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router: router111
})
