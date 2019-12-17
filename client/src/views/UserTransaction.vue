<template>
  <div class="Cart">
      <Navbar/>
      <br>
      <br>
      <br>
      <br>
      <h2 style="text-align: center;">All Transaction</h2>
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
            <th scope="col">Customer</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart) in carts" :key="cart.id">
            <td>{{ cart.updatedAt.split('T')[0] }}</td>
            <td scope="row">
              <div v-for="(item,i) in cart.itemId" :key="i">
              <b>{{ item.name }}</b>
              <br>
              Rp.{{ item.price }}
              <br>
              <img :src="`${item.image}`" alt="" border=3 height=200 width=150>
              </div>
            </td>
            <td>Rp.{{ cart.price }}</td>
            <td>Rp.{{ cart.ongkir }}</td>
            <td>Rp.{{ cart.totalPrice }}</td>
            <td>{{ cart.userId.name }} <br><i>{{ cart.userId.email}}</i></td>
            <td>{{ cart.status }}</td>
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
  name: 'UserTransaction',
  components: {
    Navbar
  },
  data () {
    return {
      carts: ''
    }
  },
  methods: {
    fetchCart () {
      myAxios({
        method: 'get',
        url: '/click/carts/transaction/admin',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.carts = data.carts
          console.log(data.carts)
        })
        .catch(err => {
          this.$swal('error', err.response.data.error[0].message, 'error')
        })
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
