<template>
  <div class="mb-4 mt-4 shadow" style="background-color: white;">
    <div class="border p-3" style="width: 100%">
      <div class="d-flex justify-content-between">
        <h4>{{ index + 1 }}. Receipt Number: {{ transaction._id }}</h4>
        <slot></slot>
      </div>
      <div class="container">
        <hr>

        <div v-for="product in transaction.products" :key="product._id">
          <div class="d-flex">
            <div style="width: 80px">
              <img :src="product.product_id.image" alt="" style="width: 100%; object-fit: cover;">
            </div>
            <div class="ml-3 d-flex flex-column" style="display: flex; justify-content: flex-start; text-align: left">
              <div>
                {{ product.product_id.name }}
              </div>
              <small>
                Amount: {{ product.quantity }}
              </small>
            </div>
            <div class="ml-auto">
              Total: Rp. {{ product.quantity * product.product_id.price }}
            </div>
          </div>
          <hr>
        </div>

        <div class="d-flex justify-content-between">
          <div>
            Status: <span style="color: green" v-if="transaction.status"> Delivered </span> <span style="color: red" v-else> On process </span>
          </div>
          <div>
            Rp. {{ totalPrice }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminTransactionCard',
  props: ['transaction', 'index'],
  computed: {
    totalPrice () {
      let total = 0
      this.transaction.products.forEach(product => {
        total += product.quantity * product.product_id.price
      })
      return total
    }
  }
}
</script>

<style>

</style>
