<template>
  <v-container class="">
    <v-container class="p-10">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="20"
          :rules="nameRules"
          label="Name"
          required
        ><span class="white--text"></span></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          class="grey--text"
        ></v-text-field>

        <v-text-field
          v-model="address"
          :rules="addressRules"
          label="Address"
          required
          class="grey--text"
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
          Register
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
  </v-container>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password min 6 characters'
      ],
      address: '',
      addressRules: [
        v => !!v || 'Address is required'
      ],
      checkbox: false
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.registerForm()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    registerForm () {
      let payload = {
        username: this.name,
        email: this.email,
        password: this.password,
        address: this.address
      }
      this.$store.dispatch('user/register', payload)
        .then(({ data }) => {
          this.$toast.success(`Register ${data.user.username} Success!`, 'OK', {
            position: 'topRight'
          })
          this.$router.push('/user-control/login')
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
