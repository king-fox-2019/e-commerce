import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    // children: [ ga jadi dibuat kak, gada waktu, maapkeun
    //   {
    //     // UserProfile will be rendered inside User's <router-view>
    //     // when /user/:id/profile is matched
    //     path: 'row',
    //     component: UserProfile
    //   },
    //   {
    //     // UserPosts will be rendered inside User's <router-view>
    //     // when /user/:id/posts is matched
    //     path: 'column',
    //     component: UserPosts
    //   }
    // ]
  }
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
