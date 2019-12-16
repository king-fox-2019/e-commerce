import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/story",
    name: "Story",
    component: () =>
      import(/* webpackChunkName: "Story" */ "../views/Story.vue")
  },
  {
    path: "/heroes",
    name: "Heroes",
    component: () =>
      import(/* webpackChunkName: "Story" */ "../views/Heroes.vue")
  },
  {
    path: "/formsign",
    name: "FormSign",
    component: () =>
      import(/* webpackChunkName: "FormSign" */ "../views/FormSign.vue"),
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: () =>
          import(/* webpackChunkName: "SignIn" */ "../components/SignIn.vue")
      },
      {
        path: "signup",
        name: "SignUp",
        component: () =>
          import(/* webpackChunkName: "SignUp" */ "../components/SignUp.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "About" */ "../views/About.vue")
  },
  {
    path: "/pvp",
    name: "Pvp",
    component: () => import(/* webpackChunkName: "Pvp" */ "../views/Pvp.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "News" */ "../views/News.vue")
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import(/* webpackChunkName: "News" */ "../views/Shop.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
