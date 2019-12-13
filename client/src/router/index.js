import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginRegister',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginRegisterPage.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartPage.vue'),
    beforeEnter: (to, from, next) => {
      store.dispatch('viewCart').then(next)
    }
  },
  {
    path: '/transaction',
    name: 'Transaction',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "transaction" */ '../views/TransactionPage.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminPage.vue'),
    children: [
      {
        path: '',
        name: 'AdminProduct',
        component: () => import(/* webpackChunkName: "adminProduct" */ '../views/AdminProductPage.vue')
      },
      {
        path: 'addProduct',
        name: 'AddProduct',
        component: () => import(/* webpackChunkName: "addProduct" */ '../views/AddProductPage.vue')
      },
      {
        path: 'update-product/:id',
        name: 'Update-Product',
        component: () => import(/* webpackChunkName: "updateProduct" */ '../views/UpdateProductPage.vue')
      },
      {
        path: 'transactions',
        name: 'Admin-Transaction',
        component: () => import(/* webpackChunkName: "adminTransaction" */ '../views/AdminTransactionList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
