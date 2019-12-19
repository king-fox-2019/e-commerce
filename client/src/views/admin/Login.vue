<template>
    <div class="centered-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <img src="https://vuematerial.io/assets/logo-color.png">
        <div class="md-title">Admin Login</div>
        <div class="md-body-1">Only authorized staff has access to admin panel</div>
      </div>

      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="login.email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click.prevent="authAdmin">Log in</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
export default {
  name: 'adminLogin',
  data () {
    return {
      loading: false,
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    authAdmin () {
      this.$store.dispatch('authAdmin', {
        email: this.login.email,
        password: this.login.password
      })
        .then(result => {
          if (result.isAdmin == true) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('admin', result.isAdmin)
            this.swal('success', 'Logged in as Admin')
            this.$router.push('/dashboard')
          } else {
            this.swal('error', err)
          }
          console.log(result)
        })
        .catch(err => {
          this.swal('error', err)
        })
    }
  }
}
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
