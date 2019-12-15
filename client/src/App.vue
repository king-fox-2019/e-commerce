<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './views/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>

</style>
