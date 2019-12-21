<template>
  <form id="login" @submit.prevent="loginAttemp">
    <b-form-group label-cols-lg="2" label-size="sm" label="Email">
      <b-form-input id="input-email" v-model="email" type="email" size="sm"></b-form-input>
    </b-form-group>
    <b-form-group label-cols-lg="2" label-size="sm" label="Password">
      <b-form-input id="input-password" v-model="password" type="password" size="sm"></b-form-input>
    </b-form-group>
    <b-button variant="outline-primary" type="submit">Login</b-button>
  </form>
</template>

<script>
import axios from '../../api/server';
import router from '../router';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginAttemp() {
      axios
        .post('user/login', {
          email: this.email,
          password: this.password,
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.$emit('check');
          router.push({ name: 'products' });
        })
        .catch((err) => {
          const errors = err.response.data.join(' | ');
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errors,
          });
        });
    },
  },
};
</script>

<style scoped>
</style>
