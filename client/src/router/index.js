import Vue from 'vue'
import VueRouter from 'vue-router'
import Product from '../views/Product.vue'
import Checkout from '../views/Checkout.vue'
import Cart from '../views/Cart.vue'
import Admin from '../views/Admin.vue'
import Purchased from '../views/Purchased.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    children:[
      {
        path: 'checkout',
        component: Checkout
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        router.push({ path: '/login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* component definition */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* component definition */ '../views/Register.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/purchased',
    name: 'purchased',
    component: Purchased,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        router.push({ path: '/login' })
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    if (localStorage.getItem('access_token')) {
      next({ path: '/product' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.beforeEach((to,from,next)=> {
  if(to.name === 'admin') {
    if(!localStorage.getItem('admin')){
      next({ path: '/product' })
    } else {
      next()
    }
  }else{
    next()
  }
})

export default router
