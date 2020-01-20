<template>
  <div id="app">
    <MainNavbar></MainNavbar>
    <router-view/>
  </div>
</template>

<script>
import MainNavbar from '@/components/MainNavbar.vue'
export default {
  components: {
    MainNavbar
  },
  created () {
    if (localStorage.getItem('access_token')) {
      this.$store.commit('isSignedIn', true)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
#app {
  font-family: 'Lato', sans-serif
}
</style>
