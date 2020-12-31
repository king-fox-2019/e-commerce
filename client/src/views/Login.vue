<template>
<div class="container">
  <div class="row">
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <div class="card card-signin my-5">
        <div class="card-body">
          <h5 class="card-title text-center">Sign In</h5>
          <form class="form-signin" @submit.prevent="login">
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

            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
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
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  watch : {
      getIsLoading(oldValue,newValue){
        if(newValue===true){
            this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong email or password'
          })
        }
      },
      getIsSuccess(oldValue,newValue){
        if(newValue===true){
            this.$swal.fire({
            type: 'Success',
            title: 'Success',
            text: 'Welcome',
            timer: 1000,
            showConfirmButton: false
          })
        }
      }
  },
  methods: {
    ...mapActions({setAdmin:'setAdmin'}),
    login () {
      axios({
        method:'post',
        url:'http://35.226.212.72/user/login',
        data:{
          email:this.email,
          password:this.password
        }
      })
      .then(result=>{
        localStorage.setItem('access_token',result.data.access_token)
        this.$store.dispatch('login')
        if(result.data.admin){
          localStorage.setItem('admin',result.data.admin)
          this.$router.push({path:'/admin'})
        }else{
          this.$router.push({path:'/product'})
          this.$swal.fire({
            type: 'success',
            title: 'success',
            text: 'Successful Login',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
      .catch(err=>{
        console.log('masuk catch')
        this.$swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Wrong email or password'
        })
      })
    }
  }
}
</script>

<style scoped>
/* body {
  background: #007bff;
  background: linear-gradient(to right, #0062E6, #33AEFF);
} */
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
