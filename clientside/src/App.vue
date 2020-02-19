<template>
  <div id="app" class="main-content-wrapper d-flex clearfix">
    <div class="mobile-nav">
      <div class="amado-navbar-brand">
        <a href="index.html"><img src="./assets/img/core-img/tokped.png" alt=""></a>
      </div>
      <div class="amado-navbar-toggler">
        <span></span><span></span><span></span>
      </div>
    </div>
    <header class="header-area clearfix">
      <div class="nav-close">
        <i class="fa fa-close" aria-hidden="true"></i>
      </div>
      <div class="logo">
        <a href="index.html"><img src="./assets/img/core-img/tokped.png" alt=""></a>
      </div>
      <nav class="amado-nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="login"><router-link to="/cart">Cart ({{this.$store.state.userCart.length}})</router-link></li>
          <li v-if="login"><a href="#" @click="logout">Logout</a></li>
        </ul>
      </nav>
    </header>
    <router-view @cekLogin="cekLogin"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      login : false
    }
  },
  methods:{
    cekLogin(){
      if(localStorage.access_token){
        this.login = true
        this.$store.dispatch('fetchCart')
      }else{
        this.login = false
      }
    },
    logout(){
      localStorage.removeItem('access_token')
      this.cekLogin()
      this.$router.push('/login')
    }
  },
  created(){
    this.cekLogin()
  },
}
</script>

<style>
  @import url(./assets/css/core-style.css);
</style>
