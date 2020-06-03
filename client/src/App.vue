<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$store.commit('SET_LOGIN', true);
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
