<template>
  <div class="button-shop">
    <div
      class="ui massive transparent left icon input"
      style="margin:15px;text-align:center;  color: white;"
    >
      <input v-model="name" type="text" placeholder="Name" style="color: white;" />
      <i class="user circle icon"></i>
    </div>
    <div
      class="massive ui transparent left icon input"
      style="margin:15px;text-align:center;  color: white;"
    >
      <input v-model="email" type="text" placeholder="Email" style="color: white;" />
      <i class="envelope icon"></i>
    </div>
    <div
      style="margin:15px;text-align:center;  color: white;"
      class="massive ui transparent left icon input"
    >
      <input v-model="password" type="password" placeholder="Password" style="color: white;" />
      <i class="eye slash icon"></i>
    </div>
    <div style="margin:15px;text-align:center">
      <button
        @click.prevent="signUpUser"
        class="huge ui inverted button btn-shop"
        style="border-radius: 0px;"
      >Register Now</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUpUser () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('signupUser', payload)
        .then(data => {
          this.$store.commit('SET_SESSION', true)
          localStorage.setItem('access_token', data.token)
          this.$store.dispatch('createCart')
          this.$store.dispatch('fetchCartUser')
          Swal.fire('Success!', data.message, 'success')
          this.$router.push('/')
        })
        .catch(err => {
          const message = err.response.data.message
          Swal.fire('Oops...', message, 'error')
        })
    }
  }
}
</script>

<style>
.button-shop {
  height: 100%;
  flex-direction: column;

  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-shop {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
