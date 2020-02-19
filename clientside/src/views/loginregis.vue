<template>
<div class="cart-table-area section-padding-80">
    <div class="row">
        <div class="col-12 col-lg-6">
            <div class="cart-summary">
                <form @submit.prevent="login">
                    <h2>Login</h2>
                    <div class="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" v-model="loginEmail" class="form-control" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="pass">Password:</label>
                        <input type="password" v-model="loginPassword" class="form-control" id="pass" required>
                    </div>
                    <input type="submit" class="btn amado-btn w-100" value="login">
                </form>
            </div>
        </div>
        <div class="col-12 col-lg-6">
            <div class="cart-summary">
                <form @submit.prevent="register">
                    <h2>Register</h2>
                    <div class="form-group">
                        <label for="email">Email address:</label>
                        <input type="email" v-model="registerEmail" class="form-control" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="name">Full Name:</label>
                        <input type="text" v-model="registerName" class="form-control" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="pass">Password:</label>
                        <input type="password" v-model="registerPassword" class="form-control" id="pass" required>
                    </div>
                    <input type="submit" class="btn amado-btn w-100" value="register">
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'login',
    data(){
        return{
            loginEmail : '',
            loginPassword : '',
            registerEmail : '',
            registerName : '',
            registerPassword : ''
        }
    },
    methods:{
        login(){
            axios({
                url:'http://localhost:3000/user/login',
                method:'post',
                data:{
                    email : this.loginEmail,
                    password : this.loginPassword
                }
            })
                .then(({data})=> {
                    swal({
                    title: "Login success!",
                    icon: "success",
                    });
                    localStorage.setItem('access_token', data.access_token)
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err)
                    swal({
                    title: "Wrong email or password!",
                    icon: "warning",
                    });
                })
        },
        register(){
            axios({
                url:'http://localhost:3000/user',
                method:'post',
                data:{
                    email : this.registerEmail,
                    password : this.registerPassword,
                    name : this.registerName
                }
            })
                .then(({data}) => {
                    swal({
                    title: "Register success!",
                    icon: "success",
                    });
                    localStorage.setItem('access_token', data.access_token)
                    this.$router.push('/')
                })
                .catch(err => {
                    swal({
                    title: err.response.data.message,
                    icon: "warning",
                    });
                })
        }
    }
}
</script>

<style>

</style>