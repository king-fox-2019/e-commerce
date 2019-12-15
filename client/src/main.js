import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from 'sweetalert2'
import VueLazyload from 'vue-lazyload'
import BootstrapVue from 'bootstrap-vue'

Vue.use(VueLazyload)
Vue.use(BootstrapVue)
// Vue.use(Swal)
Vue.config.productionTip = false


Vue.prototype.swal = Swal

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
