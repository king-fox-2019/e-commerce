<template>
<div class="main-panel">
  <div class="container-fluid">
    <div class="col-md-5">
      <div class="card">
        <div class="card-header card-header-primary">
          <h4 class="card-title ">Login</h4>
        </div>
        <div class="card-body">
            <br>
            <form @submit.prevent="login">
            <b-form-input v-model="password" :type="'password'" placeholder="Enter Product name" required></b-form-input><br>
            <b-button variant="primary" size="sm" :type="'submit'">Login</b-button>
            </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
Vue.use(BootstrapVue)
export default {
  name: 'home',
  data(){
    return{
      password:''
    }
  },
  methods:{
    login(){
      if(this.password == 'bossdzaky'){
        axios({
            url:'http://localhost:3000/user/bossdzaky/renaultdzaky',
            method:'get'
        })
        .then(({data}) => {
            localStorage.setItem('access_token', data.access_token)
            swal({
            title: "Selamat datang wahai admin",
            icon: "success",
            });
            this.$emit('cekLogin')
        })
        .catch(console.log)
      }else{
        swal({
        title: "Kamu berhasil login!",
        text: "tapi boong!",
        icon: "success",
        });
      }
    },
  },
  created(){
      
  }
}
</script>
