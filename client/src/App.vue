<template>
  <div id="app">
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
