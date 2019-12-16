<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register Form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                  />
                  <v-text-field
                    id="email"
                    label="Email"
                    name="email"
                    prepend-icon="email"
                    type="email"
                    v-model="email"
                  />
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click.prevent="register">Register</v-btn>
              </v-card-actions>
            </v-card>
            <v-row align="center">
            <v-col class="text-center" cols="12" sm="12">
              <v-btn block color="red" dark><router-link to="/login">Already have an account? LOG IN!</router-link></v-btn>
            </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <div>
    </div>
  </v-app>
</template>

<script>

import axios from 'axios'

export default {
  name: 'registerForm',
  data: function () {
    return {
      username: '',
      email: '',
      password: '',
      success: '',
      error: ''
    }
  },
  methods: {
    register: function () {
      axios({
        method: 'POST',
        url: `${this.$store.state.baseUrl}/users/register`,
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          this.success = 'New account successfully created'
        })
        .catch(err => {
          console.log(err)
          this.error = err
        })
        .finally(() => {
          this.resetForm()
        })
    },
    resetForm () {
      this.username = ''
      this.email = ''
      this.password = ''
      this.error = ''
      this.success = ''
    }
  }
}
</script>

<style>

</style>
