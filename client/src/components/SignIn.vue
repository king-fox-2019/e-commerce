<template>
    <div
      id="signin"
      class="container justify-content-center border rounded-sm bg-light p-0"
      style="width:30%; margin-top: 100px;"
    >
    <b-form id="signin-form" @submit.prevent="onSubmit" class="p-3">
      <h1 class="h3 my-3 font-weight-normal text-center">Sign In</h1>
      <b-form-group
        label="Email address:"
        label-for="signin-email"
      >
        <b-form-input
          id="signin-email"
          type="email"
          v-model="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Password:"
        label-for="signin-password"
      >
        <b-form-input
          id="signin-password"
          type="password"
          v-model="password"
          minlength="6"
          required
          placeholder="Enter password"
        ></b-form-input>
        <br>
        <b-button block variant="primary" type="submit" >Sign In</b-button>
      </b-form-group>
      <hr>
      <p class="mt-2 text-center text-secondary">Don't have an account? <router-link to="signup">Sign Up</router-link></p>
    </b-form>
    <div class="mx-0 copyright">
      <p class=" text-muted">&copy; 2019</p>
    </div>
  </div>
</template>

<script>
import axios from '../../apis/server'
import Swal from 'sweetalert2'

export default {
  name: 'signin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('isSignedIn', {
        email: this.email,
        password: this.password
      })
      this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
  #signin {
    position: relative;
  }
 .copyright {
   font-size: 0.8em;
   text-align: center;
   width: 100%;
   display: inline-block;
   position: absolute;
   bottom: 0
 }
</style>
