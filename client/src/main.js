import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'

import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
