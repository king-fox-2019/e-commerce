import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from 'sweetalert2'
// import BootstrapVue from 'bootstrap-vue'
import Chartist from "chartist";
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// MaterialDashboard plugin
import MaterialDashboard from '../material-dashboard'

Vue.config.productionTip = false

Vue.use(MaterialDashboard)

// Vue.use(BootstrapVue)

Vue.mixin({
  methods: {
    swal (status, msg) {
      if (status == 'error') {
        if (typeof msg.response.data !== 'string') {
          msg = msg.response.data[0].msg
        } else {
          msg = msg.response.data.message || 'Something went wrong!'
        }
      }

      Swal.fire(
        msg,
        '',
        status
      )
    }
  }
})

Vue.prototype.$Chartist = Chartist;

new Vue({
  router,
  store,
  data: {
    Chartist: Chartist
  },
  render: h => h(App)
}).$mount('#app')
