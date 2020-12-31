<template>
<div class="container">
  <div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card card-signin my-5">
        <div class="card-body">
          <h5 class="card-title text-center">Register</h5>
          <form class="form-signin" @submit.prevent="register">
            <div class="form-label-group">
              <p>Username</p>
              <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
              <label for="inputUsername"></label>
            </div>

            <div class="form-label-group">
              <p>Email</p>
              <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
              <label for="inputEmail"></label>
            </div>

            <div class="form-label-group">
              <p>Password</p>
              <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="password" required>
              <label for="inputPassword"></label>
            </div>

            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
            <hr class="my-4">
            <!-- <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            username:'',
            email:'',
            password:''
        }
    },
    methods:{
        register(){
            console.log('masuk coy')
            axios({
                method:'post',
                url:'http://35.226.212.72/user/register',
                data:{
                    name:this.username,
                    email:this.email,
                    password:this.password
                }
            })
            .then(access_token=>{
                localStorage.setItem('access_token',access_token.data.access_token)
                this.$router.push({path: '/product'})
                this.$store.dispatch('login')
                this.$swal.fire({
                    icon: 'success',
                    title: 'success',
                    text: 'Successful Login',
                    showConfirmButton: false,
                    timer: 1000
                })
            })
            .catch(err=>{
                console.log('masuk catch')
                    this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password at least 6 characters or already registered'
                })
            })
        }
    }
}
</script>

<style>
.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>