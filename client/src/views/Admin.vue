<template>
  <div>
    <navbar></navbar>
    <div v-if="$route.path == '/admin'">
      <div
        class="container row mx-auto justify-content-center align-items-center"
        v-if="!superExist"
      >
        <b-jumbotron
          header-level="5"
          bg-variant="transparent"
          class="col-12 d-flex text-center pb-0"
          id="landing-page"
          fluid
        >
          <template v-slot:header>Register Super Admin</template>
        </b-jumbotron>
        <b-form
          class="col-12 col-md-8 col-lg-6 col-xl-5 align-self-start"
          @submit.prevent="onRegister"
          novalidate
        >
          <b-form-group
            label-for="username"
            description="Must only contains lowercase letters, numbers, dots and/or underscores."
          >
            <b-form-input
              id="username"
              v-model.trim="username"
              type="text"
              placeholder="Username"
              :state="validateUsername"
              @focus="emptyUsername = false"
              autocomplete="off"
              required
            ></b-form-input>
            <b-popover
              target="username"
              placement="right"
              variant="danger"
              content="Username cannot empty!"
              triggers
              :show.sync="emptyUsername"
            ></b-popover>
          </b-form-group>

          <b-form-group
            label-for="password"
            description="Must have at least 6 characters."
          >
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              placeholder="Password"
              :state="validatePassword"
              @focus="emptyPassword = false"
              required
            ></b-form-input>
            <b-popover
              target="password"
              placement="right"
              variant="danger"
              content="Password cannot empty!"
              triggers
              :show.sync="emptyPassword"
            ></b-popover>
          </b-form-group>

          <div
            class="d-flex justify-content-between align-items-center flex-wrap"
          >
            <b-button type="submit" variant="primary">Sign Up</b-button>
          </div>
        </b-form>
      </div>

      <div
        class="container row mx-auto justify-content-center align-items-center"
        v-if="superExist"
      >
        <b-jumbotron
          header-level="5"
          bg-variant="transparent"
          class="col-12 d-flex text-center pb-0"
          id="landing-page"
          fluid
        >
          <template v-slot:header>Admin Sign In</template>
        </b-jumbotron>
        <b-form
          class="col-12 col-md-8 col-lg-6 col-xl-5 align-self-start"
          @submit.prevent="onSignIn"
          novalidate
        >
          <b-form-group label-for="username">
            <b-form-input
              id="username"
              v-model.trim="username"
              type="text"
              placeholder="Username"
              @focus="emptyUsername = false"
              autocomplete="off"
              required
            ></b-form-input>
            <b-popover
              target="username"
              placement="right"
              variant="danger"
              content="Username cannot empty!"
              triggers
              :show.sync="emptyUsername"
            ></b-popover>
          </b-form-group>

          <b-form-group label-for="password">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              placeholder="Password"
              @focus="emptyPassword = false"
              required
            ></b-form-input>
            <b-popover
              target="password"
              placement="right"
              variant="danger"
              content="Password cannot empty!"
              triggers
              :show.sync="emptyPassword"
            ></b-popover>
          </b-form-group>

          <div
            class="d-flex justify-content-between align-items-center flex-wrap"
          >
            <b-button type="submit" variant="primary">Sign In</b-button>
          </div>
        </b-form>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import AdminNavBar from '@/components/AdminNavbar'

export default {
  components: {
    navbar: AdminNavBar
  },
  data() {
    return {
      username: '',
      password: '',
      emptyUsername: false,
      emptyPassword: false,
      superExist: true
    }
  },
  computed: {
    validateUsername() {
      return this.username ? /^[a-zA-Z0-9_.]+$/.test(this.username) : null
    },
    validatePassword() {
      return this.password ? this.password.length >= 6 : null
    }
  },
  methods: {
    onRegister() {
      let isValid = true
      const { username, password } = this
      if (!username) {
        this.emptyUsername = true
        isValid = false
      }
      if (!password) {
        this.emptyPassword = true
        isValid = false
      }
      if (isValid && this.validateUsername && this.validatePassword) {
        const loader = this.$loading.show()
        this.$store
          .dispatch('ADMIN_REGISTER', {
            username,
            password
          })
          .then(({ data }) => {
            this.$toasted.show(data.message)
            this.$router.replace('/admin/dashboard')
          })
          .catch(({ response }) => {
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
    },
    onSignIn() {
      let isValid = true
      const { username, password } = this
      if (!username) {
        this.emptyUsername = true
        isValid = false
      }
      if (!password) {
        this.emptyPassword = true
        isValid = false
      }
      if (isValid) {
        const loader = this.$loading.show()
        this.$store
          .dispatch('ADMIN_SIGN_IN', {
            username,
            password
          })
          .then(({ data }) => {
            this.$toasted.show(data.message)
            this.fetchAdminData()
            this.$router.replace('/admin/dashboard')
          })
          .catch(({ response }) => {
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
    },
    fetchAdminData() {
      this.$store.dispatch('FETCH_ADMIN_TRANSACTIONS')
      this.$store.dispatch('FETCH_ADMIN_ITEMS')
    }
  },
  created() {
    this.$store
      .dispatch('CHECK_SUPER_ADMIN')
      .then(() => (this.superExist = true))
      .catch(() => (this.superExist = false))
    this.$store
      .dispatch('CHECK_SESSION')
      .then(() => {
        if (this.$route.path == '/admin')
          this.$router.replace('/admin/dashboard')
        this.fetchAdminData()
      })
      .catch(() => {
        if (this.$route.path != '/admin') this.$router.replace('/admin')
      })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding-top: 3.7rem;
}
</style>
