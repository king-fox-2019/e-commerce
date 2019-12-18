import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (cart.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter(to, from, next) {
      // check vuex store //
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You need to login first!',
        })
        next("/");
      }
    },
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
