<template>
  <nav>
    <router-link class="link left" to="/">TOKOKU</router-link>
    <router-link class="link nav-right" to="/">Home</router-link>
    <router-link class="link" to="/Cart">Cart</router-link>
    <a href="#" v-if="!$store.state.isLogin" v-b-modal.modal-login>Login</a>
    <a href="#" v-if="!$store.state.isLogin" v-b-modal.modal-register>Register</a>
    <a href="#" v-if="$store.state.isLogin" @click.prevent="logout">Logout</a>

    <b-modal id="modal-login" centered title="BootstrapVue" hide-footer>
      
      <b-form @submit.prevent="login">

        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="text"
            required
            placeholder="Enter Email..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password..."
          ></b-form-input>
        </b-form-group>

        <div class="button-wrapper">
          <b-button type="submit" variant="primary">Login</b-button>
        </div>

      </b-form>

    </b-modal>

    <b-modal id="modal-register" centered title="BootstrapVue" hide-footer>
      
      <b-form @submit.prevent="register">
      
        <b-form-group id="input-group-1" label="Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter full name..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="text"
            required
            placeholder="Enter Email..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password..."
          ></b-form-input>
        </b-form-group>

        <div class="button-wrapper">
          <b-button type="submit" variant="primary">Register</b-button>
        </div>

      </b-form>
    
    </b-modal>
  </nav>
  
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$bvModal.hide('modal-login')
      // this.$bvModal.show('modal-loading')
      
      this.$store.dispatch('LoginUser', { 
        email:this.form.email, 
        password: this.form.password
      })
    },
    register () {
      this.$bvModal.hide('modal-register')
      // this.$bvModal.show('modal-loading')
      
      this.$store.dispatch('RegisterUser', this.form )
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
  .button-wrapper {
    text-align: right;
  }
</style>