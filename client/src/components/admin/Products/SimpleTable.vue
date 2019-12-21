<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head>Price</md-table-head>
        <md-table-head>Stock</md-table-head>
        <md-table-head>Image</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="product in products" :key="product._id">
        <md-table-cell md-label="Name">{{ product.name }}</md-table-cell>
        <md-table-cell md-label="Price">$ {{ product.price }}</md-table-cell>
        <md-table-cell md-label="Stock">{{ product.stock }}</md-table-cell>
        <md-table-cell md-label="Image">
          <img :src="product.image" />
        </md-table-cell>
        <md-table-cell md-label="Actions">
          <md-button class="md-fab md-mini mr-3" @click.prevent="editProduct(product)">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-fab md-mini" @click.prevent="deleteProduct(product._id)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'simple-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
        .then(data => {
          this.swal('success', 'Product deleted successfully!')
        })
        .catch(err => {
          this.swal('error', err)
        })
    },
    editProduct (product) {
      this.$emit('editProduct')
      this.$store.commit('SET_PRODUCT_TO_EDIT', product)
    }
  },
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    ...mapState(['products'])
  }
}
</script>

<style>
.md-ripple {
  padding: 0 !important;
}
</style>

<style scoped>
img {
  max-height: 120px;
  width: auto
}
</style>
