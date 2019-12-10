<template>
  <form id="login" @submit.prevent="register">
    <b-form-group label-cols-lg="2" label-size="sm" label="Fullname">
      <b-form-input id="input-email" v-model="fullname" type="text" size="sm"></b-form-input>
    </b-form-group>
    <b-form-group label-cols-lg="2" label-size="sm" label="Email">
      <b-form-input id="input-email" v-model="email" type="email" size="sm"></b-form-input>
    </b-form-group>
    <b-form-group label-cols-lg="2" label-size="sm" label="Password">
      <b-form-input id="input-password" v-model="password" type="password" size="sm"></b-form-input>
      </b-form-group>
    <b-button variant="outline-primary" type="submit">Register</b-button>
  </form>
</template>

<script>
import axios from '../../api/server';
import router from '../router';

export default {
  name: 'register',
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      axios
        .post('user', {
          fullname: this.fullname,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$swal('Registration success, now you can login');
          router.push({ name: 'loginregister' });
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
