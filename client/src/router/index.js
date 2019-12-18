import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "@/views/RegisterForm.vue")
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/LoginForm.vue")
  },
  {
    path: "/",
    name: "product-page",
    component: () =>
      import(/* webpackChunkName: "landing-page" */ "@/views/ProductPage.vue")
  },
  {
    path: "/detail",
    name: "product-detail-page",
    component: () =>
      import(
        /* webpackChunkName: "product-detail-page"*/ "@/views/ProductDetailPage.vue"
      ),
    children: [
      {
        path: ":productId",
        component: () =>
          import(
            /* webpackChunkName: "product-detail-component"*/ "@/components/productDetailComponent.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === "register") {
    if (localStorage.getItem("token")) next({ path: "/" });
    else next();
  } else if (to.name === "login") {
    if (localStorage.getItem("token")) next({ path: "/" });
    else next();
  } else next();
});

export default router;
