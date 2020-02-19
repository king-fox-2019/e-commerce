import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'
import LoginRegis from '../views/loginregis.vue'
import notfound from '../views/notfound.vue'
import CartComponent from '../components/cartComponent.vue'
import Transaction from '../components/transactionComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    children : [
      {
        path : '',
        name : 'cartComponent',
        component : CartComponent
      },
      {
        path : 'transaction',
        name : 'transaction',
        component : Transaction
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginRegis
  },
  {
    path: '/detail/:id',
    name: 'detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue')
  },
  {
    path: '*',
    component:notfound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path != '/login' && !localStorage.access_token){
    next('/login')
  }else{
    next()
  }
})

export default router
