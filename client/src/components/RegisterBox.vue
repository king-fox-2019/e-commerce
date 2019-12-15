<template>
   <div>
      <!-- <div class="hidden"></div> -->
      <form @submit.prevent="register" class="flex flex-col mt-8 border-gray-100 shadow">
         <label for="name">Name</label>
         <input type="text" v-model="name"/>
         <label for="email">Email<span class="text-red-600">*</span></label>
         <input type="email" v-model="email" class="" required/>
         <label for="password">Password<span class="text-red-600">*</span></label>
         <input type="password" v-model="password" required/>
         <input type="submit" value="Sign in" class="cursor-pointer"/>
      </form>
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'Register',
   data() {
      return {
         name: '',
         email: '',
         password: '',
      }
   },
   methods: {
      register() {
         axios({
            url: `/buyer/register`,
            method: 'post',
            data: {
               name: this.name,
               email: this.email,
               password: this.password
            }
         })
         .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            this.$router.push('/')
         })
         .catch(error => console.log(error))
      }
   }
}
</script>

<style>

</style>