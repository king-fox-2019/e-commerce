<template>
   <div>
      <!-- <div class="hidden"></div> -->
      <form @submit.prevent="register" class="flex flex-col mt-8 py-3 px-4 rounded">
         <label for="name">Name</label>
         <input type="text" v-model="name" class="text-box"/>
         <label for="email">Email<span class="text-red-600">*</span></label>
         <input type="email" v-model="email" class="text-box" required/>
         <label for="password">Password<span class="text-red-600">*</span></label>
         <input type="password" v-model="password" class="text-box" required/>
         <input type="submit" value="Sign in" class="cursor-pointer mt-2 rounded"/>
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
            this.$store.dispatch('user/checkSignedIn')
            this.$store.dispatch('user/fetchUserData')
            this.$router.push('/')
         })
         .catch(({response}) => {
            this.$swal({
               type: 'error',
               title: 'Register failed',
               text: response.data.message
            })
         })
      }
   }
}
</script>

<style style>
   form {
      background-color: #eeeeee;
   }

   label {
      color: #393e46;
      margin-bottom: 0.25rem;
   }

   .text-box {
      margin-bottom: 0.5rem;
      background-color: transparent;
      border-bottom: 1px #393e46 solid;
      outline-style: none;
   }
</style>