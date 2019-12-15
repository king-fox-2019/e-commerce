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
        <v-btn text class="mx-4" v-if="isLogin"><span class="grey--text darken-3" @click.prevent="$router.push('/transaction')">Transaction</span></v-btn>
        <v-btn text class="mx-4" v-if="isLogin && role == 'admin'"><span class="grey--text darken-3" @click.prevent="$router.push('/admin')">Admin Page</span></v-btn>
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
          v-if="isLogin"
        >
          <template v-slot:badge>
          <span>{{cartItem}}</span>
          </template>
          <a href="" class="mr-5" v-if="isLogin" @click.prevent="openCart"><span><i class="fas fa-shopping-cart" style="font-size: 20px;"></i></span></a>
        </v-badge>
        <v-menu offset-y v-if="isLogin && role == 'customer'" class="mr-2">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" text>
              {{ getUser }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              Gold : {{getGold}}
            </v-list-item>
            <v-list-item>
              <v-btn color="primary">Wishlist</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn color="red lighten-2" dark @click.stop="dialog = true">
                Top Up Gold
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn color="error" v-if="isLogin" @click.prevent="logout">
            Logout
        </v-btn>
      </template>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Top Up Balance Gold
          </v-card-title>

          <v-card-text>
            <v-text-field v-model="gold" placeholder="Input your gold" type="Number">
            </v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="closeDialog">
              Cancel
            </v-btn>

            <v-btn color="green darken-1" text @click.prevent="topUp">
              Top Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      collapse: true,
      bg: true,
      overlap: true,
      bottom: false,
      color: 'warning lighten-2',
      left: false,
      gold: 0
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
      this.$toast.question('Are you sure want to logout? We will delete your item in your Cart', 'Warning!', {
        close: false,
        overlay: true,
        toastOnce: true,
        id: 'question',
        zindex: 999,
        position: 'center',
        buttons: [
          [
            '<button><b>YES</b></button>',
            function (instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'true')
            },
            true
          ],
          [
            '<button>NO</button>',
            function (instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'false')
            }
          ]
        ],
        onClosing: (instance, toast, closedBy) => {
          if (closedBy === 'true') {
            this.logoutProcess()
          }
        },
        onClosed: function (instance, toast, closedBy) {
        }
      })
    },
    logoutProcess () {
      this.$store.dispatch('cart/deleteMany', localStorage.getItem('token'))
      this.$toast.success('Logout Success!', 'OK', {
        position: 'topRight'
      })
      localStorage.clear()
      this.$store.dispatch('user/checkLogin')
      this.$router.push('/')
    },
    openCart () {
      this.$router.push('/cart')
    },
    topUp () {
      this.$store.dispatch('user/topUp', this.gold)
        .then(({ data }) => {
          console.log('masuk then')
          this.$store.commit('user/SET_USER_GOLD', data.balance)
          this.$toast.success('Top Up Gold Success!', 'OK', {
            position: 'topRight'
          })
          this.closeDialog()
        })
        .catch(err => {
          this.$toast.error(`${err.response.data.message}`, 'Error', {
            position: 'topRight'
          })
        })
    },
    closeDialog () {
      this.dialog = false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.user.isLogin
    },
    role () {
      return this.$store.state.user.session
    },
    cartItem () {
      let item = this.$store.state.cart.listCart
      return item.length
    },
    getUser () {
      return localStorage.getItem('user')
    },
    getGold () {
      return this.$store.state.user.gold
    }
  },
  created () {
    this.$store.dispatch('cart/fetchCart')
  }
}
</script>

<style>
</style>
