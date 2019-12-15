<template>
  <div id="contain">
    <div class="formdata">
      <b-form @submit.prevent="onRegisterSubmit">
        <b-form-group
          id="input-group-1"
          label="Email:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="Email"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Name:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.name" required placeholder="Name"></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Phone:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.phone_number"
            required
            placeholder="Phone Number"
          ></b-form-input>
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
          Already got an account?
          <router-link to="/login">
            <a>Login</a>
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
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        phone_number: ""
      }
    };
  },
  methods: {
    onRegisterSubmit() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/register",
        data: this.form
      })
        .then(({ data }) => {
          // console.log(data);
          swal.fire(`welcome ${data.user.name}!`);
          this.$store.commit("setUserID", data.user._id);
          this.$f7.mainView.router.load({url:'/'}) // ga bisa pindah router
        })
        .catch(error => swal.fire(error.response.data.message[0]));
    }
    // closeThisRegister() {
    //   this.$emit('close-register-form');
    // }
  }
};
</script>

<style scoped>
#contain {
  display: flex;
  justify-content: center;
  align-items: center;
}
.formdata {
  background-color: rgba(124, 124, 124, 0.199);
  border: 2px dotted black;
  padding: 2rem;
  width: 30vw;
}
</style>
