<template>
  <div class="SignUp">
    <v-container fluid class="px-0 py-0 main-signup">
      <v-row>
        <div class="signup-body bg-type1">
          <h1>SIGN UP to Access</h1>
          <v-row>
            <div class="signup-box">
              <hr />
              <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="onSignUp"
                lazy-validation
              >
                <v-text-field
                  v-model="name"
                  :counter="30"
                  :rules="nameRules"
                  label="Name"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :counter="7"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="orange darken-4"
                  class="mr-4"
                  type="submit"
                  >SignUp</v-btn
                >

                <v-btn color="error" class="mr-4" @click="reset"
                  >Reset Form</v-btn
                >
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
  name: "SignUp",
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "password is required",
        v => (v && v.length >= 7) || "Password must be higher than 7 characters"
      ]
    };
  },
  methods: {
    onSignUp() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let payload = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        this.$store
          .dispatch("sign/userSignup", payload)
          .then(data => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.response.role);
            this.$router.push("/news");
            this.reset();
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
@import "../assets/scss/formsign/signup.css";
</style>
