<template>
  <div>
    <b-card class="card">
      <b-card-text class="title-card">
        Order Total
      </b-card-text>
      <hr>
      <div>
        <div class="row">
          <b-card-text class="col-5">Item Price</b-card-text>
          <div class="col-7 value">Rp. {{ this.sum.toLocaleString("id") }}</div>
          <div class="w-100"></div>
          <b-card-text class="col col-5">Tax</b-card-text>
          <div class="col-7 value">Rp. {{ this.tax.toLocaleString("id") }}</div>
          <div class="w-100"></div>
          <b-card-text class="col-5">Order Total</b-card-text>
          <div class="col-7 value"> <strong> Rp.
            {{ (this.sum + this.tax).toLocaleString("id") }} </strong></div>
        </div>
      </div>
      <hr>
      <b-button variant="success" @click.prevent="addToCart" class="addToCart pt-2 pb-2">
        <i class="far fa-money-bill-alt mr-2" right></i>
      <strong> Checkout Now</strong></b-button>
    </b-card>
  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  methods: {
    addToCart() {
      swal.fire({
        icon: 'success',
        title: 'Checkout Successful, Thanks',
        showConfirmButton: false,
        timer: 1500,
      });
      this.$store.dispatch('checkout')
      this.$router.push('/');
    },
  },
  computed: {
    cartList() {
      return this.$store.state.newcart;
    },
    sum() {
      const product = this.cartList.items
      if(product) {
        let sum = 0;
        product.forEach((item) => {
          if(item.price == undefined) {
            sum += 0
          } else {
            sum += Number(item.price);
          }
        });
        return sum;
      } else {
        return []
      }
    },
    tax() {
      const product = this.cartList.items
      if(product) {
        let tax = 0;
        product.forEach((item) => {
          if(item.price == undefined) {
            tax += 0
          } else {
            tax += Number(item.price);
          }
        });
        return tax * 10 / 100;
      } else {
        return []
      }
    },
  },
};
</script>

<style scoped>

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px !important;
  border: none;
  text-align: left;
}
.title-card {
  font-weight: bold;
  font-size: 18px;
  color: #cb9b2d;
}

.value {
  text-align: right;
  width: 80%;
}

.row {
  font-size: 16px;
}

.addToCart {
  /* height: 50px; */
  width: 100% ;
  font-size: 18px;
}

</style>
