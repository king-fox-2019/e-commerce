<template>
  <v-container class="form-wrap d-flex justify-space-between align-center">
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-container class="d-flex flex-column mx-0" id="contain-form">
          <v-container>
            <h1 class="black--text"> {{ getHeader }} </h1>
          </v-container>
          <router-view></router-view>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-img src="../assets/img/invoker.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'usercontrol',
  data () {
    return {
    }
  },
  computed: {
    getHeader () {
      if (this.$route.path === '/user-control/register') {
        return 'Register Page'
      } else {
        return 'Login Page'
      }
    }
  }
}
</script>

<style scoped>
.form-wrap{
  height: calc(100vh - 100px)
}

#contain-form{
background: #614385;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #516395, #614385);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #516395, #614385); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
