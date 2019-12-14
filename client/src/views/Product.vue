<template>
  <div>
    <Navbar />
    <img src="https://www.logammulia.com/uploads/ngc_global_images/5be0232fb4073_20181105180207-1.jpg"
    class="img-fluid header" alt="Responsive image">
    <div class="border-up"></div>
    <div class="d-flex p-2 bd-highlight header-item align-items-center">
      <h2>Beli Emas</h2>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Navbar, Footer,
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
  height: 200px;
}

h2 {
  font-weight: bold
}


</style>
