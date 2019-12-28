import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
const prod = 'http://34.66.28.216';
const dev = 'http://localhost:3000';

const base = axios.create({
  baseURL: dev
});

Vue.prototype.$axios = base;
Vue.config.productionTip = false;
Vue.use(SuiVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
