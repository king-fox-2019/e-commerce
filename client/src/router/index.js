import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginRegister from '../views/LoginRegister.vue'
import PostItem from '../views/PostItem.vue'
import ItemHome from '../views/ItemHome.vue'
import ItemList from '../components/ItemList.vue'
import ItemDetail from '../components/ItemDetail.vue'
import MyCart from '../views/MyCart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: LoginRegister
  },
  {
    path: '/sell',
    name: 'sell',
    component: PostItem
  },
  {
    path: '/item',
    component: ItemHome,
    children: [
      {
        path: '',
        component: ItemList
      },
      {
        path: ':id',
        component: ItemDetail
      }
    ]
  },
  {
    path: '/cart',
    component: MyCart
  }
  // ,
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

export default router
