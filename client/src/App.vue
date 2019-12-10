<template>
<div>
  <v-app>
    <router-link to="/about">About</router-link>
    <HelloWorld></HelloWorld>
    <router-view></router-view>
  </v-app>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    // HelloWorld
  },

  data: () => ({
    //
  })
}
</script>
