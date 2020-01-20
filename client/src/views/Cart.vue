<template>
  <b-container style="width: 60%">
    <h2>Review Cart</h2>
    <CartCard @removeCart="removeCart(item)" v-for="item in cart" :key="item.id" :item="item"></CartCard>
    <b-row>
      <b-col>
        <h3 class="float-right">Total: Rp. {{ totalPrice }}</h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from '../../apis/server'
import Swal from 'sweetalert2'
import CartCard from '../components/CartCard'
export default {
  name: 'Cart',
  components: {
    CartCard
  },
  data () {
    return {
      cart: []
    }
  },
  methods: {
    fetchCart () {
      axios({
				method: 'get',
				url: '/cart',
				headers: {
					access_token: localStorage.getItem('access_token')
				}
			})
        .then(({ data }) => {
          this.cart = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeCart (item) {
      Swal.fire({
        title: 'Remove Item',
        text: "Are you sure that you want to remove this item?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
        .then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `/cart/${item._id}`,
            data: {
              amount: item.amount
            },
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(({ data }) => {
              this.fetchCart()
              Swal.fire({
                icon: 'success',
                text: 'Successfully deleted'
              })
            })
            .catch(err => {
              Swal.fire({
                icon: 'error',
                text: err
              })
            })
        }
      })
    }
  },
  created () {
    this.fetchCart()
  },
  computed: {
    totalPrice () {
      let total = 0
      this.cart.forEach(item => {
        total += item.amount * item.productId.price
      })
      return total
    }
  }
}
</script>

<style>

</style>