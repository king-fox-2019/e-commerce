<template>
<div>
  <v-app>
      <navbar></navbar>
      <router-view></router-view>
  </v-app>
</div>
</template>

<script>

import navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    navbar
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#app{
  background: url('./assets/img/main_background.jpg');
}
</style>
