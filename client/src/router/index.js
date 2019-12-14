import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    // beforeEnter: (to, from, next) => {
    //   if(localStorage.getItem('token')){
    //     next()
    //   }else{
    //     next()
    //   }
      // ...
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Transaction.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // beforeEnter: (to, from, next) => {
    //   if(localStorage.getItem('token')){
    //     next()
    //   }else{
    //     next()
    //   }
      // ...
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/history',
    name: 'history',
    // beforeEnter: (to, from, next) => {
    //   if(localStorage.getItem('token')){
    //     next()
    //   }else{
    //     next()
    //   }
      // ...
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/History.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
