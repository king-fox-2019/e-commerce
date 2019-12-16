<template>
<div >
  <b-modal ref="modalLogin" id="modal-center" centered hide-footer hide-header>
    <div class="row">
      <div class="col d-flex justify-content-center ml-5">
        <img src="../assets/Navbar-Mark.png" class="mx-auto" style="width:10rem" alt="logo">
      </div>
      <div class="col-1 mr-3">
        <button @click.prevent="closeModal" type="button" class="btn btn-close px-2 mt-0 py-0 rounded-circle">x</button>
      </div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col">
        <div class="form-group">
          <!-- <label for=""></label>  -->
          <input v-model="emailLogin" type="text" class="form-control text-center mt-5" name="" id="" aria-describedby="helpId" placeholder="Email Address">
          <!-- <small id="helpId" class="form-text text-muted">Help text</small> -->
          <input v-model="password" type="password" class="form-control text-center mt-2" name="" id="" aria-describedby="helpId" placeholder="Password">
          <div class="form-check mt-2 d-flex">
            <input class="form-check-input" style="width: 20px; height: 20px;" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label mt-1 ml-1" style="font-size:13px; color:rgb(155, 155, 155);" for="defaultCheck1">
              Keep me logged in
            </label>
          </div>
          <button @click="login" type="button" class="btn btn-block mt-4 btnlogin mb-3">
            LOG IN
          </button>
          <span class="d-flex justify-content-center" style="color:rgb(155, 155, 155);">not a member? <a class="btnregister ml-1" @click="$router.push('/register'), closeModal()"> join now </a></span>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
  </b-modal>
</div>
</template>

<script>
import axios from '../../apis/axios'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      password: '',
      emailLogin: ''
    }
  },
  methods: {
    openModal (email) {
      email ? this.emailLogin = email : ''
      this.$refs['modalLogin'].show()
    },
    closeModal () {
      this.$refs['modalLogin'].hide()
    },
    login () {
      let form = {
        email: this.emailLogin,
        password: this.password
      }
      axios({
        url: '/user/login',
        method: 'POST',
        data: form
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire({
            title: 'Login!',
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
          this.emailLogin = ''
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.user.email)
          this.$store.commit('ON_LOGIN', {
            isLogin: true,
            name: data.user.name,
            email: data.user.email,
            money: data.user.money,
            image: data.user.image[0],
            role: data.user.role
          })
          this.closeModal()
        })
        .catch(error => {
          console.log(error)
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
          this.password = ''
        })
    }
  },
  created () {
  },
  mounted () {
  },
  computed: mapState(['isLogin'])
}
</script>

<style scoped>
.btnregister{
  color: black;
  text-decoration: underline;
  cursor: pointer;
}
.btnregister:hover{
  color: blue;
  text-decoration: underline;
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

.btn-close{
  background-color: rgb(231, 226, 226);
  transition: 0.7s;
  font-weight: lighter;
  font-size: 20px;
}
.btn-close:hover{
  color: #ffffff;
  background-color: rgb(255, 8, 0);
}
.btn-close:focus{
  box-shadow: none;
}
</style>
