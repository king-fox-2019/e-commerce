<template>
  <div class="bg-gray-100 shadow items-center">
     <div class="flex justify-between xl:max-w-6xl mx-auto">
        <router-link to="/"><h2 class="px-5 py-3 text-xl">Gaempedia</h2></router-link>
        <div v-if="!userAuthState" class="px-7 py-3">
           <router-link to="/signin" class="px-2">Sign in</router-link>
           <router-link to="/register" class="px-2">Register</router-link>
         </div>
         <div v-if="userAuthState" class="px-7 py-3">
            <router-link to="">In cart:</router-link>
            <router-link to="">Username</router-link>
            <a @click.prevent="signOut">Sign out</a>
         </div>
     </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
   name: 'Navbar',
   methods: {
      ...mapActions({
         // works
         // checkSignedIn: 'user/checkSignedIn',
      }),

      signOut() {
         localStorage.removeItem('access_token')
         this.$store.commit('user/CHANGE_IS_SIGNED_IN', false)
      }
   },
   computed: {
      ...mapGetters({
         userAuthState: 'user/userAuthState'
      })
   },
   // watch: {
   //    userAuthState: function() {
         
   //    }
   // }
}
</script>

<style>

</style>