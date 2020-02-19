<template>
<div class="wrapper">
    <div class="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
      <div class="logo">
        <a class="simple-text logo-normal">
          Tokopoo - admin
        </a>
      </div>
      <div id="nav">
    </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item active ">
            <router-link to="/" class="nav-link">
              <i class="material-icons">content_paste</i>
              <p>Product List</p>
            </router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/transaction" class="nav-link">
              <i class="material-icons">content_paste</i>
              <p>Transaction List</p>
            </router-link>
          </li>
          <li v-show="login" class="nav-item active">
            <a @click="logout" class="nav-link">
              <i class="material-icons">content_paste</i>
              <p>Logout</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
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
        console.log('masuk')
        this.login = true
        this.$router.push('/')
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
@import url('./assets/css/material-dashboard.css');
</style>
