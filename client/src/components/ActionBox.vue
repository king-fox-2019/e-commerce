<template>
  <b-form 
    class="d-flex justify-content-center text-center"
    @submit.prevent="addCart(prod._id)"
  >
    <b-form-group
      label="Quantity"
      label-for="input-qty"
    >
      
      <b-form-input
        id="input-qty"
        type="number"
        min="1"
        :max="prod.stock"
        v-model="amount"
      ></b-form-input>  
        <b-button
          class="action-btn my-1"
          variant="info"
          type="submit"
        >Add to Cart
        </b-button>
        <br>
        <b-button
          class="action-btn"
          v-b-popover.hover.top="prod.description"
          variant="info"
          title="Description">
          Details
        </b-button>
    </b-form-group>					
  </b-form>
</template>

<script>
import axios from '../../apis/server'
import Swal from 'sweetalert2'
export default {
  name: 'ActionBox',
  props: ['prod'],
  data () {
    return {
      amount: 1
    }
  },
  methods: {
    addCart (productId) {
      Swal.fire({
        title: 'Add to Cart',
        text: "Add item to cart?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
        .then(result => {
          if (result.value) {
            axios({
            method: 'post',
            url: '/cart',
            data: {
              productId,
              amount: Number(this.amount)
            },
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(item => {
              Swal.fire({
                text: 'Successfully added to cart',
                icon: 'success'
              })
              this.$store.dispatch('fetchProducts')
            })
            .catch(err => {
              Swal.fire({
                title: 'Oops',
                text: err,
                icon: 'error'
              })
            })
          }
        })
    }
  }
}
</script>

<style>
.qty {
 font-size: 10px !important
}

.action-btn {
 font-size: 11px !important
}
</style>
