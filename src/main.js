import Vue from 'vue'
import App from '@/App'
import store from '@/store'

import filters from "@/utils/filters"

for (let key in filters) {
  Vue.filter(key, filters[key])
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
