<template>
  <div id="app">
    <main-navbar></main-navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    'main-navbar': Navbar
  }
}
</script>

<style lang="scss"></style>
