import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: () => import(/* webpackChunkName: "homepage" */ '../views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue')
  },
  {
    path: '/editProduct',
    name: 'editProduct',
    component: () => import(/* webpackChunkName: "editProduct" */ '../views/EditProductPage.vue')
  },
  {
    path: '/viewCart',
    name: 'viewCart',
    component: () => import(/* webpackChunkName: "viewCart" */ '../views/ViewCartPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
