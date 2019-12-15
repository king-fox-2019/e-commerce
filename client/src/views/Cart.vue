<template>
  <div>
    <v-container id="container">
        <v-sheet
        width="100%"
        height="100%"
        :elevation="elevation"
        :color="color"
        :tile="tile"
        >
            <v-container>
                <v-simple-table :dark="true">
                    <thead>
                        <tr>
                            <th class="text-center">Items</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Amount</th>
                            <th class="text-center">Price per item</th>
                            <th class="text-center">Total</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in listCart" :key="item._id">
                            <td class="text-center"><img :src="item.productId.image"></td>
                            <td class="text-center">{{ item.productId.name }}</td>
                            <td class="text-center">
                                <v-btn class="mx-2" fab dark x-small color="primary" @click.prevent="minAmount(item.productId._id)"><v-icon dark>mdi-minus</v-icon></v-btn>
                                {{ item.amount }}
                                <v-btn class="mx-2" fab dark x-small color="indigo" @click.prevent="addAmount(item.productId._id)"><v-icon dark>mdi-plus</v-icon></v-btn>
                            </td>
                            <td class="text-center"><img src="../assets/img/gold.png" alt="" class="mr-3">{{ item.productId.price }}</td>
                            <td class="text-center"><img src="../assets/img/gold.png" alt="" class="mr-3">{{ item.productId.price*item.amount }}</td>
                            <td class="text-center"><v-btn color="error" @click.prevent="deleteItem(item.productId._id)">Delete</v-btn></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td class="text-center">Sub Total</td>
                            <td class="text-center"><img src="../assets/img/gold.png" alt="" class="mr-3">{{getTotal}}</td>
                            <td class="text-center"><v-btn color="success" @click.prevent="checkOut">Checkout</v-btn></td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-container>
        </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: 'white',
      elevation: 4,
      tile: false
    }
  },
  methods: {
    minAmount (id) {
      this.$store.dispatch('cart/minAmount', id)
        .then(({ data }) => {
          this.$store.dispatch('cart/fetchCart')
        })
        .catch(err => {
          this.$toast.error(`${err.response.data.message}`, 'Error', {
            position: 'topRight'
          })
        })
    },
    addAmount (id) {
      this.$store.dispatch('cart/addAmount', id)
        .then(({ data }) => {
          this.$store.dispatch('cart/fetchCart')
        })
        .catch(err => {
          this.$toast.error(`${err.response.data.message}`, 'Error', {
            position: 'topRight'
          })
        })
    },
    deleteItem (id) {
      this.$toast.question('Are you sure want to delete item?', 'Warning!', {
        close: false,
        overlay: true,
        toastOnce: true,
        id: 'question',
        zindex: 999,
        position: 'center',
        buttons: [
          [
            '<button><b>YES</b></button>',
            function (instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'true')
            },
            true
          ],
          [
            '<button>NO</button>',
            function (instance, toast) {
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'false')
            }
          ]
        ],
        onClosing: (instance, toast, closedBy) => {
          if (closedBy === 'true') {
            this.delete(id)
          }
        },
        onClosed: function (instance, toast, closedBy) {
        }
      })
    },
    delete (id) {
      this.$store.dispatch('cart/deleteItem', id)
    },
    checkOut () {
      let cartData = this.listCart
      let arr = []
      let totalCost = 0
      let listProductId = []
      cartData.forEach(item => {
        if (item.amount > 0) {
          let data = {}
          data.id = item.productId._id
          data.amount = item.amount
          item.cost = item.amount * item.productId.price
          arr.push(item)
          totalCost += item.cost
          listProductId.push(data)
        }
      })
      let payload = {
        listProduct: arr,
        totalCost
      }
      this.$store.dispatch('product/updateCheckout', listProductId)
      this.$store.dispatch('transaction/createTransaction', payload)
        .then(({ data }) => {
          this.$toast.success('Checkout Success!', 'OK', {
            position: 'topRight'
          })
          this.$router.push('/shop')
          this.$store.dispatch('cart/deleteMany')
        })
        .catch(err => {
          this.$toast.error(`${err.response.data.message}`, 'Error', {
            position: 'topRight'
          })
        })
    }
  },
  computed: {
    listCart () {
      let arr = []
      let data = this.$store.state.cart.listCart
      data.forEach(item => {
        if (item.amount > 0) {
          arr.push(item)
        }
      })
      return arr
    },
    getTotal () {
      let cart = this.$store.state.cart.listCart
      let totalCost = 0
      cart.forEach(data => {
        totalCost += (data.productId.price * data.amount)
      })
      return totalCost
    }
  },
  created () {
    this.$store.dispatch('cart/fetchCart')
  }
}
</script>

<style scoped>
#container{
    height: calc(100vh - 64px);
}

.plus-minus{
    cursor: pointer;
    width: 20px;
}

td{
    height: 100px;
}
</style>
