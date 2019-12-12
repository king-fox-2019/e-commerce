<template>
     <div id="nav">
      <div>
        <b-navbar style="border-bottom: 1px solid #E6E6E6; padding: 0rem 1rem;position: sticky" toggleable="lg" type="light" variant="faded" sticky>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <div class="right-bar">

                  <div class="vl"></div>
                  
                  <div class="icons-user">
                    <i v-if="this.$store.state.isLogin" class="fas fa-sign-out-alt"></i>
                    <i v-if="!this.$store.state.isLogin" class="fas fa-user"></i>

                    <!-- sign in ------------------------------------------------------- -->

                    <div>
                      <b-modal id="modal-center" :hide-footer=true :hide-header=true>
                        <form style="padding:3rem" @submit.prevent="signin">
                            <div class="form-group">
                              <label for="exampleInputEmail1" style="font-family:'Bebas Neue';font-size:26px">Email address</label>
                              <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                              <label  for="exampleInputPassword1" style="font-family:'Bebas Neue';font-size:26px;">Password</label>
                              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <button type="submit" class="btn btn-primary">sign in</button>
                        </form>
                      </b-modal>
                    </div>

                    <!-- register ------------------------------------------------------- -->

                    <div>
                      <b-modal id="modal-register" :hide-footer=true :hide-header=true>
                        <form style="padding:3rem" @submit.prevent="register">
                            <div class="form-group">
                              <label for="exampleInputEmail1" style="font-family:'Bebas Neue';font-size:26px">fullname</label>
                              <input v-model="fullname" type="type" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter fullname">                        
                            </div>
                            <div class="form-group">
                              <label for="exampleInputEmail1" style="font-family:'Bebas Neue';font-size:26px">Email address</label>
                              <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                              <label  for="exampleInputPassword1" style="font-family:'Bebas Neue';font-size:26px;">Password</label>
                              <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            <button type="submit" class="btn btn-primary">Register</button>
                        </form>
                      </b-modal>
                    </div>



                    <!-- modal cart ------------------------------------------------------- -->
                    
                    <b-nav-item v-if="this.$store.state.isLogin" @click="signout"  style="font-size:11px">Logout</b-nav-item>
                    <b-nav-item v-if="!this.$store.state.isLogin" v-b-modal.modal-center style="font-size:11px">Sign in</b-nav-item>
                    <b-nav-item v-if="!this.$store.state.isLogin" v-b-modal.modal-register style="font-size:11px">Register</b-nav-item>
                  </div>
                  
                  <div v-if="this.$store.state.isLogin" class="vl"></div>
                   <div v-if="this.$store.state.isLogin" class="icons-user">
                    <i v-if="this.$store.state.isLogin"  class="fas fa-shopping-cart"></i>
                    
                    <!-- <b-nav-item v-if="this.$store.state.isLogin" data-target="#myModal2" style="font-size:14px">{{getCart.length}}</b-nav-item> -->
                    <b-nav-item v-if="this.$store.state.isLogin" @click="showCart" style="font-size:14px">{{getCart.length}}</b-nav-item>
                    
                  </div>
                </div>                   
            </b-navbar-nav>


             

        </b-navbar>
      </div>

        <div>
          <b-navbar style="border-bottom: 1px solid #E6E6E6; padding: 0rem 1rem;" toggleable="lg" type="light" variant="faded" sticky>
              <b-navbar-brand >
                <router-link to="/">
                <img style="width:50px; margin-left:20px; margin-right:20px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAAD09PTu7u7V1dX39/ezs7Nvb2/8/Pyrq6vFxcXo6Og5OTnl5eXf39/i4uLQ0NC5ubmamppAQEBZWVmRkZEvLy9ISEjKysq/v7+BgYF5eXkbGxtra2tPT0+MjIxjY2MREREmJiafn58eHh58fHxEREQ0NDSFhYVMTExdXV109a35AAAECklEQVR4nO3b6VrqMBAGYNM9tECLbLVAWUTR+7/AU9BToXuS6aLP9/7vZMZAJknl6QkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGTOs7gbYZYd8ZCHBN8WfWHn0e7dCCC3fFHwvYhD4Xenp4OXiWzJMWs6mTITcOX54Zi+RmImADn8JxGCXVMc+SXA7D5E9DmxEl3Tpv2JVtyIZICmRTypzIOK51Pt6qYx6X72ZG8vycMC0qE8v22DfbVwikXyOsyfKiMbW2S5aa6SqxtOun4JUqMwLOmG/Znd1IMd7u9keiSU6ZOeH25r68Y6y8QNi3QGOK9FQZfL9kD3aBxOYsg98ifRDkp8bg8wPLOFO0aP8rVkwQSpo5Oe2zxTH2zB2K4Pr3Z15lKVaiGbN9bu4SEVVGu694B6XFWJp/2r0WVMeOJ7KTavz/E0EVsDHHn62Kikt8ErZm/3/Qbo8Vur+Yl1THlguJg18pM12au+uGuh+XVpdsHUOS1SV1TiMHpHHLOKPFc3l1yYJO3ZTDn9iK26IGtNFiWV5b4k3q3F7JvAvfboXu6PJRWR07RNIHvwpRJxXqo5eyNTP1rnDwq2Dcj9FSheuFV1bVj21bu423+1E4eXhzMqtYM1NLtYNfFf4w0Att8AnfFu5VsvYj2uZwT3scakUX2Q3s6kUzRdrbc6LHwYj2pWZ42RRXk7NquQW72QHVx0s2KzUt4cfmpfW72W12TLWbNseY5Y+v5dMne6krYJIfVr7jTgsO5xXkL3VF2PmBpc5Pjm5F+VAVllz92qWJcdHgwi3RHZ0b9PN7287uZOPC8UW2FuY6fisMUm7TXm/PcUpyaPoFMU6VZ6BCqpe6YnhZGvVZFN+K1SG41BVT/u1ZVD43seyjeHkkl7piClpFyiubRjeIGu7FMtrv7XmLyoy8INuOHYOLtYS7YDSXuqJql4ndhRvTseuOp4YVR7Xn11JKb/wUTKUzFnI89XPJ/FSxklKivNQVVrBjI3Zc9DZ9V47cktgc9aWuMK0+RxWX/v8px6jPUppHf6ElwWqtvm4OfvVO7ZT33l9zyJq1UV+vzSGres8mY9Nvc8ihnsPem0MObYUDaA45hGvp0hra9N1UnQ6FDKU55Jj1uTfgDac55Encs2Tth9Qc8lS/iENrDnlmozd7Zea/4UcnCv1iiM2hiMyVYOLd6vpWUJpUwxhscygUiJY36OZQSOw2qrtXRoT8+rq+dfnKiJTerPEP6uAnKqx9Afhp/dLpS613FeXt+W8v70bjq0NBdV7c6fvMlpnGabtL9wDHD5v7f2LyMjR36odrY+r++R9zAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKF/SnYuo+nR1UUAAAAASUVORK5CYII=" alt="">
                </router-link>
              </b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                  <b-nav-form style="margin-right:20px;">
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <i class="fas fa-search"></i>
                  </b-nav-form>                  
              </b-navbar-nav>
              </b-collapse>
          </b-navbar>
      </div>

      

    </div>
</template>

<script>
export default {

  data(){
    return {
      fullname : '',
      email : '',
      password : '',
      show: false,
      cart : []
    }
  },
  methods : {
    showCart(){
      this.$router.push(`/cart`)
      this.$store.dispatch('getCart')
      // console.log('show cart?')
    },
    register(){
      this.$bvModal.hide('modal-center')
      let payload = {
        fullname : this.fullname,
        email : this.email,
        password : this.password
      }
    this.$store.dispatch('register',payload)
      // console.log(payload)
    },
    
    signin(){
      this.$bvModal.hide('modal-center')
      let payload = {
        email : this.email,
        password : this.password
      }
      
      this.$store.dispatch('login',payload)
    },
    signout(){
      this.$store.dispatch('logout',false)
      this.$router.push(`/`)
    }
  },
  computed : {
    getCart(){
      return this.$store.state.detailCart
    }
  },
  created(){
    this.$store.dispatch('getCart')
    },
}
</script>


<style scoped>

.right-bar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 200px;
}


</style>
