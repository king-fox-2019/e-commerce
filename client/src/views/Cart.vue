<template>
  <div class="container pt-4">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Product Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cart.products" :key="product._id">
          <td><img :src=product.item.image></td>
          <td>{{ product.item.name }}</td>
          <td>$ {{ product.item.price }}</td>
          <td>
            <div class="black-border text-center">
              <button class="float-right update-btn"
              @click.prevent="addItem(product.item)"
              >
              <span v-if="product.item.stock > product.quantity">+</span>
              </button>
                <span>{{ product.quantity }}</span>
              <button class="float-left update-btn"
                @click.prevent="removeItem(product.item)">-</button>
            </div>

          </td>
          <td>$ {{ product.item.price * product.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <div class="float-right p-4 mx-2 mb-5 black-border custom-height">
      Total Price: $ {{ cartSubtotal }}
      <hr>
      <button class="checkout-btn p-3" @click.prevent="checkout">
        Proceed to Checkout
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'cart',
    created () {
        this.$store.dispatch('fetchCart')
    },
    computed: {
        ...mapState(['cart', 'cartSubtotal'])
    },
    methods: {
      addItem(product) {
          this.$store.dispatch('addToCart', {
              id: product._id,
              quantity: 1
          })
      },
      removeItem(product) {
          this.$store.dispatch('removeItemFromCart', {
              id: product._id,
              quantity: 1
          })
      },
      checkout() {
        this.$store.dispatch('checkout')
          .then(data => {
            this.swal('success', "checkout successful!")
            this.$router.push('/profile')
          })
          .catch(err => {
            this.swal('error', err)
          })
      }
    }
}
</script>

<style scoped>
  img {
    width: 100px;
    height: 100px;
  }

  .black-border {
    border: 2px solid black;
    background-color: white;
  }

  .checkout-btn {
    background-color: black;
    color: white;
  }

  .update-btn {
    border: none;
    background-color: transparent;
  }

  .custom-height {
    max-height: 200px;
  }
</style>