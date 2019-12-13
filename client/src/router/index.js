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
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
