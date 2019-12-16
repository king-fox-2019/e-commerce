<template>
<v-content>
  <v-container>
    <v-list two-line>
      <template v-for="(product, index) in carts">
        <v-list-tile :key="product._id">
          <v-list-tile-avatar>
            <img :src="product.image">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="product.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="product.description"></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile>
            {{product.price}}
          </v-list-tile>

          <v-list-tile-action>
            <v-text-field label="Quantity" reverse :value="product.quantity"></v-text-field>
          </v-list-tile-action>

          <v-list-tile>
            {{product.price * product.quantity}}$
          </v-list-tile>

        <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>
        </v-list-tile>
      </template>
    </v-list>

    <v-container>
      <v-btn color="red" larger style="float: right;" @click.prevent="deleteCart">Empty cart</v-btn>
      <v-btn color="success" larger style="float: right;" @click.prevent="checkout">Finish payment</v-btn>
    </v-container>
  </v-container>
  </v-content>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'Cart',
  data: () => ({
  }),
  methods: {
    checkout: function () {
      axios({
        url: `${this.$store.state.baseUrl}/users/cart`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          products: this.cart
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          this.error = err
        })
    },
    deleteCart: function () {
      axios({
        url: `${this.$store.state.baseUrl}/users/updateCart`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          this.error = err
        })
      axios({
        url: `${this.$store.state.baseUrl}/users/cart`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  computed: {
    ...mapState(['cart'])
  }
}
</script>

<style scoped>
</style>
