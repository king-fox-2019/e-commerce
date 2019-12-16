<template>
  <div>
    <div
      class="ui container special cards grid"
      style="margin-top:50px;margin-bottom:50px;text-align:center"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="four wide column card"
        style="padding:0px;  width: 23.7% !important;border-radius:0px"
      >
        <div class="blurring dimmable image">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <div class="ui inverted button">Add Friend</div>
              </div>
            </div>
          </div>
          <img style="height:300px" :src="product.image" />
        </div>
        <div class="content">
          <a @click.prevent="toDetailItem(product._id)" class="header">
            {{
            product.name
            }}
          </a>
          <div class="meta">
            <span class="date">Price : {{ rupiahFormatMoney[product._id] }}</span>
          </div>
          <div class="meta">
            <span class="date">Stock : {{ product.stock }}</span>
          </div>
        </div>
        <div class="extra content">
          <a @click.prevent="addToCart(product)">
            <i class="cart arrow down icon"></i>
            Add to cart
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import convertRupiah from 'rupiah-format'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      item: null,
      qty: 0
    }
  },
  methods: {
    toDetailItem (id) {
      this.$router.push(`/products/detail/${id}`)
    },
    checkLogin () {
      const access = this.onSession
      if (!access) {
        this.$router.push('/signin')
      }
    },
    addToCart (item) {
      this.checkLogin()
      const qty = 1
      const isAvailable = Number(item.stock) - qty >= 0
      if (isAvailable) {
        const command = 'add'
        const payload = {
          item,
          qty,
          command
        }
        this.$store
          .dispatch('updateCart', payload)
          .then(data => {
            this.$store.dispatch('fetchCartUser')
            this.$store.dispatch('fetchProducts')
            Swal.fire('Success!', data.message, 'success')
          })
          .catch(err => {
            const message = err.response.data.message
            Swal.fire('Oops...', message, 'error')
          })
      } else {
        Swal.fire({
          title: 'Warning!',
          text: 'The item you want is currently not available.',
          icon: 'warning',
          confirmButtonColor: '#3085d6'
        })
      }
    }
  },
  computed: {
    rupiahFormatMoney () {
      const products = this.products
      const prices = {}
      products.forEach(product => {
        prices[product._id] = convertRupiah.convert(product.price)
      })
      return prices
    },
    ...mapState(['products', 'onSession'])
  },
  created () {
    this.$store.dispatch('fetchProducts')
  }
}
</script>

<style></style>
