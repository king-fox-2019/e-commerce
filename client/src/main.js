import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Loading from 'vue-loading-overlay'
import Toasted from 'vue-toasted'
import format from 'date-fns/format'

import '@/assets/css/main.scss'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.filter('formatCurrency', function(value) {
  if (!value) return ''
  return value.toLocaleString('id', { style: 'currency', currency: 'IDR' })
})
Vue.filter('formatDate', function(value) {
  if (!value) return ''
  return format(new Date(value), 'MMM do yyyy')
})
Vue.use(Loading, {
  color: '#9e2b25',
  'background-color': '#fff8f0'
})
Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 2000,
  className: 'bg-success text-light font-weight-bold',
  containerClass: 'rounded'
})
// Vue.use(VueNumericInput)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
