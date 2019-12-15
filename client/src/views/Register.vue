<template>
<div class="container">
  <div class="row">
    <div class="col-lg-6">
      <div class="box">
        <h1>New account</h1>
        <p class="lead">Not our registered customer yet?</p>
        <p>With registration with us new world of fashion, fantastic discounts and much more opens to you! The whole process will not take you more than a minute!</p>
        <p class="text-muted">
          If you have any questions, please feel free to
          <a href="#">contact us</a>, our customer service center is working for you 24/7.
        </p>
        <hr />
        <form action="" method="post" @submit.prevent="register">
          <div class="form-group">
            <label for="email">Email</label>
            <input required autofocus id="email" type="text" class="form-control" v-model="registerEmail"/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input required id="password" type="password" class="form-control" v-model="registerPassword"/>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input required id="confirmPassword" type="password" class="form-control" v-model="confirmPassword"/>
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="box">
        <h1>Login</h1>
        <p class="lead">Already our customer?</p>
        <hr />
        <form action="" @submit.prevent="setLogin" method="post">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" class="form-control" v-model="email"/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" v-model="password"/>
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'Register',
  data: function () {
    return {
      email: '',
      password: '',
      registerEmail: '',
      registerPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    setLogin: function () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('login', payload)
        .then(_ => {
          this.email = ''
          this.password = ''
          this.$router.push('/products')
        })
        .catch(({ response }) => {
          console.log(response, 'masuk err comp')
        })
    },
    register: function () {
      if (!this.confirmPassword === this.registerPassword) {
        // handle error
      } else {
        axios({
          method: 'POST',
          url: `/user/register`,
          data: {
            email: this.registerEmail,
            password: this.registerPassword
          }
        })
          .then(({ data }) => {
            this.$router.push('/products')
          })
          .catch(err => {
            console.log(`err`, err.response)
          })
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 80px
}
</style>
