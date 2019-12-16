import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: () =>
      import(/* webpackChunkName: "home" */ '../views/HomePage.vue')
  },
  {
    path: '/products',
    name: 'shop-page',
    component: () =>
      import(/* webpackChunkName: "shop" */ '../views/ShopPage.vue'),
    children: [
      {
        path: 'detail/:id',
        name: 'detail-product-page',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "detail" */ '../views/DetailProductPage.vue'
          )
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart-page',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/signin')
      }
    },
    component: () =>
      import(/* webpackChunkName: "cart" */ '../views/CartPage.vue')
  },
  {
    path: '/signin',
    name: 'signin-page',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/SignInPage.vue')
  },
  {
    path: '/signup',
    name: 'signup-page',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/SignUpPage.vue')
  },
  {
    path: '/becomeaseller',
    name: 'seller-form',
    component: () =>
      import(/* webpackChunkName: "seller" */ '../views/BecomeASellerPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
