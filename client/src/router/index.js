import Vue from 'vue'
import VueRouter from 'vue-router'
import ListItem from '../views/ListItem.vue'
import store from '../store'
import Swal from 'sweetalert2'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ListItem,
    beforeEnter: (to, from, next) => {
      console.log(store.state.role)
      if (store.state.role == 'admin') {
        next('/admin')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import(/* webpackChunkName: "customer" */ '../views/Customer.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.role == 'customer') {
        next()
      } else {
        Swal.fire({
          title: 'Login First!',
          text: '',
          icon: 'error',
          // imageWidth: 400,
          // imageHeight: 200,
          timer: 2000,
          imageAlt: 'Custom image',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
        })
        next('/')
      }
    },
    children: [
      {
        path: 'listcart',
        name: 'listcart',
        component: () => import(/* webpackChunkName: "productsell" */ '../components/MemberListCart.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: () => import(/* webpackChunkName: "producthistory" */ '../components/MemberHistoryTransaction.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.role == 'admin') {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'sellproduct',
        name: 'productSell',
        component: () => import(/* webpackChunkName: "productsell" */ '../components/SellProduct.vue')
      },
      {
        path: 'listproduct',
        name: 'listproduct',
        component: () => import(/* webpackChunkName: "listproduct" */ '../components/AdminListProduct.vue')
      },
      {
        path: 'member',
        name: 'member',
        component: () => import(/* webpackChunkName: "listmember" */ '../components/AdminListMember.vue')
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import(/* webpackChunkName: "listcheckout" */ '../components/AdminListCheckout.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: () => import(/* webpackChunkName: "listhistory" */ '../components/AdminListHistory.vue')
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
