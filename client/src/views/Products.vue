<template>
  <v-content>
    <v-container fluid>
      <v-layout row wrap align="center">
        <template v-for="(product, index) in this.$store.state.products">
          <v-flex xs2 pa-1 :key="index" :product="product">
            <v-hover>
              <v-card slot-scope="{hover}" class="mx-auto" color="gray lighten-4" max-width="600" height="350">
                <v-img :src="product.image" :aspect-ratio="16/9">
                  <v-expand-transition>
                    <div v-if="hover" class="d-flex transition-fast-in-fast-out orange draken-2 display-3 v-card--reveal display3 black--text" style="height: 100%;">
                      {{product.price}}
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-card-text class="pt-4" style="position: relative;">
                  <v-btn absolute color="orange" class="white--text" fab medium right top @click.prevent="addToCart(product)">
                    <v-icon>shopping_cart</v-icon>
                  </v-btn>
                  <div class="font-weight-light grey--text title mb-2">{{product.category}}</div>
                  <h5 class="display-1 font-weight-light orange--text mb-2" @click.prevent="detail(product._id)" style="cursor: pointer">{{product.name}}</h5>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>

import { mapState } from 'vuex'
// import axios from 'axios'

export default {
  name: 'Products',
  data () {
    return {
    }
  },
  methods: {
    detail: function (id) {
      this.$router.push(`/products/${id}`)
    },
    addToCart: function (product) {
      let duplicate = false
      if (!localStorage.getItem('access_token')) {
        this.$router.push('/login')
      } else {
        this.cart.forEach(element => {
          if (element.ProductId === product._id) {
            duplicate = true
          }
        })
        if (!duplicate) {
          let obj = {
            ProductId: product._id,
            quantity: 1
          }
          this.$store.commit('setAddToCart', obj)
          console.log('masuk tanpa duplikat')
          // this.success = 'Product successfully added to cart'
        } else if (duplicate) {
          this.$store.commit('setUpdateCart', product._id)
          console.log('masuk ada duplikat')
          // this.success = 'Product successfully added to cart'
        }
      }
    }
    // addToCart: function (id) {
    //   let duplicate = false
    //   let stock
    //   if (!localStorage.getItem('access_token')) {
    //     this.$router.push('/login')
    //   } else {
    //     this.cart.forEach(element => {
    //       if (element.ProductId === id) {
    //         duplicate = true
    //       }
    //     })
    //     axios({
    //       url: `${this.$store.state.baseUrl}/products/${id}`,
    //       method: 'GET',
    //       headers: {
    //         access_token: localStorage.getItem('access_token')
    //       }
    //     })
    //       .then(({ data }) => {
    //         if (data.stock > 0) {
    //           stock = data.stock - 1
    //           axios({
    //             method: 'PATCH',
    //             url: `${this.$store.state.baseUrl}/products/${data._id}`,
    //             data: {
    //               stock: stock
    //             }
    //           })
    //             .then(({ data }) => {
    //               console.log(data)
    //             })
    //             .catch(err => {
    //               this.error = err
    //             })
    //           if (!duplicate) {
    //             let obj = {
    //               ProductId: id,
    //               quantity: 1
    //             }
    //             this.$store.commit('setAddToCart', obj)
    //             // this.success = 'Product successfully added to cart'
    //           } else if (duplicate) {
    //             this.$store.commit('setUpdateCart', id)
    //             // this.success = 'Product successfully added to cart'
    //           }
    //         } else {
    //           // this.error = 'Unsufficient stock'
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   }
    // }
  },
  created: function () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    ...mapState(['cart'])
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.v-card h3.display-1 {
  font-size: 24px !important;
}
</style>
