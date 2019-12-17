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
                <v-toolbar-title>Log In Form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
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
                <v-btn color="primary" @click.prevent="login">Log In</v-btn>
              </v-card-actions>
            </v-card>
            <v-row align="center">
            <v-col class="text-center" cols="12" sm="12">
              <v-btn block color="red" dark><router-link to="/register">Don't have an account? REGISTER!</router-link></v-btn>
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
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      success: '',
      error: ''
    }
  },
  methods: {
    login: function () {
      // this.loading = true;
      axios({
        method: 'POST',
        url: `${this.$store.state.baseUrl}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.resetForm()
          this.success = 'Successfully login'
        })
        .catch(err => {
          this.error = err
        })
    },
    resetForm () {
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
