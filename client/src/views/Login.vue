<template>
  <div>
    <div class="d-flex container justify-content-center align-items-center login">
      <div class="d-flex flex-column bd-highlight mb-3 sub-login">
        <div class="p-2 bd-highlight">
          <div class="d-flex justify-content-between bd-highlight">
            <img src="../../public/logam-mulia.jpg" alt="" />
            <img src="../../public/antam.png" alt="" />
          </div>
        </div>
        <div class="p-2 bd-highlight mt-3">
          <b-card class="card">
            <b-card-text>
              <h2 class="title">Login Form</h2>
              <div class="d-flex bd-highlight mt-4">
                <div class="p-2 bd-highlight register">
                  <div>
                    <a class="btn btn-primary facebook" href="#" role="button">
                      <i class="fab fa-facebook-f mr-2"></i>
                      Login via Facebook</a
                    >
                  </div>
                  <div class="mt-2">
                    <a class="btn btn-primary google" href="#" role="button">
                      <i class="fab fa-google-plus-g mr-2"></i>
                      Login via Google+</a
                    >
                  </div>
                  <div class="mt-2">
                    <router-link class="btn btn-primary indep" to="/register">Register</router-link>
                  </div>
                </div>
                <div class="p-2 w-100 bd-highlight form-login">
                  <div class="ml-4 mr-4 form">
                    <b-form @submit.prevent="login">
                      <b-form-group id="email" label="Email" class="label">
                        <b-form-input
                          v-model="email"
                          required
                          type="email"
                          placeholder="Enter your email"
                          class="input"
                        ></b-form-input>
                      </b-form-group>
                      <b-form-group id="password" label="Password" class="label">
                        <b-form-input
                          v-model="password"
                          required
                          type="password"
                          placeholder="Enter your password"
                          class="input"
                        ></b-form-input>
                      </b-form-group>
                      <b-button type="submit" variant="primary" class="indep mt-3">Login</b-button>
                    </b-form>
                  </div>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </div>
        <div class="p-2 bd-highlight mt-3">
          <router-link to="/" class="back">
            Kembali ke Halaman Utama
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const value = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('login', value)
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful, Welcome',
            showConfirmButton: false,
            timer: 1500,
          });
          this.email = '';
          this.password = '';
          localStorage.setItem('token', data.token);
          this.$store.commit('SET_LOGIN', true);
          this.$router.push('/');
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          });
        });
    },
  },
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  width: 70%;
}
.back {
  color: #cb9b2d;
  font-weight: bold;
  text-decoration: underline;
}
.sub-login {
  width: 100%;
}
img {
  height: 50px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
}
.title {
  color: #cb9b2d;
  font-weight: bold;
}
.register {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form-login {
  border-left: 3px solid #cb9b2d !important;
}
.label {
  text-align: left;
  font-weight: bold;
  color: #23427e;
}
.btn {
  width: 210px;
  font-weight: bold;
}
.facebook,
.facebook:focus {
  background-color: #3268c3 !important;
  border: #3268c3 !important;
  box-shadow: none !important;
}
.facebook:hover {
  background-color: #2a56a2 !important;
  border: #2a56a2 !important;
}
.google,
.google:focus {
  background-color: #ce1314 !important;
  border: #ce1314 !important;
  box-shadow: none !important;
}
.google:hover {
  background-color: #a30f0f !important;
  border: #a30f0f !important;
}
.indep,
.indep:focus {
  background-color: #cb9b2d !important;
  border: #cb9b2d !important;
  box-shadow: none !important;
}
.indep:hover {
  background-color: #927020 !important;
  border: #927020 !important;
}
.input {
  box-shadow: none !important;
  height: 40px;
}
.input:focus,
.input:hover {
  box-shadow: none !important;
  border: 2px solid #cb9b2d;
}
</style>
