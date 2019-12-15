import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainpage',
    component: () => import(/* webpackChunkName: "mainpage" */ '../views/MainPage.vue')
  },
  {
    path: '/user-control',
    name: 'usercontrol',
    component: () => import(/* webpackChunkName: "usercontrol" */ '../views/UserControl.vue'),
    children: [
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "mainpage" */ '../components/RegisterForm.vue')
      },
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "mainpage" */ '../components/LoginForm.vue')
      }
    ]
  },
  {
    path: '/product',
    name: 'addproduct',
    component: () => import(/* webpackChunkName: "mainpage" */ '../views/AddItem.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import(/* webpackChunkName: "transaction" */ '../views/Transaction.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
