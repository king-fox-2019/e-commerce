import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

function guard (to, from, next) {
  if (store.state.isLoggedIn) {
    next()
  } else {
    next('/login')
  }
}

function authGuard (to, from , next) {
  if (store.state.isLoggedIn) {
    next('/')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    beforeEnter: guard
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import(/* webpackChunkName: "transactions" */ '../views/TransactionList.vue'),
    beforeEnter: guard
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "products" */ '../views/ProductList.vue')
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import(/* webpackChunkName: "Product" */ '../views/Product.vue'),
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
