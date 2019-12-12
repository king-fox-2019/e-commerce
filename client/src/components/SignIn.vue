<template>
  <div class="container row mx-auto justify-content-center align-items-center">
    <b-jumbotron
      header-level="5"
      bg-variant="transparent"
      class="col-12 d-flex text-center pb-0 mb-0"
      id="landing-page"
      fluid
    >
      <template v-slot:header>Sign In</template>
    </b-jumbotron>
    <b-form
      class="col-12 col-md-8 col-lg-6 col-xl-5 align-self-start"
      @submit.prevent="onSubmit"
      novalidate
    >
      <b-form-group label-for="emailUsername">
        <b-form-input
          id="emailUsername"
          v-model.trim="emailUsername"
          type="text"
          :state="emailUsernameValid"
          placeholder="Username or Email"
          @focus="emailUsernameValid = null"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label-for="password">
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          :state="passwordValid"
          placeholder="Password"
          @focus="passwordValid = null"
          required
        ></b-form-input>
      </b-form-group>

      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <b-button type="submit" variant="primary">Sign In</b-button>
        <span class="mt-2 mt-sm-0">
          Don't have an account?
          <router-link :to="`/session?from=${$route.query.from}&on=signup`"
            >Sign Up</router-link
          ></span
        >
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      emailUsername: '',
      password: '',
      emailUsernameValid: null,
      passwordValid: null
    }
  },
  methods: {
    onSubmit() {
      let isValid = true
      const { emailUsername, password } = this
      if (!emailUsername) {
        this.emailUsernameValid = false
        isValid = false
      }
      if (!password) {
        this.passwordValid = false
        isValid = false
      }
      if (isValid) {
        const loader = this.$loading.show()
        this.$store
          .dispatch('ON_SIGN_IN', {
            emailUsername,
            password
          })
          .then(({ data }) => {
            this.$toasted.show(data.message)
            this.$router.replace(this.$route.query.from)
          })
          .catch(({ response }) => {
            this.emailUsernameValid = null
            this.passwordValid = null
            this.password = ''
            if (response) {
              const message = response.data.message
              if (typeof message != 'string') {
                response.data.message.forEach(msg => {
                  this.$toasted.show(msg, { className: 'bg-danger' })
                })
              } else {
                this.$toasted.show(response.data.message, {
                  className: 'bg-danger'
                })
              }
            } else {
              this.$toasted.show('Something went wrong', {
                className: 'bg-danger'
              })
            }
          })
          .finally(() => loader.hide())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
