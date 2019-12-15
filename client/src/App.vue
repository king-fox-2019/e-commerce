<template>
  <div id="app">
    <main-navbar v-if="!$route.path.includes('/admin')"></main-navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    'main-navbar': Navbar
  },
  created() {
    this.$store.dispatch('FETCH_ITEMS')
  }
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
