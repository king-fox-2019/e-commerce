import Vue from 'vue'
import VueRouter from 'vue-router'
import Authscreen from '../views/Authscreen.vue'
import StoreItemList from '../views/ItemList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'StoreItemList',
    component: StoreItemList
  },
  
  {
    path: '/signin',
    name: 'signin',
    component: Authscreen
  },

  {
    path: '/register',
    name: 'register',
    component: Authscreen
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   if(to.name != Authscreen && localStorage.getItem('access_token') === null) {
//     next({name: Authscreen})
//   }
//   else next()
// })


export default router
