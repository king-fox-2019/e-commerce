<template>
  <div class="about">
    <h1> YOUR CART</h1>
    <hr>
    <!-- {{carts}} -->
    <div class="is-divider" data-content="OR"></div>

    <div v-if="carts.length > 1">
    <div class="detil" v-for="(cart, index) in carts" :key="index" >
      <DetailCart :cart="cart" @remove="getAllCart" />
    </div>
    <div>
      <button class="button is-black" style="margin-bottom: 20px;" @click="checkout">checkout</button>
    </div>
    </div>

    <div v-if="carts.length === 0">
      <div style="font-family: 'Josefin Sans', sans-serif; font-size: 20px;">There is no product in your cart</div>
    </div>
  </div>
</template>

<script>
import DetailCart from '../components/DetailCart'
export default {
  name: 'cart',
  data: function () {
    return {
      carts: []
    }
  },
  components: {
    DetailCart
  },
  methods: {
    getAllCart () {
      this.axios.get('/carts', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'data cart')
          this.carts = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkout () {
      let body = {
        carts: this.carts,
        total: this.totalBill
      }
      this.axios.post('/transactions', body, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, 'bawa apa sehabis checkout')
          this.$router.push('/transaction')
        })
        .catch(console.log)
    }
  },
  created () {
    // console.log(this.$route)
    this.getAllCart()
  },
  computed: {
    totalBill () {
      let result = 0
      this.carts.forEach(cart => {
        // console.log(cart, "mau bikin total billing dong, ini apa? ");
        // console.log(cart.amount * cart.product.price, "satuan harga total barang");
        result += cart.amount * cart.product.price
        console.log(result)
      })
      return result
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Gelasio&display=swap');
@import url('https://fonts.googleapis.com/css?family=Abel|Barlow|Josefin+Sans|Varela+Round&display=swap');

h1 {
  font-size: 37px;
  padding-bottom: 20px;
  font-weight: 10;
  font-family: 'Gelasio', serif;
  letter-spacing: 4px;
  text-align: left;
  margin-left: 12vw;
}

.detil {
  width: 1600px;
  margin: auto;
}

hr {
  width: 75vw !important;
  border: 1px solid rgb(226, 221, 221) !important;
  margin-left: 12%;
}

.button {
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
  border-radius: 0 !important;
  font-size: 14px !important;
  padding-top : 15px 32px;
  text-align: center;
  width: 9%;
  height: 42px !important;
}
</style>
