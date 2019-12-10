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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
    path: '/my-chart',
    name: 'myChart',
    component: () => import(/* webpackChunkName: "myChart" */ '../views/MyChart.vue'),
  },
  {
    path: '/purchase',
    name: 'purchase',
    children: [
      {
        path: 'gold',
        name: 'purchaseGold',
        component: () => import(/* webpackChunkName: "purchaseGold" */ '../views/Product.vue'),
      },
      {
        path: 'gold-series',
        name: 'purchaseGoldSeries',
        component: () => import(/* webpackChunkName: "purchaseGoldSeries" */ '../views/Product.vue'),
      },
    ],
  },
  {
    path: '/services',
    name: 'services',
    children: [
      {
        path: 'product-custom',
        name: 'serviceProductCustom',
        component: () => import(/* webpackChunkName: "serviceProductCustom" */ '../views/Service.vue'),
      },
      {
        path: 'revining',
        name: 'serviceRevining',
        component: () => import(/* webpackChunkName: "serviceRevining" */ '../views/Service.vue'),
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
