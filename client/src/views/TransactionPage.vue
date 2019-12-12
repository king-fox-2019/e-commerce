<template>
  <div class="container-fluid p-0">
    <div class="container d-flex justify-content-center" style="width: 100%">
      <div class="mb-4" style="width: 100%">
        <div class="d-flex justify-content-center mt-4 mb-4" style="font-size: 250%; background-color: aquamarine;">
          Your Transactions
        </div>
        <!-- loop -->
        <TransactionCard v-for="transaction in transactions" :key="transaction._id" :transaction="transaction"/>

      </div>
    </div>
  </div>
</template>

<script>
import TransactionCard from '../components/TransactionCard.vue'

export default {
  components: {
    TransactionCard
  },
  computed: {
    transactions () {
      return this.$store.state.transactions
    }
  },
  methods: {
    getUserTransactions () {
      this.$store.dispatch('getUserTransactions')
    }
  },
  created () {
    this.getUserTransactions()
  }
}
</script>

<style>

</style>
