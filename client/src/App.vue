<template>
  <div id="app">
      <MainNavbar v-if="!isAdminSection"/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import MainNavbar from '@/components/main/MainNavbar.vue'
export default {
  data () {
    return {
      isAdminSection: false
    }
  },
    components: {
        MainNavbar
    },
    watch: {
    '$route' (to, from) {
      if (to.matched[0].path == "/admin" || to.matched[0].path == "/admin/login") {
        this.isAdminSection = true
      } else {
        this.isAdminSection = false
      }
    }
  }
}
</script>

<style>
.row {
  width: 100%;
}

body {
  background-color: white !important;
}
</style>
