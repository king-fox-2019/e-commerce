import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { LoaderPlugin } from 'vue-google-login';
import GSignInButton from 'vue-google-signin-button'

Vue.use(require('vue-moment'));
Vue.use(LoaderPlugin, { client_id: '719650523376-ocnmthhpagrespt9t4d5l5nkf047e9og.apps.googleusercontent.com' });
Vue.use(GSignInButton)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
