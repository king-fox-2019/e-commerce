<template>
  <div>
    <v-container class="py-10 my-10">
      <h1>Products</h1>
     <v-row>
        <v-col cols="3"
          v-for="product in products"
          :key="product._id"
        >
          <v-card outlined @click="productDetail(product)">
            <v-img
              :src="product.image"
              class="black--text align-end"
              height="300px"
            >
              <v-card-title v-text="product.name"></v-card-title>
            </v-img>
  
            <v-card-actions>
              <v-btn text>
                $ {{product.price}}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text v-if="product.stock > 0">
                SEE DETAIL
              </v-btn>
              <v-btn text v-else color="red">
                OUT OF STOCK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'productList',
  data: () => ({

  }),
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    productDetail (productDetail) {
      this.$router.push({
        name: 'product',
        params: {
          id: productDetail._id,
          productDetail
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
