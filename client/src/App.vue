<template>
  <v-app id="inspire">
    <nav-bar />
      <v-container fluid>
        <router-view />
      </v-container>
    <main-footer />
  </v-app>
</template>

<script>

import NavBar from '@/components/NavBar'
import MainFooter from '@/components/MainFooter'

export default {
  name: 'App',
  components: {
    NavBar,
    MainFooter
  },
  data: () => ({
  })
}
</script>

<style>
</style>
