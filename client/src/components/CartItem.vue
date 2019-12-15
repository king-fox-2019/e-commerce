<template>
  <div>
    <b-card class="card">
      <b-card-text class="title-card">
        Total Price
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
          <b-card-text class="col-5">Total Price</b-card-text>
          <div class="col-7 value"> <strong> Rp.
            {{ (this.sum + this.tax).toLocaleString("id") }} </strong></div>
        </div>
      </div>
      <hr>
      <b-button variant="success" @click.prevent="addToCart" class="addToCart pt-2 pb-2">
        <i class="far fa-money-bill-alt mr-2" right></i>
      <strong> Add To Cart</strong></b-button>
    </b-card>
    <b-card class="card-2 mt-4">
      <b-card-text class="title-card-2">
        PPh 22, Income Tax Article 22 for Gold Bars
      </b-card-text>
      <b-card-text>According to PMK No 34/PMK.10/2017, purchase of gold bars is subject to
        a fee in accordance to PPh Art. 22 of 0,45% (for NPWP holders and 0,9%
        for non-NPWP holders). Every purchase of gold bars is accompanied by
        proof of deduction of PPh 22.</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart() {
      const login = this.isLogin();
      if (login) {
        this.$router.push('/my-cart');
      } else {
        this.$router.push('/login');
      }
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  computed: {
    cartItem() {
      return this.$store.state.cart;
    },
    sum() {
      let sum = 0;
      this.cartItem.forEach((item) => {
        sum += item.price;
      });
      return sum;
    },
    tax() {
      let tax = 0;
      this.cartItem.forEach((item) => {
        tax += item.price;
      });
      return tax * 10 / 100;
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

.card-2 {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px !important;
  border: none;
  text-align: justify;
  font-size: 12px
}

.title-card-2 {
  font-weight: bold;
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
