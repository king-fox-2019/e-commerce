<template>
  <div style="">
      <!-- <h1> filename: component/FormLogin.vue</h1> -->

      <!-- login form -->
        <div class="card" style="width: 18rem; margin:auto; margin-top:5%;" >
            <form class="px-4 py-3 shadow-lg p-3 bg-white rounded" @submit.prevent="signIn">
                <div class="form-group">
                <label for="emailLogin" style="float:left" >Email address</label>
                <input type="email" class="form-control" id="emailLogin" v-model="emailLogin" required>
                </div>
                <div class="form-group">
                <label for="passwordLogin" style="float:left">Password</label>
                <input type="password" class="form-control" id="passwordLogin" v-model="passwordLogin" required>
                </div>
                <div class="form-group">
                <button type="submit" class="btn btn-primary" style="float:left">Sign in</button>
                </div>
                <div>
                <!-- <div class="g-signin2" data-onsuccess="onSignIn">Hit refresh to show Gsignin</div> -->
                </div>

                <div class="form-group" style="margin-top:80px">
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click.prevent="goToRegisterPage">New around here? Sign up</a>
                </div>
            </form>
        </div>  
        <!-- end of login form -->




  </div>

</template>




<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'FormLogin',
    data: function(){
        return {
            emailLogin: '',
            passwordLogin: '',
            
        }
    },
    methods:{
        signIn()
          {

              axios({
                  method: 'post',
                  url:'http://localhost:3000/users/login',
                  data:{
                      email: this.emailLogin,
                      password: this.passwordLogin
                  }
              })
              .then(result=>{
                  console.log('TCL \n============\n ', result)
                  localStorage.setItem('access_token', result.data.access_token)
                  localStorage.setItem('username', result.data.username)
                  localStorage.setItem('role', result.data.role)

                  this.$store.dispatch('setIsLogin')
                  this.$store.commit('SET_ROLE', localStorage.role)
                  this.emailLogin = ''
                  this.passwordLogin = ''
                
                  return Swal.fire(
                      'Login Success',
                      `Welcome back ${result.data.username} `,
                      'success'
                  )
                  
              })
              .then(result=>{
                  this.$router.push('/')
              })
              .catch(err=>{
                  Swal.fire(
                      'Login Fail',
                      `${err.response.data.message}`,
                      "error"
                  )
                  console.log('TCL \n============\n ', err.response.data.message)
              })
          },
        goToRegisterPage()
          {
              this.$router.push({ path: '/register'})
          }
    }






}
</script>



<style>





/* .g-signin2
{
    display: inline-block
} */
</style>