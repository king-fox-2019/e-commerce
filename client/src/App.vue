<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer.vue'

export default {
  data () {
    return {}
  },
  components: {
    Navbar,
    Footer
  },
  created () {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      this.$store.commit('SET_SESSION', true)
      this.$store.dispatch('fetchCartUser')
    }
  }
}
</script>
<style></style>
