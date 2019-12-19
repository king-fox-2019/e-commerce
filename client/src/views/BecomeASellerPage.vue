<template>
  <div class="bg-signin-page">
    <SellerForm class="form-user"></SellerForm>
  </div>
</template>

<script>
import SellerForm from '../components/SellerForm'

export default {
  components: {
    SellerForm
  },
  methods: {}
}
</script>

<style>
.form-user {
  padding-top: 120px;
}
.bg-signin-page {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1453989799106-bbad8d7b5191?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80");
}
</style>
