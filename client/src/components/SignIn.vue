<template>
  <div class="SignIn">
    <v-container fluid class="px-0 py-0 main-signin">
      <v-row>
        <div class="signin-body bg-type1">
          <h1>LOG IN to Dragon Nest</h1>
          <v-row>
            <div class="login-box">
              <hr />
              <v-form ref="form" v-model="valid" @submit.prevent="onSignIn" lazy-validation>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>

                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you ready for adventure?"
                  required
                ></v-checkbox>

                <v-btn :disabled="!valid" color="orange darken-4" class="mr-4" type="submit">Login</v-btn>

                <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
              </v-form>
            </div>
          </v-row>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [v => !!v || "password is required"],
      checkbox: false
    };
  },
  methods: {
    onSignIn() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let payload = {
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("sign/userLogin", payload)
          .then(data => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.response.role);
            this.reset();
            this.$router.push("/news");
            this.$snotify.success(
              `Welcome to the Dragon Nest, Happy Shopping ${data.response.name}`,
              {
                timeout: 5000,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                position: "leftTop"
              }
            );
          })
          .catch(err => {
            this.reset();
            let text = "";
            err.response.data.errors.forEach(element => {
              text += element + ", ";
            });
            this.$snotify.warning(`${text}`, {
              timeout: 3000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: "leftTop"
            });
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
@import "../assets/scss/formsign/signin.css";
</style>
