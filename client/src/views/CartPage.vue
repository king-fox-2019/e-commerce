<template>
  <div class="pb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
          <div class="d-flex justify-content-center mt-4 mb-4" style="font-size: 250%; background-color: aquamarine;">
          Your Cart
          </div>
          <!-- Shopping cart table -->
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="border-0 bg-light">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                  <th scope="col" class="border-0 bg-light">
                    <div class="py-2 text-uppercase">Remove</div>
                  </th>
                </tr>
              </thead>
              <CartItem v-for="item in this.$store.state.cart" :key="item.id" :ItemInCart="item"></CartItem>
            </table>
            <div class="d-flex justify-content-between" style="font-size: 200%">
              <div>Subtotal:</div>
              <div>Rp. {{ calculateSubtotal }}</div>
            </div>
            <hr>
            <div style="display: flex; justify-content: space-between;">
              <b-button variant="success" @click.prevent="goBack"> <i class="fas fa-arrow-circle-left"></i> Back </b-button>
              <b-button variant="warning" @click.prevent="createTransaction"> <i class="fas fa-money-check-alt"></i> Checkout <i class="fas fa-arrow-alt-circle-right"></i> </b-button>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem'
export default {
  name: 'CartPage',
  components: {
    CartItem
  },
  data () {
    return {
      subtotal: 0
    }
  },
  methods: {
    createTransaction () {
      this.$store.dispatch('createTransaction')
    },
    goBack () {
      this.$router.push('/')
    }
  },
  created () {
    this.$store.dispatch('viewCart')
    // this.calculateSubtotal()
  },
  computed: {
    calculateSubtotal () {
      let totalPrice = 0
      this.$store.state.cart.forEach(item => {
        totalPrice += item.quantity * item.product_id.price
      })
      return totalPrice
    }
  }
}
</script>

<style>
.pb-5 {
  height: 100vh;
  overflow: scroll;
}
</style>
