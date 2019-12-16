<template>
  <v-app id="inspire" red>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>APW - Guitar Shop</v-toolbar-title>
    </v-toolbar>
    <Menu
      @show-login="showLoginForm"
      @show-register="showRegisterForm"
      @add-product="showAddProductForm"
      :drawer="drawer"
    />
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <Snackbar />
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <Login v-model="showLogin" />
    <Register v-model="showRegister" />
    <AddProduct v-model="showAddProduct" />
    <v-footer app fixed></v-footer>
  </v-app>
</template>

<script>
import Menu from './components/Menu.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import AddProduct from './components/AddProduct.vue'
import Snackbar from './components/Snackbar.vue'
import instance from './connection/axios'
import axiosErrorHandler from './connection/axiosErrorHandler'

export default {
  data () {
    return {
      drawer: null,
      showLogin: false,
      showRegister: false,
      showAddProduct: false
    }
  },
  components: {
    Menu,
    Login,
    Register,
    AddProduct,
    Snackbar
  },
  methods: {
    showLoginForm () {
      console.log('showLoginForm')
      this.showLogin = true
      console.log('this.showLogin => ', this.showLogin)
    },
    showRegisterForm () {
      console.log('showRegisterForm')
      this.showRegister = true
      console.log('this.showRegister => ', this.showRegister)
    },
    showAddProductForm () {
      console.log('showAddProductForm')
      this.showAddProduct = true
      console.log('this.showAddProduct => ', this.showAddProduct)
    }
  },
  created () {
    console.log('created()')
    this.$store.dispatch('getAllProducts')
    if (localStorage.token) {
      instance({
        method: 'GET',
        url: '/users/profile',
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log('data from GET /users/profile => ', data)
          this.$store.commit('SET_LOGIN', true)
          this.$store.commit('SET_LOGIN', {
            token: localStorage.token,
            ...data
          })
          if (data.role === 'customer') {
            this.$store.dispatch('getCart')
            this.$store.dispatch('getOrders')
          }
        })
        .catch(err => {
          console.log('err => ', err)
          axiosErrorHandler(err)
        })
    }
  }
}
</script>
