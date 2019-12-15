<template>
  <div>
    <div class="d-flex justify-content-center align-items-center header">
      <router-link to="/" class="back">
        <i class="fas fa-home mr-3"></i>
      </router-link>
      Shoping Cart
    </div>
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-grow-1 bd-highlight item p-4">
          <div class="row tax">
            <div class="col-1 icon mt-3">
              <i class="fas fa-exclamation-circle icon"></i>
            </div>
            <div class="col-11 class warning mt-3 mb-3">
              <div class="title">PPh 22, Article 22 of Income Tax on gold bars</div>
              <div>
                In accordance with PMK No. 34 / PMK.10 / 2017, gold bar purchases are
                subject to PPh 22 of 0.45% (for NPWP holders and 0.9% for non NPWP).
                Every purchase of gold bars is accompanied by a proof of income tax 22.
              </div>
            </div>
          </div>
          <div class="row card mt-4">
            <div class="col-1 icon mt-3">
              <i class="fas fa-exclamation-circle icon"></i>
            </div>
            <div class="col-11 class warning mt-3 mb-3">
              <div class="title">PPh 22, Article 22 of Income Tax on gold bars</div>
              <div>
                In accordance with PMK No. 34 / PMK.10 / 2017, gold bar purchases are
                subject to PPh 22 of 0.45% (for NPWP holders and 0.9% for non NPWP).
                Every purchase of gold bars is accompanied by a proof of income tax 22.
              </div>
            </div>
          </div>
      </div>
      <div class="p-2 bd-highlight cart-item p-4">
        <CartOrder />
      </div>
    </div>
  </div>
</template>

<script>
import CartOrder from '../components/CardOrder.vue';

export default {
  components: {
    CartOrder,
  },
  computed: {
    emasBatang() {
      return this.$store.state.cartEb;
    },
    emasSeries() {
      return this.$store.state.cartEs;
    },
  },
  created() {
    const valid = localStorage.getItem('token');
    if (valid) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
  .header {
    height: 50px;
    background-color: #f1f1f1;
    font-weight: bold;
    color: #cb9b2d;
  }

  .cart-item {
    width: 35% !important
  }

  .tax {
    /* height: 100px; */
    color:rgb(174, 174, 174);
    font-size: 12px;
    border: 1px solid gainsboro;
    border-radius: 10px
  }

  .item {
    padding-left: 35px !important;
  }

  .icon {
    font-size: 20px
  }

  .warning {
    text-align: left
  }

  .title {
    font-size: 16px;
    font-weight: bold
  }

  .back {
    color: #cb9b2d;
    font-weight: bold;
    text-decoration: underline;
  }

  .back:hover {
    color: #927020;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px !important;
    border: none;
    text-align: left;
  }
</style>
