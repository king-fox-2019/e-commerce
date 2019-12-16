<template>
<v-content>
  <v-container>
    <v-list two-line>
      <template v-for="(product, index) in printCart">
        <v-list-tile :key="product._id">
          <v-list-tile-avatar>
            <img :src="product.ProductId.image">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title><h2>{{ product.ProductId.name }}</h2></v-list-tile-title>
            <br>
            <v-list-tile-sub-title ><h4>{{ product.ProductId.description }}</h4></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-text-field label="Quantity" reverse :value="product.quantity"></v-text-field>
          </v-list-tile-action>

          <v-list-tile>
            Rp.{{product.ProductId.price * product.quantity}},-
          </v-list-tile>

        <v-divider v-if="index + 1 < printCart.length" :key="index"></v-divider>
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
    },
    deleteCart: function () {
      axios({
        url: `${this.$store.state.baseUrl}/users/cart`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          console.log('masuk delete')
          this.$store.commit('setDelete')
        })
        .catch(err => {
          this.error = err
        })
    }
  },
  computed: {
    ...mapState(['printCart'])
  }
}
</script>

<style scoped>
</style>
