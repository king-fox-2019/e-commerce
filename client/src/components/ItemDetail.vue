<template>
<v-container>
    <v-row justify="start" v-if="$store.state.user.session == 'admin'">
        <v-col cols="6">
            <v-row justify="end" class="d-flex flex-column">
                <v-card max-width="400" class="text-center">
                    <v-img class="white--text align-end mt-5" height="200px"
                    :src="showImage" :contain="true" alt="gambar">
                    </v-img>
                    <v-btn color="warning" class="my-3" @click.prevent="uploadImage">Upload Image</v-btn>
                    <v-card-actions>
                        <v-file-input
                        label="File input"
                        filled
                        prepend-icon="mdi-camera"
                        ref="file"
                        v-on:change="fileUploadHandle"
                        ></v-file-input>
                    </v-card-actions>
                </v-card>
            </v-row>
        </v-col>
        <v-col cols="6">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            id="form-product">
                <v-text-field
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Product Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="desc"
                :rules="descRules"
                label="Description"
                required
                ></v-text-field>

                <v-text-field
                v-model="price"
                :rules="priceRules"
                label="Price"
                :value="Number"
                required
                ></v-text-field>

                <v-text-field
                v-model="stock"
                :rules="stockRules"
                label="Stock"
                :value="Number"
                required
                ></v-text-field>

                <v-select
                v-model="category"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
                label="Category"
                required
                ></v-select>

                <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
                ></v-checkbox>

                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                >
                Submit
                </v-btn>

                <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Reset Form
                </v-btn>
            </v-form>
        </v-col>
    </v-row>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374" v-if="$store.state.user.session === 'customer'">
    <v-img height="250" :src="currentItem.image">
    </v-img>
    <v-card-title>{{currentItem.name}}</v-card-title>
    <v-card-text>
      <div class="my-4 subtitle-1 black--text">
        <img src="../assets/img/gold.png" alt=""> {{currentItem.price}}
      </div>
      <div>{{currentItem.desc}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="deep-purple accent-4" @click.prevent="back">
        Back
      </v-btn>
      <v-btn color="success" @click.prevent="addCart(currentItem._id)">Add To Cart</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 20) || 'Name must be less than 20 characters'
    ],
    desc: '',
    descRules: [
      v => !!v || 'Description is required'
    ],
    price: 0,
    priceRules: [
      v => (v > 0) || 'Price must have value more than zero'
    ],
    stock: 0,
    stockRules: [
      v => (v > 0) || 'Beginning stock at least more than zero'
    ],
    category: '',
    items: [
      'basic',
      'attack',
      'defense'
    ],
    image: '',
    showImage: 'https://png2.cleanpng.com/sh/2695d588060fe99a093b733d5ae034ee/L0KzQYm3U8I6N6hAiZH0aYP2gLBuTgF2baR5gdH3LX3kgry0lBhqfJYye9H2cIX3dcO0ifNwdqQye95ycD3kgsW0kgVme6Vuh9C2bXH1e368gfJkQJY8etM9Y0G6R3A5U8A4QGQ4TqMAMkK2QIe9WMM3P2U9RuJ3Zx==/kisspng-question-mark-white-computer-icons-clip-art-question-mark-5abc8e7ba4c177.2307833615223066836748.png',
    checkbox: false
  }),
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.editProduct()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    fileUploadHandle () {
      this.image = this.$refs.file.$refs.input.files[0]
    },
    uploadImage () {
      let formData = new FormData()
      formData.append('image', this.image)
      this.$store.dispatch('product/uploadImage', formData)
        .then(({ data }) => {
          this.showImage = data.image
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
    },
    editProduct () {
      let payload = {
        id: this.$route.params.item,
        data: {
          name: this.name,
          desc: this.desc,
          price: this.price,
          stock: this.stock,
          category: this.category,
          image: this.image
        }
      }
      this.$store.dispatch('product/editProduct', payload)
    },
    back () {
      this.$router.push('/shop')
    },
    addCart (id) {
      let payload = {
        id
      }
      this.$store.dispatch('cart/addCart', payload)
        .then(({ data }) => {
          this.$store.dispatch('cart/fetchCart')
          this.$toast.success(`Add ${name} to cart!`, 'OK', {
            position: 'topCenter'
          })
        })
        .catch(err => {
          this.$toast.error(`${err.response.data.message}`, 'Error', {
            position: 'topRight'
          })
        })
    }
  },
  computed: {
    currentItem () {
      return this.$store.state.product.currentProduct
    }
  },
  created () {
    let id = this.$route.params.item
    let payload = {
      id
    }
    this.$store.dispatch('product/getOneProduct', payload)
      .then(({ data }) => {
        this.name = data.name
        this.desc = data.desc
        this.price = data.price
        this.stock = data.stock
        this.category = data.category
        this.image = data.image
        this.showImage = data.image
        this.$store.commit('product/SET_CURRENT_PRODUCT', data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
#col1{
    border: 5px solid white;
}

#form-product{
    background-color: white;
    padding: 50px;
}
</style>
