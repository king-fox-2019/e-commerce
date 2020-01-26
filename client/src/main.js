import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import CxltToastr from 'cxlt-vue2-toastr';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

const prod = 'http://34.66.28.216';
const dev = 'http://localhost:3000';

const base = axios.create({
  baseURL: dev
});

Vue.prototype.$axios = base;
Vue.config.productionTip = false;

const toastrConfigs = {
  position: 'top right',
  showDuration: 1
};
Vue.use(CxltToastr, toastrConfigs);

Vue.use(VuejsDialog, {
  animation: 'fade',
  okText: 'OK',
  cancelText: 'Cancel',
  loader: true,
  html: true
});
Vue.use(SuiVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
