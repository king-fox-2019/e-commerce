import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Swal from 'sweetalert2'

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
