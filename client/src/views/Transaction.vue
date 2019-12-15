<template>
  <div class="Cart">
      <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">Transaction History</h2>
      <br>
      <div class="container">
        <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Items</th>
            <th scope="col">Sub Price</th>
            <th scope="col">Delivery Fee</th>
            <th scope="col">Total Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart) in carts" :key="cart.id">
            <td> {{ cart.updatedAt.split('T')[0] }}</td>
            <td scope="row">
              <div v-for="(item,i) in cart.itemId" :key="i">
              <b>{{ item.name }}</b>
              <br>
              Rp.{{ item.price }}
              <br>
              <img :src="`${item.image}`" alt="" border=3 height=200 width=150>
              </div>
            </td>
            <td>{{ cart.price }}</td>
            <td>{{ cart.ongkir }}</td>
            <td>{{ cart.totalPrice }}</td>
            <td>
            <button v-if="cart.status == 'pending'" type="button" @click="delivered(cart._id)" class="btn btn-secondary mr-1">Received</button>
            </td>
          </tr>
        </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import myAxios from '@/configs/myAxios.js'

export default {
  name: 'Transaction',
  components: {
    Navbar
  },
  data () {
    return {
      carts: [],
      id: ''
    }
  },
  methods: {
    delivered (id) {
      myAxios({
        method: 'put',
        url: `/click/carts/transaction/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.fetchCart()
        })
        .catch(err => {
          let error = ``
          for (let i = 0; i < err.length; i++) {
            error += err[i] + `, `
          }
          this.$swal('error', error, 'error')
        })
    },
    fetchCart () {
      myAxios({
        method: 'get',
        url: '/click/carts/transaction',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.carts = data
          console.log(data, '*****************')
        })
        .catch(err => {
          let error = ``
          for (let i = 0; i < err.length; i++) {
            error += err[i] + `, `
          }
          this.$swal('error', error, 'error')
        })
    },
    saveId (id) {
      this.id = id
    }
  },
  created () {
    this.fetchCart()
  }

}
</script>

<style scoped>
.modal-content {
  top: 30vh !important;
}
</style>
