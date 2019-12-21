<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title v-if="!productToEdit">Add Product</md-dialog-title>
            <md-dialog-title v-else>Edit Product</md-dialog-title>

            <md-dialog-content>
                <md-field :class="messageClass">
                    <label>Name</label>
                    <md-input v-model="name" required></md-input>
                    <span class="md-error">Name is required</span>
                </md-field>

                <md-field :class="messageClass">
                    <md-icon>attach_money</md-icon>
                    <label>Price</label>
                    <md-input v-model="price" type="number" required></md-input>
                    <span class="md-error">Price is required</span>
                </md-field>

                <md-field :class="messageClass">
                    <md-icon>attach_money</md-icon>
                    <label>Stock</label>
                    <md-input v-model="stock" type="number" required></md-input>
                    <span class="md-error">Stock is required</span>
                </md-field>

                <md-field :class="messageClass">
                    <label>Image</label>
                    <!-- <md-input v-model="image" required></md-input> -->
                    <md-file accept="image/*" ref='file' />
                    <span class="md-error">Image is required</span>
                </md-field>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary p-2" @click="closeDialog">Close</md-button>
                <md-button class="md-primary p-2" @click.prevent="addProduct" v-if="!productToEdit">Add</md-button>
                <md-button class="md-primary p-2" @click.prevent="editProduct" v-else>Update</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'addProduct',
  props: ['showDialog'],
  data: () => ({
    noError: null,
    name: null,
    price: null,
    stock: null,
    image: null,
    hasMessages: false
  }),
  methods: {
    addProduct () {
      this.image = this.$refs.file.$refs.inputFile.files[0]
      if (this.name == null || this.price == null || this.stock == null || this.image == null) {
        this.hasMessages = true
      } else {
        this.hasMessages = false
        let payload = {
          name: this.name,
          price: this.price,
          stock: this.stock,
          image: this.image
        }
        this.$store.dispatch('addProduct', payload)
          .then(result => {
            this.clearForm()
            this.$emit('closeDialog')
            this.swal('success', 'Success adding product!')
          })
          .catch(err => {
            this.swal('error', err)
          })
      }
    },
    editProduct () {
      if (this.name == null || this.price == null || this.stock == null || this.image == null) {
        this.hasMessages = true
      } else {
        this.hasMessages = false
        this.image = this.$refs.file.$refs.inputFile.files[0]
        let payload = {
          name: this.name,
          price: this.price,
          stock: this.stock,
          image: this.image
        }
        this.$store.dispatch('editProduct', payload)
          .then(result => {
            this.clearForm()
            this.$emit('closeDialog')
            this.swal('success', 'Success updating product!')
          })
          .catch(err => {
            this.swal('error', err)
          })
      }
    },
    clearForm () {
      this.name = null,
      this.price = null,
      this.stock = null,
      this.image = null
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  },
  computed: {
    messageClass () {
      return {
        'md-invalid': this.hasMessages
      }
    },
    ...mapState(['productToEdit'])
  },
  watch: {
    productToEdit () {
      if (this.productToEdit) {
        this.name = this.productToEdit.name,
        this.price = this.productToEdit.price,
        this.stock = this.productToEdit.stock,
        this.image = this.productToEdit.image
      }
    }
  }
}
</script>

<style>

</style>
