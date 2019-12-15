import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/session',
    name: 'session',
    component: () =>
      import(/* webpackChunkName: "session" */ '@/views/Session.vue'),
    props: true
  },
  {
    path: '/items/:id',
    name: 'item-detail',
    component: () =>
      import(/* webpackChunkName: "item-detail" */ '@/views/ItemDetail.vue'),
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '@/views/Cart.vue')
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () =>
      import(/* webpackChunkName: "transactions" */ '@/views/Transaction.vue')
  },
  {
    path: '/transactions/:id',
    name: 'transaction-detail',
    component: () =>
      import(
        /* webpackChunkName: "transaction-detail" */ '@/views/TransactionDetail.vue'
      ),
    props: true
  },
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "admin" */ '@/components/AdminDashboard.vue'
          )
      },
      {
        path: 'items',
        component: () =>
          import(
            /* webpackChunkName: "admin-items" */ '@/components/AdminItems.vue'
          )
      },
      {
        path: 'transactions',
        component: () =>
          import(
            /* webpackChunkName: "admin-transactions" */ '@/components/AdminTransactions.vue'
          )
      }
    ]
  },
  {
    path: '/admin/*',
    beforeEnter(to, from, next) {
      localStorage.clear()
      next('/')
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
