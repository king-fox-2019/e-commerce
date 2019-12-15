<template>
    <div class="firstPage" style="border: solid 2px red*">
      <!-- <h1> filename: component/FormRegister.vue</h1> -->
        
        <div class="card" style="width: 18rem; margin:auto; margin-top:5%;" >
            <form class="px-4 py-3 shadow-lg p-3 bg-white rounded" @submit.prevent="register">
                <div class="form-group">
                <label for="username" style="float:left">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="form-group">
                <label for="emailRegister" style="float:left">Email address</label>
                <input type="email" class="form-control" id="emailRegister" v-model="emailRegister" required>
                </div>
                <div class="form-group">
                <label for="passwordRegister" style="float:left">Password</label>
                <input type="password" class="form-control" id="passwordRegister" v-model="passwordRegister" required>
                </div>
                <div class="form-group">
                <label for="role" style="float:left">Role</label>
                <div class="form-group">
                    <select class="custom-select" id="inputGroupSelect01" v-model="role" required>
                        <option value="" selected data-default>register as</option>
                        <option value="seller">Seller</option>
                        <option value="buyer">Buyer</option>
                    </select>
                </div>
                </div>
                
                <div>
                <button type="submit" class="btn btn-primary" style="float:left">Register</button>
                </div>

                <div class="form-group" style="margin-top:80px">
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" @click.prevent="goToLoginPage">Already have Account? Sign In</a>
                </div>
                <!-- <a class="dropdown-item" href="" >Already have account? Sign In</a> -->
            </form>
        </div>  

    </div>



</template>





<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'FormRegster',
    data: function(){
        return {
            username: '',
            emailRegister: '',
            passwordRegister: '',
            role: ''
        }

    },
    methods:{
        register()
          {
              console.log('TCL \n============\n ', this.username)
              console.log('TCL \n============\n ', this.emailRegister)
              console.log('TCL \n============\n ', this.passwordRegister)
              console.log('TCL \n============\n ', this.role)
              axios({
                  method:'post',
                  url: 'http://localhost:3000/users/register',
                  data: {
                      username:this.username,
                      email: this.emailRegister,
                      password: this.passwordRegister,
                      role:this.role
                  }
              })
              .then(result=>{
                  console.log('TCL \n============\n ', result)
                  Swal.fire(
                      'Registration Successful',
                      `Welcome ${this.username}`,
                      'success'
                  )
                  this.username = ''
                  this.emailRegister = ''
                  this.passwordRegister = ''
                  this.role = ''

                  this.$router.push({path: '/login'})
              })
              .catch(err=>{
                  console.log('TCL \n============\n ', err.response.data.message)
                  Swal.fire({
                      title: err.response.data.message
                  })
              })
          },
        goToLoginPage()
          {
              this.$router.push({ path: '/login'})
          }
    }



}
</script>




<style>



</style>