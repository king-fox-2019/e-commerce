import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import detail from '../views/productdetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    children: [
      {
        path: '',
        name: 'products',
        component: products
      },
      {
        path: ':id',
        name: 'productDetail',
        component: detail,
      },
    ],
  },
  {
    path: '/login',
    name: 'loginregister',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginRegister.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
