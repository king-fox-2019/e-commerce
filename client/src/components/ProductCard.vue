<template>
  <v-content>
    <v-img :src="product.image" :aspect-ratio="16/9"></v-img>
    <h1> {{product.name}} </h1>
    <br>
    <h3> {{product.description}} </h3>
    <br>
    <h4> Price: {{product.price}} </h4>
    <h4> In stock: {{product.stock}} </h4>
    <br>
    <v-btn color="red" @click.prevent="addToCart(product._id)" id="add">Add To Cart</v-btn>
  </v-content>
</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'ProductCard',
  data () {
    return {
      product: ''
    }
  },
  methods: {
    addToCart: function (id) {
      let duplicate = false
      let stock
      if (!localStorage.getItem('access_token')) {
        this.$router.push('/login')
      } else {
        this.cart.forEach(element => {
          if (element.ProductId === id) {
            duplicate = true
          }
        })
        axios({
          url: `${this.$store.state.baseUrl}/products/${id}`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            if (data.stock > 0) {
              stock = data.stock - 1
              axios({
                method: 'PATCH',
                url: `${this.$store.state.baseUrl}/products/${data._id}`,
                data: {
                  stock: stock
                }
              })
                .then(({ data }) => {
                  console.log(data)
                })
                .catch(err => {
                  this.error = err
                })
              if (!duplicate) {
                let obj = {
                  ProductId: id,
                  quantity: 1
                }
                this.$store.commit('setAddToCart', obj)
                // this.success = 'Product successfully added to cart'
              } else if (duplicate) {
                this.$store.commit('setUpdateCart', id)
                // this.success = 'Product successfully added to cart'
              }
            } else {
              // this.error = 'Unsufficient stock'
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  created: function () {
    axios({
      url: `${this.$store.state.baseUrl}/products/${this.$route.params.id}`,
      method: 'GET',
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(({ data }) => {
        console.log(data)
        this.product = data
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    ...mapState(['cart'])
  }
}
</script>

<style scoped>
#add {
  margin-left: 40%
}
</style>
