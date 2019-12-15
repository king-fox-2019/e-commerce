<template>
    <div>
        <!-- <h1 style="border:2px solid blue">filename: component/NavigationBar</h1> -->
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">BRAND</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="#" @click.prevent="goToHomePage">Home </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" v-if="role === 'seller'" @click.prevent="goToProductEditPage">@MyProducts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" v-if="role === 'buyer'" @click.prevent="goToViewCartPage">View Cart</a>
                </li>
                <li class="nav-item" v-if="!isLogin">
                    <a class="nav-link" href="#" @click.prevent="goToLoginPage">Login / Register</a>
                </li>
                </ul>
                
                <form class="form-inline my-2 my-lg-0" @submit.prevent="">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    
                </form>
                <div style="margin-left:10px">
                    <button type="button" class="btn btn-secondary btn-sm" v-if="isLogin" @click.prevent="loggingOut">Log Out</button>
                </div>
            </div>
        </nav>
    </div>
</template>




<script>
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'NavigationBar',
    data: function(){
        return {
            // isLogina : false
        }
    },
    methods:{
        goToHomePage()
          {
              this.$router.push('/')
          },
        goToLoginPage()
          {
            // alert('woi')
            this.$router.push({ path: 'login' })
          },
        goToViewCartPage()
          {
            this.$router.push({ path: 'viewCart'})
          },
        goToProductEditPage()
          {
            this.$router.push({ path: 'editProduct'})
          },
        loggingOut()
          {
              Swal.fire({
                  title:"Logging OUt",
                  text:"Confirm logging Out?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: "confirm"
              })
              .then(result=>{
                  if(result.value)
                    {
                        localStorage.clear()
                        this.$store.dispatch('setIsLogin')
                        this.$store.commit('SET_ROLE', null)
                        this.$router.push({ path: '/'})
                    }
              })
              
          }
    },
    created()
      {
          this.$store.dispatch('setIsLogin')
      },
    computed:{
        ...mapGetters([
            'isLogin',
            'role'
        ])

    }

    


}
</script>





<style>
    



</style>