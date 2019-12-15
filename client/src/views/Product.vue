<template>
  <div>
    <Navbar />
    <img src="https://www.logammulia.com/uploads/ngc_global_images/5be0232fb4073_20181105180207-1.jpg"
    class="img-fluid header" alt="Responsive image">
    <div class="border-up"></div>
    <div class="d-flex p-2 bd-highlight header-item align-items-center">
      <div class="d-flex flex-column bd-highlight mb-3 desc-title">
        <h1>Buy Gold</h1>
        <p>ANTAM LM gold bars are guaranteed authenticity and purity with LBMA
          (London Bullion Market Association) certificate. Immediately have
          LM ANTAM gold bars ranging from 0.5 gram fractions to 1000 gram fractions.</p>
      </div>
    </div>
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-grow-1 bd-highlight p-4">Flex item</div>
      <div class="p-2 bd-highlight cart-item p-4">
        <CartItem />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import CartItem from '../components/CartItem.vue';

export default {
  components: {
    Navbar, Footer, CartItem,
  },
};
</script>

<style scoped>
.header {
  margin-top: 80px;
}

.border-up {
  height: 10px;
  background-color: #f1f1f1
}

.header-item {
  height: 200px !important;
}

h1 {
  font-weight: bold;
  color: #cb9b2d;
  margin-bottom: 10px
}

.cart-item {
  width: 35% !important
}

.desc-title {
  text-align: left;
  padding-left: 30px;
  padding-right: 30px
}

.mb-3 {
  margin-bottom: 0 !important
}

</style>
