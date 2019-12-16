import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "../api/axios";
import Snotify from "vue-snotify";
import "vue-snotify/styles/material.css";

Vue.use(axios);
Vue.use(Snotify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
