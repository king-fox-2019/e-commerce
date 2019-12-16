<template>
  <div>
    <TopNavbar />
    <div class="row mt-5 ml-5 mr-5">
    <div class="col-md-5">
      <form>
        REGISTER
        <div class="form-group">
          <label>Username</label>
          <input v-model='username' type="text" class="form-control">
        </div>
        <div class="form-group">
          <label>Email address</label>
          <input v-model='email' type="email" class="form-control">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model='password' type="password" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent='register'>Register</button>
      </form>
    </div>
    <div class="col-md-2"></div>
    <div class="col-md-5">
      <form>
        LOGIN
        <div class="form-group">
          <label>Email address</label>
          <input v-model='emailLogin'type="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model='passwordLogin' type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent='login'>Login</button>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import TopNavbar from '../components/TopNavbar.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
let baseUrl = 'http://localhost:3000'
export default {

  name: 'LoginRegister',
  components: {
    TopNavbar
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      emailLogin: '',
      passwordLogin: ''
    }
  },
  methods: {
    register(){
      axios({
        method: 'post',
        url: baseUrl + '/user/register',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then((response) => {
          localStorage.setItem('token', response.data.access_token)
          this.$store.commit('login', response.data.username)
          this.$router.push('/')
        })
        .catch((err) => {
          Swal.fire(
            'Error!',
            err.response.data,
            'error'
          )        
        })
    },
    login(){
      axios({
        method: 'post',
        url: baseUrl + '/user/login',
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then((response) => {
          localStorage.setItem('token', response.data.access_token)
          this.$store.commit('login', response.data.username)
          this.$router.push('/')
        })
        .catch((err) => {
          Swal.fire(
            'Error!',
            err.response.data,
            'error'
          )
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>