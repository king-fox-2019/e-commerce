<template>
    <v-container class="py-10 my-10">
        <v-row>
            <v-col cols="9">
                <v-simple-table fixed-header>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">Product</th>
                        <th class="text-left">Name</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in cart.products" :key="product._id">
                        <td>
                            <v-img :src="product.item.image"
                            max-height="150" max-width="150"></v-img>
                        </td>
                        <td>{{ product.item.name }}</td>
                        <td>$ {{ product.item.price }}</td>
                        <td>
                            <div class="black-border text-center">
                                <button class="float-right update-btn px-2 py-0"
                                @click.prevent="addItem(product.item)"
                                >
                                <span v-if="product.item.stock > product.quantity">+</span>
                                </button>
                                    <span>{{ product.quantity }}</span>
                                <button class="float-left update-btn px-2 py-0"
                                    @click.prevent="removeItem(product.item)">-</button>
                            </div>
                        </td>
                        <td>$ {{ product.item.price * product.quantity }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col cols="3">
                <p class="mb-3">Total Price: $ {{ cartSubtotal }}</p>
                <v-btn @click.prevent="checkout">Proceed to Checkout</v-btn>
            </v-col>
        </v-row>
    </v-container>
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
    addItem (product) {
      this.$store.dispatch('addToCart', {
        id: product._id,
        quantity: 1
      })
    },
    removeItem (product) {
      this.$store.dispatch('removeItemFromCart', {
        id: product._id,
        quantity: 1
      })
    },
    checkout () {
      this.$store.dispatch('checkout')
        .then(data => {
          this.swal('success', 'checkout successful!')
          this.$router.push('/transactions')
        })
        .catch(err => {
          this.swal('error', err)
        })
    }
  }
}
</script>

<style scoped>
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
