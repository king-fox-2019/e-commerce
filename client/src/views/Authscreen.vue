<template>
  <div class="flex flex-col items-center">
    <h1 class="text-5xl py-3">Gaempedia</h1>
    <h2 class="text-4xl py-3">The only gamestore you need</h2>

    <SignInBox v-if="page == 'signin'"/>
    <RegisterBox v-if="page == 'register'"/>
  </div>
</template>

<script>
import SignInBox from '@/components/SignInBox.vue'
import RegisterBox from '@/components/RegisterBox.vue'
import {mapGetters} from 'vuex'

export default {
   name: 'Authscreen',
   methods: {
     setScreen() {
      if(this.$router.currentRoute.name == 'signin') {
        this.$store.commit('CHANGE_PAGE', this.$router.currentRoute.name)
      }
      else {
        this.$store.commit('CHANGE_PAGE', this.$router.currentRoute.name)
      }
     }
   },
   components: {
     SignInBox,
     RegisterBox
   },
   created() {
     this.setScreen()
   },
   computed: {
     ...mapGetters({
       page: 'currentPage'
     })
   },
   watch: {
     $route: function() {
       this.setScreen()
     }
    //  works
    //  '$route': function() {
    //    this.setScreen()
    //  }
    // works
    // $route: function() {
    //   this.setScreen()
    // }


   }
}
</script>

<style>

</style>