<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-button class="md-primary md-raised p-3" @click="showDialog = true">Add a Product</md-button>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">List of Products</h4>
            <!-- <p class="category">Click to edit product</p> -->
          </md-card-header>
          <md-card-content>
            <simple-table table-header-color="green"
            @editProduct="editProduct"
            ></simple-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <AddProduct :showDialog="showDialog" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import SimpleTable from '@/components/admin/Products/SimpleTable.vue'
import AddProduct from '@/components/admin/Products/AddProduct.vue'

export default {
  name: 'productList',
  components: {
    SimpleTable,
    AddProduct
  },
  data: () => ({
    showDialog: false
  }),
  methods: {
    closeDialog () {
      this.showDialog = false
      this.$store.commit('SET_EDIT_PRODUCT_TO_NULL')
    },
    editProduct () {
      this.showDialog = true
    }
  }
}
</script>

<style>
</style>
