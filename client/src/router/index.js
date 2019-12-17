import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import AddItem from '../views/AddItem.vue'
import Cart from '../views/Cart.vue'
import Transaction from '../views/Transaction.vue'
import Detail from '../components/Detail.vue'
import UserTransaction from '../views/UserTransaction'

Vue.use(VueRouter)

const routes = [
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/signin', name: 'signin', component: SignIn },
  { path: '/additem', name: 'additem', component: AddItem },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/transaction', name: 'transaction', component: Transaction },
  { path: '/usertransaction', name: 'usertransaction', component: UserTransaction },
  { path: '/',
    name: 'home',
    component: Home,
    children: [{
      path: 'detail/:id',
      name: 'detail',
      component: Detail
    }]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
