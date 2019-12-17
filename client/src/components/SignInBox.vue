<template>
  <div>
      <form @submit.prevent="signIn" class="flex flex-col mt-8 py-3 px-4 rounded">
         <label for="email">Email</label>
         <input type="email" v-model="email" class="text-box" required/>
         <label for="password">Password</label>
         <input type="password" v-model="password" class="text-box" required/>
         <input type="submit" value="Sign in" class="cursor-pointer mt-2 rounded"/>
      </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import axios from '../../apis/server'

export default {
   name: 'SignInBox',
   data() {
      return {
         email: '',
         password: ''
      }
   },
   methods: {
      signIn() {
         axios({
         url: '/buyer/signin',
         method: 'post',
         data: {
            email: this.email,
            password: this.password
         }
         })
         .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            this.$store.dispatch('user/checkSignedIn')
            this.$store.dispatch('user/fetchUserData')
            this.$router.push('/')
         })
         .catch(({response}) => {
            this.$swal({
               type: 'error',
               title: 'Sign in failed',
               text: response.data.message
            })
         })
      }
   }
}
</script>

<style>

</style>