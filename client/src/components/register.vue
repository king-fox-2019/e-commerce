<template>
       <div class="col-6">
        <h2>Register</h2> 
        <hr>
        <b-form @submit="onSubmit">

          <b-form-group id="input-group-2" label="Your name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.name"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="password:" label-for="input-2">
            <b-form-input
              id="input-3"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Your phoneNumber:" label-for="input-2">
            <b-form-input
              id="input-4"
              v-model="form.phoneNumber"
              required
              placeholder="Enter phoneNumber"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Create</b-button>

        </b-form>
        <!-- <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card> -->
      </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'register',
         data() {
      return {
        form: {
          email: '',
          password: '',
          name: '',
          phoneNumber: ''
        }
      }
    },
    methods: {
      onSubmit(evt) {
         evt.preventDefault()
         axios({
            url: 'http://localhost:3000/users/register',
            method: 'post',
            data:  this.form
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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'invalid email or password',
                footer: '<a href>Why do I have this issue?</a>'
            })      
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>