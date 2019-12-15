<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Login
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      checkbox: false
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.login()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('user/login', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          this.$toast.success(`Welcome ${data.user.username} !`, 'OK', {
            position: 'topRight'
          })
          this.$store.commit('user/SET_IS_LOGIN', true)
          this.$store.commit('user/SET_ROLE', data.user.role)
          this.$router.push('/')
        })
        .catch(err => {
          this.$toast.error(`${err.response.data.message}`, 'Error', {
            position: 'topRight'
          })
        })
    }
  }
}
</script>

<style scoped>
v-text-field{
  color: white;
}
</style>
