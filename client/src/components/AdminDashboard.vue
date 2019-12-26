<template>
  <div class="container">
    <b-row align-h="between">
      <b-col md="6" lg="4">
        <b-card title="Pending Transaction" align="center">
          <b-card-sub-title sub-title-text-variant="muted">
            There are
            <strong>{{ pendingTransactions.length }}</strong> Pending
            Transaction
          </b-card-sub-title>
          <b-button
            class="mt-3"
            variant="outline-primary"
            to="/admin/transactions"
            >Go to Transactions</b-button
          >
        </b-card>

        <b-card class="mt-3 mt-md-4" title="Total Items" align="center">
          <b-card-sub-title sub-title-text-variant="muted">
            <strong>{{ $store.state.items.length }}</strong> Items <br />
            <strong>{{
              $store.state.items.length > 0
                ? Math.round(
                    $store.state.items.reduce(
                      (total, item) => total + item.stock,
                      0
                    ) / $store.state.items.length
                  )
                : 0
            }}</strong>
            Average stocks per item<br />
            <strong>{{
              $store.state.items.reduce((total, item) => total + item.stock, 0)
            }}</strong>
            Total stocks <br />
          </b-card-sub-title>
          <b-button class="mt-3" variant="outline-primary" to="/admin/items"
            >Go to Items</b-button
          >
        </b-card>
      </b-col>

      <b-col md="6" class="mt-3 mb-5 mt-md-0">
        <b-card>
          <b-card-title class="text-center">Add New Item</b-card-title>
          <b-card-body>
            <b-form @submit.prevent="onAddNewItem" novalidate>
              <b-form-group label="Item Name" label-for="item-name">
                <b-form-input
                  id="item-name"
                  v-model="name"
                  type="text"
                  :state.sync="validateName"
                  @focus="validateName = null"
                  autocomplete="off"
                  required
                  placeholder="Item Name"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Image" label-for="item-image">
                <b-form-file
                  accept="image/*"
                  v-model="imageFile"
                  :state.sync="validateImage"
                  @focus="validateImage = null"
                  required
                ></b-form-file>
              </b-form-group>

              <b-form-group label="Price" label-for="item-price">
                <b-form-input
                  id="item-price"
                  v-model="price"
                  type="text"
                  :state.sync="validatePrice"
                  @focus="validatePrice = null"
                  required
                  @keyup="validateNumber"
                  placeholder="Item Price"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Stock" label-for="item-stock">
                <b-form-input
                  id="item-stock"
                  v-model="stock"
                  type="number"
                  :state.sync="validateStock"
                  @focus="validateStock = null"
                  required
                  placeholder="Item Stock"
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Add Item</b-button>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      imageFile: null,
      imageUrl: '',
      price: '',
      stock: 0,
      validateName: null,
      validateImage: null,
      validatePrice: null,
      validateStock: null
    }
  },
  computed: {
    pendingTransactions() {
      return this.$store.state.admin.transactions.filter(
        t => t.status == 'confirming'
      )
    }
  },
  methods: {
    validateNumber() {
      this.price = this.price.replace(/[^0-9]+/g, '')
    },
    onAddNewItem() {
      const { name, imageUrl, price, stock } = this
      let isValid = true
      if (!name) {
        this.validateName = false
        isValid = false
      }
      if (!imageUrl) {
        this.validateImage = false
        isValid = false
      }
      if (!price) {
        this.validatePrice = false
        isValid = false
      }
      if (isValid) {
        const loader = this.$loading.show()
        this.$store
          .dispatch('ADD_ITEM', { name, image: imageUrl, price, stock })
          .then(({ data }) => {
            this.$toasted.show(data.message)
            this.name = ''
            this.imageUrl = ''
            this.imageFile = null
            this.price = ''
            this.stock = 0
            return this.$store.dispatch('FETCH_ITEMS')
          })
          .catch(({ response }) => {
            this.password = ''
            if (response) {
              const message = response.data.message
              if (typeof message != 'string') {
                response.data.message.forEach(msg => {
                  this.$toasted.show(msg, { className: 'bg-danger' })
                })
              } else {
                this.$toasted.show(response.data.message, {
                  className: 'bg-danger'
                })
              }
            } else {
              this.$toasted.show('Something went wrong', {
                className: 'bg-danger'
              })
            }
          })
          .finally(() => loader.hide())
      }
    }
  },
  watch: {
    imageFile(val) {
      if (val)
        this.$store.dispatch('UPLOAD_IMAGE', val).then(({ data }) => {
          this.imageUrl = data.data.image
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding-top: 5.7rem;
}
</style>
