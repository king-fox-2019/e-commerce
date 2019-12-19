import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

function adminGuard (to, from, next) {
  if (localStorage.getItem('token') && localStorage.getItem('admin')) {
    next()
  } else {
    next('/login')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'adminHome',
    component: () => import(/* webpackChunkName: "adminHome" */ '../views/admin/Home.vue'),
    beforeEnter: adminGuard,
    children: [
      {
        path: 'products',
        name: 'productList',
        component: () => import(/* webpackChunkName: "productList" */ '../components/admin/Products/ProductList.vue')
      },
      {
        path: 'transactions',
        name: 'transactionList',
        component: () => import(/* webpackChunkName: "transactionList" */ '../components/admin/Transactions/TransactionList.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'adminLogin',
    component: () => import(/* webpackChunkName: "adminLogin" */ '../views/admin/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
