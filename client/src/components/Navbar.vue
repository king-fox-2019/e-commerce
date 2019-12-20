<template>
  <header class="header">
    <div id="top" v-if="!$store.state.isLogin">
      <div class="container d-flex justify-content-end">
            <ul class="d-flex menu list-inline mb-0">
              <li class="list-inline-item">
                <a href="#" v-b-modal.login-modal>Login</a>
              </li>
              <li class="list-inline-item">
                <a href="/register" @click.prevent="toRegister">Register</a>
              </li>
            </ul>
      </div>

      <!-- MODAL LOGIN -->
      <b-modal
        hide-header
        hide-footer
        id="login-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="Login"
        aria-hidden="true"
        class="modal fade"
      >
            <div class="modal-header">
              <h5 class="modal-title">Customer login</h5>
              <button type="button" @click="$bvModal.hide('login-modal')" aria-label="Close" class="close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="" method="post" @submit.prevent="setLogin">
                <div class="form-group">
                  <input id="email-modal" type="text" placeholder="email" v-model="email" class="form-control" />
                </div>
                <div class="form-group">
                  <input
                    id="password-modal"
                    type="password"
                    placeholder="password"
                    class="form-control"
                    v-model="password"
                  />
                </div>
                <div class="form-group justify-content-center d-flex">
                  <button type="submit" class="btn btn-primary">Log In</button>
                </div>
              </form>
              <p class="text-center text-muted">Not registered yet?</p>
              <p class="text-center text-muted" @click="$bvModal.hide('login-modal')">
                <router-link to="/register">
                  <a href="#" >
                    <strong>Register now</strong>
                  </a>! It is easy and done in 1 minute and gives you access to special discounts and much more!
                </router-link>
              </p>
            </div>
      </b-modal>
      <!-- MODAL LOGIN  END-->
    </div>
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a href="#" class="navbar-brand home" @click.prevent="testSwal">
          <img
            src="../assets/logo.png"
            style="height: 72px; width: auto"
            alt="Obaju logo"
            class="d-none d-md-inline-block"
          />
          <img
            src="../assets/logo.png"
            style="height: 36px; width: auto"
            alt="Obaju logo"
            class="d-inline-block d-md-none"
          />
          <span class="sr-only">go to homepage</span>
        </a>
        <div class="navbar-buttons">
          <button
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            class="btn btn-outline-secondary navbar-toggler"
          >
            <span class="sr-only">Toggle navigation</span>
            <i class="fa fa-align-justify"></i>
          </button>
          <button
            type="button"
            data-toggle="collapse"
            data-target="#search"
            class="btn btn-outline-secondary navbar-toggler"
          >
            <span class="sr-only">Toggle search</span>
            <i class="fa fa-search"></i>
          </button>
          <a href="#" class="btn btn-outline-secondary navbar-toggler">
            <i class="fa fa-shopping-cart"></i>
          </a>
        </div>
        <div id="navigation" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/" class="nav-link">
                  <a href="#">
                      Home
                  </a>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/products" class="nav-link">
                  <a href="#">
                      Products
                  </a>
                </router-link>
            </li>
          </ul>
          <div class="navbar-buttons d-flex justify-content-end">
            <div id="search-not-mobile" class="navbar-collapse collapse"></div>
            <div id="search-btn" class="navbar-collapse collapse d-none d-lg-block">
                <a href="#" class="btn btn-primary navbar-btn">
                  <i class="fa fa-search"></i>
                  <span>Search</span>
                </a>
            </div>
            <div id="basket-overview" class="navbar-collapse collapse d-none d-lg-block" v-if="$store.state.isLogin">
              <router-link to="/cart" class="nav-link">
                <a href="#" class="btn btn-primary navbar-btn">
                  <i class="fa fa-shopping-cart"></i>
                  <span>{{$store.state.user.carts.length}} items in cart</span>
                </a>
              </router-link>
            </div>
            <div id="logout-btn" class="navbar-collapse collapse d-none d-lg-block" v-if="$store.state.isLogin">
              <a href="#" class="btn btn-primary navbar-btn" @click.prevent="logOut">
                <span>Log Out</span>
                <i class="fa fa-sign-out"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    testSwal () {
      this.$swal.fire(
        'The Internet?',
        'That thing is still around?',
        'error'
      )
    },
    toRegister () {
      this.$router.push('/register')
    },
    logOut () {
      this.$store.commit('LOGOUT')
      this.$router.push('/')
    },
    setLogin () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('login', payload)
        .then(_ => {
          this.$bvModal.hide('login-modal')
          this.email = ''
          this.password = ''
          this.$router.push('/products')
        })
        .catch(({ response }) => {
          this.$swal.fire(
            'Access Denied',
            'wrong email or password',
            'error'
          )
        })
    }
  }
}
</script>

<style scoped>
#top {
  text-align: right;
  width: 100vw
}
</style>
