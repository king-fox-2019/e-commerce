<template>
  <div>
    <form class="form-signin" @submit.prevent="register">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <div class="form-group">
        <label for="exampleUsernameInput">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleUsernameInput"
          aria-describedby="usernameHelp"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-dark mr-2">
          Register
        </button>
      </div>
      <small class="form-text text-muted">
        Already registered?
        <router-link to="login">
          Login <span class="fas fa-angle-double-right"></span>
        </router-link>
      </small>
    </form>
  </div>
</template>

<script>
import axios from "@/utils/axios-instance.js";

export default {
  name: "RegisterForm",
  data: function() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios
        .post("/users/register", {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          // localStorage.setItem('token', data.access_token)
          this.$store.commit("UPDATE_USERNAME", { username: data.username });
          this.$store.commit("UPDATE_ACCESS_TOKEN", {
            access_token: data.access_token
          });
          this.clearData();
          this.$swal("Success", "You success register", "success");
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data)
            // console.log(error.response.status)
            // console.log(error.response.headers)
            this.clearData();
            this.$swal(
              "Ooops",
              error.response.data.errors.join(" & "),
              "error"
            );
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message)
          }
          // console.log(error.config)
        });
    },
    clearData() {
      this.password = "";
    }
  }
};
</script>

<style scoped>
.form-signin {
  width: 50%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  min-height: 83vh;
}

a:hover {
  text-decoration: none;
}
</style>
