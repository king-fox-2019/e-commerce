<template>
  <div class="container RegisterLogin">
    <div class="wrapper">
      <!-- <div class="image" data-type="bg" data-src="../assets/register.jpg" style="background-image: url('../assets/register.jpg');"></div> -->
      <img src="../assets/register2b.jpg" alt="regeister image" />
      <div class="text">
        <div class="container text">
          <h4>Register</h4>
          <form @submit.prevent="register">
            <input v-model="username" class="input" type="text" placeholder="Username" value />
            <input v-model="email" class="input" type="email" placeholder="Email" value />
            <input v-model="password" class="input" type="password" placeholder="Password" value />
            <div class="btns">
              <!-- <span> -->
                <button type="submit" class="button is-light">Register</button>
              <!-- </span> -->
            </div>
            <div class="button">
              <span @click="$router.push('/users/login')" class="button-text">I have an account</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data: function () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.axios
        .post(`/users/register`, {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          if (data.user.role === `admin`) {
            localStorage.setItem('isAdmin', true)
            this.$emit('setIsAdmin', true)
          }
          this.$router.push('/')
          this.$emit('setIsLogin', true)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
img {
  /* object-fit: cover; */
  height: 50vh !important;
  width: 38vh !important;
}
.btns {
  display: flex;
  flex-direction: column;
}
</style>
