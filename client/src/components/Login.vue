<template>
  <div id="contain">
    <div class="formdata">
      <b-form @submit.prevent="onLoginSubmit">
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="Email"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Password:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <p>
          Dont have account yet?
          <router-link to="/register">
            <a>Register</a>
          </router-link>
        </p>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";


export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onLoginSubmit() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: this.form
      })
        .then(({ data }) => {
          swal.fire(`welcome ${data.user.name}!`);
          this.$store.commit("setUserID", data.user._id);
          localStorage.setItem('access_token', data.token)
        })
        .catch(error => swal.fire(error.response.data.message[0]));
    }
  },
  created(){
    // console.log(this.$route.name);
  }
};
</script>

<style scoped>
#contain {
  display: flex;
  justify-content: center;
  align-items: center;
}
.formdata{
  background-color: rgba(255, 255, 255, 0.644);
  border: 2px dotted black;
  padding: 2rem;
  width: 30vw;
}
</style>