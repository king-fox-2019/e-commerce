<template>
  <div id="item-detail">
    <div class="row justify-content-between" id="item-wrapper">
      <div class="col-12 col-md-5">
        <div class="mx-md-0 ml-md-5 mx-3  my-3">
          <b-img class="border" :src="item.image" fluid-grow rounded></b-img>
        </div>
      </div>
      <div class="col p-0">
        <div class="my-3" style="margin-left: 2.4rem;">
          <h1 class="mb-0">{{ item.name }}</h1>
          <p class="text-muted mb-4">Stock left: {{ item.stock }}</p>
          <h3 class="text-danger">{{ item.price | formatCurrency }}</h3>
          <b-button class="mr-2" variant="outline-danger" id="delete-item"
            >Delete</b-button
          >
          <b-button variant="primary" @click="onUpdate = true"
            >Update Item</b-button
          >

          <b-popover target="delete-item" triggers="click blur" placement="top">
            <template v-slot:title>Are you sure?</template>
            <p>This can't be undone</p>
            <b-button
              class="text-center"
              variant="outline-danger"
              @click="deleteItem"
              >Delete Item</b-button
            >
          </b-popover>
        </div>
      </div>

      <b-col md="6" class="mt-3 mb-5 ml-0 mx-3 ml-md-5" v-if="onUpdate">
        <b-card>
          <b-card-title class="text-center">Update Item</b-card-title>
          <b-card-body>
            <b-form @submit.prevent="updateItem" novalidate>
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

              <b-button
                class="mr-2"
                type="submit"
                variant="outline-secondary"
                @click="onUpdate = false"
                >Cancel</b-button
              >
              <b-button type="submit" variant="primary">Update</b-button>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      item: {},
      amount: 1,
      isLoading: '',
      price: '',
      stock: 0,
      validatePrice: null,
      validateStock: null,
      onUpdate: false
    }
  },
  computed: {
    onSession() {
      return this.$store.state.user.onSession
    }
  },
  methods: {
    validateNumber() {
      this.price = this.price.replace(/[^0-9]+/g, '')
    },
    updateItem() {
      const { id, price, stock } = this
      let isValid = true
      if (!price) {
        this.validatePrice = false
        isValid = false
      }
      if (isValid) {
        let loader = this.$loading.show()
        this.$store
          .dispatch('ON_UPDATE_ITEM', { id, price, stock })
          .then(({ data }) => {
            this.$toasted.show(data.message)
            this.$store
              .dispatch('FETCH_ADMIN_ITEM_DETAIL', this.id)
              .then(({ data }) => {
                this.item = data.data
              })
            this.onUpdate = false
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
    },
    deleteItem() {
      let loader = this.$loading.show()
      this.$store
        .dispatch('ON_DELETE_ITEM', this.id)
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.$router.replace('/admin/items')
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
  },
  watch: {
    onUpdate(val) {
      if (val) {
        const { price, stock } = this.item
        this.price = price
        this.stock = stock
      } else {
        this.price = ''
        this.stock = 0
      }
    }
  },
  created() {
    this.$store
      .dispatch('FETCH_ADMIN_ITEM_DETAIL', this.id)
      .then(({ data }) => {
        this.item = data.data
      })
  }
}
</script>

<style lang="scss">
#item-detail {
  height: 100%;

  #item-wrapper {
    padding-top: 5.7rem;
  }
}
</style>
