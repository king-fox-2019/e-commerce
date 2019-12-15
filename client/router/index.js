import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/views/Home'
import ProductDetail from '../src/views/ProductDetail'
import MyCart from '../src/views/MyCart'
import MyTransaction from '../src/views/MyTransaction'
import AllTransactions from '../src/views/AllTransactions'
import TransactionDetail from '../src/views/TransactionDetail'
import FormSignInJoin from '../src/views/FormSignInJoin'
import store from '../src/store'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: 'product-detail/:id',
        name: 'product-detail',
        component: ProductDetail
      }]
    },
    {
      path: '/signinjoin',
      name: 'signInJoin',
      component: FormSignInJoin
    },
    {
      path: '/cart',
      name: 'cart',
      component: MyCart,
      beforeEnter: (to, from, next) => {
        store
          .dispatch("fetchMyCart")
          .then(next)
      }
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: MyTransaction
    },
    {
      path: '/all-transactions',
      name: 'all-transactions',
      component: AllTransactions,
      children: [{
        path: ':id',
        name: 'transaction-detail',
        component: TransactionDetail
      }]
    }
  ]
})