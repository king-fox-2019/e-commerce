<template>
  <div>
      <form @submit.prevent="signIn" class="flex flex-col mt-8 border-gray-100 shadow">
         <label for="email">Email</label>
         <input type="email" v-model="email" class="" required/>
         <label for="password">Password</label>
         <input type="password" v-model="password" required/>
         <input type="submit" value="Sign in" class="cursor-pointer"/>
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
         this.$router.push('/')
         // resolve()
      })
      .catch(error => {
         console.log(error)
         // reject()
      })
      }
   }
}
</script>

<style>

</style>