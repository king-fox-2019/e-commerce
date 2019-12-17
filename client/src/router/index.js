import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: '',
        component: () => import('@/views/Products.vue')
      },
      { path: '/products/:id',
        component: () => import('@/components/ProductCard.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart.vue')
  }
  // {
  //   path: '/products',
  //   name: 'products',
  //   component: () => import('@/views/Products.vue'),
  //   children: [
  //     { path: '/:id',
  //       component: () => import('@/components/ProductCard.vue')
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
