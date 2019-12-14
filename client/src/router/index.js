import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/my-cart',
    name: 'myCart',
    component: () => import(/* webpackChunkName: "myChart" */ '../views/MyCart.vue'),
  },
  {
    path: '/purchase',
    name: 'purchase',
    component: () => import(/* webpackChunkName: "myChart" */ '../views/Product.vue'),
    children: [
      {
        path: 'gold',
        name: 'purchaseGold',
        component: () => import(/* webpackChunkName: "purchaseGold" */ '../views/Product.vue'),
      },
      {
        path: 'batik-series',
        name: 'purchaseBatikSeries',
        component: () => import(/* webpackChunkName: "purchaseBatikSeries" */ '../views/Product.vue'),
      },
    ],
  },
  {
    path: '/services',
    name: 'services',
    children: [
      {
        path: 'custom-product',
        name: 'serviceCustomProduct',
        component: () => import(/* webpackChunkName: "serviceCustomProduct" */ '../views/Service.vue'),
      },
      {
        path: 'refining',
        name: 'serviceRefining',
        component: () => import(/* webpackChunkName: "serviceRefining" */ '../views/Service.vue'),
      },
      {
        path: 'analysis',
        name: 'serviceAnalysis',
        component: () => import(/* webpackChunkName: "serviceAnalysis" */ '../views/Service.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
