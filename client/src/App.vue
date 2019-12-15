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
  }
}
</script>

<style>
.navbar {
  width: 100vw;
  z-index: 999;
  position: fixed;
}
router-view {
  margin-top: 80px
}
</style>
