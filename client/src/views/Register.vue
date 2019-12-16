<template>
<div>
    <register-navbar/>
    <div class="row">
    <div class="col-4"></div>
    <div class="col mt-5 mb-5">
        <h1 class="mb-3" style="font-weight:bolder;">REGISTER</h1>
        <input v-model="name" type="text" class="form-control text-center inputRegister" name="" id="" aria-describedby="helpId" placeholder="Username">
        <input v-model="email" type="text" class="form-control text-center mt-2 inputRegister" name="" id="" aria-describedby="helpId" placeholder="Email">
        <input v-model="password" type="password" class="form-control text-center mt-2 inputRegister" name="" id="" aria-describedby="helpId" placeholder="Password">
        <div class="form-group files mt-4" style="font-weight:500; font-size: 15px; color: rgb(46, 46, 46);">
            <label class="text-left">Photo Profile</label>
            <div :style="styleImage"> </div>
            <div class="d-flex justify-content-center container mt-2    " style="padding: 0 110px">
                <input @change="onFileChange" type="file" class="form-control pt-3 pb-5">
            </div>
        </div>
        <button @click="register" type="button" class="btn btn-block mt-5 btnlogin mb-3">
            CREATE ACCOUNT
        </button>
        <span class="d-flex justify-content-center" style="color:rgb(155, 155, 155);">Already a member? <a class="btnregister ml-1" @click.prevent="$refs.Login.openModal()"> Sign in. </a></span>
    </div>
    <div class="col-4"></div>
    </div>
    <modal-login ref="Login"/>
    <router-view/>
</div>
</template>

<script>
import NavbarMenu from '../components/NavbarRegister'
import Login from '../components/Login'
import axios from '../../apis/axios'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
export default {
  name: 'register',
  components: {
    'register-navbar': NavbarMenu,
    'modal-login': Login
  },
  data () {
    return {
      imagea: '',
      styleImage: '',
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      this.imagea = file
      let image = new Image()
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        vm.styleImage = `height: 200px; background: url(${e.target.result}) no-repeat center center/cover; background-size: 100%; margin-top: -6px;`
      }
      reader.readAsDataURL(file)
    },
    reset () {
      this.imagea = ''
      this.name = ''
      this.email = ''
      this.password = ''
      this.styleImage = ''
    },
    register () {
      let form = new FormData()
      form.set('name', this.name)
      form.set('email', this.email)
      form.set('password', this.password)
      form.append('image', this.imagea)
      axios({
        url: '/user/register',
        method: 'POST',
        data: form
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire({
            title: 'Register!',
            text: '',
            icon: 'success',
            // imageWidth: 400,
            // imageHeight: 200,
            timer: 2500,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            showCancelButton: false,
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا'
          })
          this.password = ''
          this.$refs.Login.openModal(data.user.email)
        })
        .catch(error => {
          console.log(error.response.data.errors)
          Swal.fire({
            title: 'Error!',
            text: error.response.data.errors.join(' | '),
            icon: 'error',
            // imageWidth: 400,
            // imageHeight: 200,
            timer: 2500,
            imageAlt: 'Custom image',
            showConfirmButton: false,
            showCancelButton: false,
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا'
          })
        })
    }
  },
  watch: {
    if (isLogin) {
      this.reset()
    }
  },
  computed: mapState(['isLogin'])
}
</script>

<style scoped>
.inputRegister:focus{
    box-shadow: 0 0 5px 1px rgba(255, 68, 0, 0.377);
    border: 1px solid orangered;
}

.btnlogin{
    background-color: black;
    color: white;
    font-weight: bolder;
    transition: 0.5s;
}
.btnlogin:hover{
    background-color: #E67B0B;
    color: black;
}

.btnregister{
    color: black;
    text-decoration: underline;
    cursor: pointer;
}
.btnregister:hover{
    color: blue;
    text-decoration: underline;
}
</style>
