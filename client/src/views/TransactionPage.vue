<template>
  <div class="container-fluid p-0 conTrans">
    <div class="container d-flex justify-content-center" style="width: 100%">
      <div class="mb-4" style="width: 100%">
        <div class="d-flex justify-content-center mt-4 mb-4" style="font-size: 250%; background-color: aquamarine;">
          Your Transactions
        </div>
        <!-- loop -->
        <TransactionCard v-for="transaction in transactions" :key="transaction._id" :transaction="transaction"/>

      </div>
    </div>
    <b-button variant="warning" @click.prevent="goBack"> <i class="fas fa-arrow-circle-left"></i> Back </b-button>
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
    },
    goBack () {
      this.$router.push('/')
    }
  },
  created () {
    this.getUserTransactions()
  }
}
</script>

<style>
.conTrans {
  height: 100vh;
  overflow: scroll;
}
</style>
