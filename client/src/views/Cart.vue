<template>
  <div class="container">
    <div id="basket">
      <div class="box">
        <form method="post" action="#">
          <h1>Shopping cart</h1>
          <p class="text-muted">You currently have {{$store.state.user.carts.length}} item(s) in your cart.</p>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th colspan="2">Product</th>
                  <th>Quantity</th>
                  <th>Unit price</th>
                  <th>Discount</th>
                  <th colspan="2">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cart in $store.state.user.carts" :key="cart._id">
                  <td  colspan="2">
                    <a href="#">{{cart.productName}}</a>
                  </td>
                  <td>{{cart.quantity}}</td>
                  <td>${{cart.productPrice}}.00</td>
                  <td>$0.00</td>
                  <td>${{cart.quantity * cart.productPrice}}.00</td>
                  <td>
                    <a href="#" @click.prevent="removeCart(cart._id)">
                      <i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="5">Total</th>
                  <th colspan="2">${{$store.state.totalCart}}.00</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- /.table-responsive-->
          <div class="box-footer d-flex justify-content-between flex-column flex-lg-row">
            <div class="left">
              <router-link to="/products">
                <a href="#" class="btn btn-outline-secondary">
                  <i class="fa fa-chevron-left"></i> Continue shopping
                </a>
              </router-link>
            </div>
            <div class="right">
              <button class="btn btn-primary">
                Proceed to checkout
                <i class="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'Cart',
  created () {
    this.$store.commit('SUM_CART')
  },
  methods: {
    removeCart (id) {
      axios({
        method: 'DELETE',
        url: `/user/cart/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchUser')
        })
        .catch(err => {
          this.$swal.fire(
            'sumting wong',
            err,
            'error'
          )
        })
    }
  }
}
</script>

<style>
</style>
