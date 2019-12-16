<template>
  <div id="navbar" class="items-center">
     <div class="flex justify-between xl:max-w-6xl mx-auto">
        <router-link to="/"><h2 class="px-5 py-3 text-xl">Gaempedia</h2></router-link>
        <div v-if="!userAuthState" class="px-7 py-3">
           <router-link to="/signin" class="px-2">Sign in</router-link>
           <router-link to="/register" class="px-2">Register</router-link>
         </div>
         <div v-if="userAuthState" class="px-7 py-3">
            <!-- <a class="px-2" @click.prevent="">Unique items in cart: {{cart.length}}</a> -->
            <router-link to="/cart" class="pex-2">Unique items in cart: {{cart.length}}</router-link>
            <a class="px-2">{{name}}</a>
            <a class="px-2" @click.prevent="signOut">Sign out</a>
         </div>
     </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
   name: 'Navbar',
   methods: {
      ...mapActions({
         checkSignedIn: 'user/checkSignedIn',
         fetchUserData: 'user/fetchUserData'
      }),

      initializeNavbar() {
         this.checkSignedIn()
         this.fetchUserData()
      },

      signOut() {
         localStorage.removeItem('access_token')
         this.$store.commit('user/CHANGE_IS_SIGNED_IN', false)
      }
   },
   computed: {
      ...mapGetters({
         userAuthState: 'user/userAuthState',
         name: 'user/getUserName',
         cart: 'user/getUserCart'
      }),
   },
   created() {
      this.initializeNavbar()
   }
}
</script>

<style scoped>
   #navbar {
      background-color: #222831;
   }
   
   a {
      color: #eeeeee;
      cursor: pointer;
   }

   a:hover {
      color: #e68129;
   }
</style>