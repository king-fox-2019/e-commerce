import Vue from 'vue'
import VueRouter from 'vue-router'
import Authscreen from '../views/Authscreen.vue'
import StoreItemList from '../views/ItemList.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../components/Checkout.vue'

Vue.use(VueRouter)

const routes = [
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
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    children: [{
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    }]
  },
  {
    path: '/',
    name: 'StoreItemList',
    component: StoreItemList
  },
  {
    path: '/:itemId',
    name: 'ItemDetail',
    component: ItemDetail,
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


const routeNameWhitelist = [
  'signin',
  'register',
  'StoreItemList',
  'ItemDetail'
]

router.beforeEach((to, from, next) => {
  // console.log(!routeNameWhitelist.includes(to.name) && localStorage.getItem('access_token') === null)
  if(!routeNameWhitelist.includes(to.name) && localStorage.getItem('access_token') === null) {
    next({name: 'signin'})
  }
  else next()
})


export default router
