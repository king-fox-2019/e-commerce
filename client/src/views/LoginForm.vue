<template>
  <div>
    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
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
      <button type="submit" class="btn btn-dark">Login</button>
      <small class="form-text text-muted">
        <router-link to="/register">
          <span class="fas fa-angle-double-left"></span> Register
        </router-link>
      </small>
    </form>
  </div>
</template>

<script>
import axios from "@/utils/axios-instance.js";

export default {
  name: "LoginForm",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post("/users/login", {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("username", data.username);
          this.$store.commit("UPDATE_USERNAME", { username: data.username });
          this.$store.commit("UPDATE_ACCESS_TOKEN", {
            access_token: data.acces_token
          });
          this.$store.dispatch("fetchAllCart");
          this.clearData();
          this.$swal("Success", "You success login", "success");
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          if (error.response) {
            this.clearData();
            this.$swal("Ooops", error.response.data.errors, "error");
          } else {
            console.log(error);
          }
        });
    },
    clearData() {
      this.email = "";
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
