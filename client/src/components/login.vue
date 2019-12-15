<template>
         <div class="col-6">
        <h2>Login</h2>
        <hr>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-5"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-5"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-6" label="password:" label-for="input-2">
            <b-form-input
              id="input-6"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>
          
          <b-button type="submit" variant="primary">Sign in</b-button>

        </b-form>
      </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:'login',
     data() {
      return {
        form: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit(evt) {
         evt.preventDefault()
         axios({
            url: 'http://localhost:3000/users/login',
            method: 'post',
            data: this.form
        })
        .then(({data})=>{
          this.$store.commit('setUser',data)
          localStorage.setItem("token", data.token);
          this.emailLogin = "";
          this.passwordLogin = "";
          Swal.fire({
            icon: "success",
            title: `Login Successful, Welcome`,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err=>{
            console.log(err)
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>