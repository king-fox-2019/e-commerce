<template>
  <div id="app" style="">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/login">Login</router-link> | 
      <router-link to="/register">Register</router-link> |
      <router-link to="/editProduct">Edit Product</router-link> |
      <router-link to="/viewCart">View Cart</router-link>
    </div> -->
    <navbar style="margin-bottom:2%"/>
    <router-view/>

    <!-- <h1>filename : App.vue</h1> -->
  </div>
</template>


<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import navbar from '@/components/NavigationBar'
export default {
    components:{
      navbar
    }
    
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
