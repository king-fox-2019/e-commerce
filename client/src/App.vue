<template>
  <div id="app">
    <navbar class="navbar" @set-login="setLogin"></navbar>
    <router-view @set-login="setLogin"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  methods: {
    setLogin: function () {
      console.log('login emit dari children')
    }
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
