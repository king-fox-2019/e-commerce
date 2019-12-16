<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  created () {
    this.$store.dispatch('checkLogin')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
nav {
  height: 3rem;
  margin-bottom: 3rem;
  background: #2f2838;
  display: flex !important;
}
a {
  color: #fff !important;
}
.nav-right {
  margin-left: auto;
}
.link, a {
  display: inline-block;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1.2rem;
  /* color: #fff; */

}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
