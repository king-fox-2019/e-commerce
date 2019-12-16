<template>
  <div>
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/product">E-COMMERCE</b-navbar-brand>
        <b-navbar-nav v-if="!this.$store.state.isLogin" class="ml-auto">
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="this.$store.state.isLogin" class="ml-auto">
          <b-nav-item @click.prevent="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </header>
    <div>
      <b-container>
      <b-nav class="nav" tabs>
       <b-nav tabs>
        <b-nav-item class="nav-item" to="/product">Products</b-nav-item>
        <b-nav-item class="nav-item" to="/cart">Cart</b-nav-item>
        <b-nav-item class="nav-item" to="/purchased">Purchased</b-nav-item>
      </b-nav>
    </b-nav>
    <router-view/>
    </b-container>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      if(localStorage.getItem('admin')){
        localStorage.removeItem('admin')
        this.$store.dispatch('logout')
        this.$router.push({path:'/product'})
      }else{
        this.$store.dispatch('logout')
        this.$router.push({path:'/product'})
      }
    }
  },
  created(){
    console.log(this.$store.state.isLogin)
  }
}
</script>

<style>
body{
  background-color: rgb(250, 242, 242)
}

.nav{
  background-color: rgba(205, 209, 240, 0.459);
  border-radius: 0 0 10px 10px;
}

.nav-item{
  border-radius: 10px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
