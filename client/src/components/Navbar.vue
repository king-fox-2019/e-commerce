<template>
  <div>
    <v-toolbar
      :collapse-on-scroll="collapse"
      src="../assets/img/header.png"
    >
      <v-toolbar-title>
          <img src="../assets/img/dota2.png">
      </v-toolbar-title>

      <v-spacer></v-spacer>

    <div>
      <v-toolbar-items>
        <v-btn text class="mx-4" @click.prevent="moveStory"><span class="grey--text darken-3">Story</span></v-btn>
        <v-btn text class="mx-4"><span class="grey--text darken-3">Heropedia</span></v-btn>
        <v-btn text class="mx-4"><span class="grey--text darken-3" @click.prevent="$router.push('/shop')">Shop</span></v-btn>
      </v-toolbar-items>
    </div>

    <v-spacer></v-spacer>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn color="success" @click.prevent="moveLogin" v-if="!isLogin">Login
        </v-btn>
        <v-btn color="warning" @click.prevent="moveRegister" class="mx-3" v-if="!isLogin">
            Register
        </v-btn>
        <v-badge
          :bottom="bottom"
          :color="color"
          :left="left"
          :overlap="overlap"
          class="align-self-center mr-8"
        >
          <template v-slot:badge>
          <span>{{cartItem}}</span>
          </template>
          <a href="" class="mr-5" v-if="isLogin" @click.prevent="openCart"><span><i class="fas fa-shopping-cart" style="font-size: 20px;"></i></span></a>
        </v-badge>
        <v-btn color="error" v-if="isLogin" @click.prevent="logout">
            Logout
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collapse: true,
      bg: true,
      overlap: true,
      bottom: false,
      color: 'warning lighten-2',
      left: false
    }
  },
  methods: {
    moveLogin () {
      this.$router.push('/user-control/login')
    },
    moveRegister () {
      this.$router.push('/user-control/register')
    },
    moveStory () {
      this.$router.push('/')
    },
    logout () {
      localStorage.clear()
      this.$store.dispatch('user/checkLogin')
      this.$toast.success('Logout Success!', 'OK', {
        position: 'topRight'
      })
    },
    openCart () {
      this.$router.push('/cart')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.user.isLogin
    },
    cartItem () {
      let item = this.$store.state.cart.listCart
      return item.length
    }
  },
  created () {
    this.$store.dispatch('cart/fetchCart')
  }
}
</script>

<style>
</style>
