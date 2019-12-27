<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <router-link to='/' class="navbar-brand">
        IKAMERS
      </router-link>
      <router-link v-if='isLogin' to="/sell" class='ml-auto mr-3'>Sell Item</router-link>
      <!-- <router-link v-if='isLogin' to="/myItem" class='mr-3'>My Item</router-link> -->
      <router-link v-if='isLogin' to="/cart" class='mr-3'>My Cart</router-link>
      <div v-if='isLogin' class="mr-3">{{username}}</div>
      <a href='' v-if='isLogin' @click.prevent='logout'>Logout</a>
      <router-link to="/login" v-if='!isLogin'>Login/Register</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  name: 'TopNavbar',

  data () {
    return {
    }
  },
  computed: {
    username(){
      return this.$store.state.username
    },
    isLogin(){
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.getItem('token')){
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/username',
        data: {
          token: localStorage.getItem('token')
        }
      })
        .then((res) => {
          this.$store.commit('login', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>
</style>