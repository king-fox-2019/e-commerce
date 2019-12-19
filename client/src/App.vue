<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
    <footer class="py-2 bg-success">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; Geomancy 2019</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('token') && localStorage.getItem('role') === 'admin') {
      this.$router.push('/admin')
      this.$store.commit('setLogin', true)
    } else if (localStorage.getItem('token') && localStorage.getItem('role') === 'customer') {
      this.$router.push('/')
      this.$store.commit('setLogin', true)
    } else {
      this.$store.commit('setLogin', false)
    }
  }
}
</script>

<style scoped>
#app {
  background-image: url('./assets/gaming-background.jpg') !important;
  background-repeat: repeat;
  background-size: cover;
  bottom: 5rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

footer {
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  color: palegreen !important;
}
</style>
