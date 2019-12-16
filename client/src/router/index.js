import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

function adminGuard (to, from, next) {
  if (localStorage.getItem('token') && localStorage.getItem('admin')) {
    next()
  } else {
    next('/admin/login')
  }
}

function guard (to, from, next) {
  if (store.state.isLoggedIn) {
    next()
  } else {
    next('/login')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail',
    name: 'product',
    component: () => import(/* webpackChunkName: "Product" */ '../views/Product.vue'),
    props: true
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "productList" */ '../views/ProductList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    beforeEnter: guard
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    beforeEnter: guard
  },
  {
    path: '/admin',
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
    path: '/admin/login',
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
