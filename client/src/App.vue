<template>
  <div id="app">
    <navbar class="navbar"></navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('checkLogin')
  }
}
</script>

<style>
.navbar {
  width: 100vw;
  z-index: 999;
}
router-view {
  margin-top: 80px
}
</style>
