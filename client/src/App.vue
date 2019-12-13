<template>
  <div id="app">
    <div id="nav">
    <navbar @localstorage='checkLocalStorage' :status="isLogged"/>
    </div>
    <router-view @localstorage='checkLocalStorage'/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';

export default {
  data() {
    return {
      isLogged: false,
    };
  },
  methods: {
    checkLocalStorage() {
      if (localStorage.getItem('token')) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    },
  },
  components: {
    navbar,
  },
  created() {
    this.checkLocalStorage();
  },
  watch() {
    this.checkLocalStorage();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lilita+One|Lobster|Roboto+Condensed&display=swap');

</style>
