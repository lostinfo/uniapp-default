import Vue from 'vue'
import App from './App'
import store from './store'

import http from '@/utils/http_weixin'
Vue.prototype.$http = http

// import cuCustom from '@/colorui/components/cu-custom.vue'
// Vue.component('cu-custom', cuCustom)

import helper from "@/utils/helper"

Vue.filter('getPrice', function (price) {
  price = price || 0
  return price.toFixed(2)
})

Vue.filter('getAbsPrice', function (price) {
  price = price || 0
  return Math.abs(price).toFixed(2)
})

Vue.filter('getPath', function (url) {
  return helper.getUrl(url)
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
