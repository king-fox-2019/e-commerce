<template>
  <div>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
    <nav class="navbar navbar-expand-sm navbar-light pl-0 pr-0 pt-0 pb-0" style="border: 1px solid #E5E5E5; background-color: #FFFFFF;">
      <button type="button" class="btn navbarAnchor p-2 pl-4 pr-4" @click="$router.push('/')">SportStations&trade;</button>
      <button type="button" class="btn navbarLogo px-4 p-2">
          <img src="../assets/adidas.png" style="height:25px;" class="p-0 " alt="adidas">
      </button>
      <button type="button" class="btn navbarLogo px-3 p-2">
          <img src="../assets/nikenoname.png" style="height:25px;" class="p-0 " alt="adidas">
      </button>
      <div class="ml-auto">
          <button v-if="!isLogin" type="button" @click.prevent="$refs.Login.openModal()" class="btn py-2 pr-3 navbarkanantext" data-toggle="modal" data-target="#exampleModalCenter">
              <span style="font-size:13px;">Join/Log In To SportStation Account</span>
          </button>
          <button v-if="isLogin" type="button" @click.prevent="logout" class="btn py-2 pr-3 navbarkanantext">
              <span style="font-size:13px;">Logout</span>
          </button>
          <button type="button" class="btn py-2 pr-1 navbarkanantext">
              <span style="font-size:15px;">Help</span>
          </button>
          <button type="button" @click="$router.push('/customer')" class="btn py-2 pr-4 pl-4 navbarkanan">
              <i class="fas fa-cart-plus"></i>
              
          </button>
          <button v-if="image" type="button" class="btn py-2 pr-3 pl-1 navbarkanan">
              <img :src="image" alt="profil" style="width:30px" class="rounded-pill">
              <span style="font-size:15px;" class="ml-1">{{name}}</span>
          </button>
      </div>
    </nav>
    <modal-login ref="Login"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Login from '../components/Login'
export default {
  data () {
    return {}
  },
  components: {
    'modal-login': Login
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('ON_LOGOUT')
      this.$router.push('/')
    }
  },
  computed: mapState(['isLogin', 'name', 'role', 'image'])
}
</script>

<style scoped>
*{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.navbarAnchor{
    color: rgb(134, 134, 134);
    background-color: #ffffff;
    border: none;
    font-size: 15px;
    border-right: 1px solid #E5E5E5;
}
.navbarAnchor:hover{
    color: rgb(31, 31, 31);
}
.navbarAnchor:focus{
    box-shadow: none;
}

.navbarLogo{
    background-color: #ffffff;
    border: none;
    border-right: 1px solid #E5E5E5;
}
.navbarLogo:hover{
    background-color: #919090;
}
.navbarLogo:focus{
    box-shadow: none;
}

.navbarkanan{
    background-color: #ffffff;
    border: none;
    color: rgb(134, 134, 134);
}
.navbarkanan:hover{
    color: rgb(31, 31, 31);
}
.navbarkanan:focus{
    box-shadow: none;
}

.navbarkanantext{
    background-color: #ffffff;
    border: none;
    color: rgb(134, 134, 134);
}
.navbarkanantext:hover{
    color: black;
    border-bottom: 1px solid black;
}
.navbarkanantext:focus{
    box-shadow: none;
}

</style>
