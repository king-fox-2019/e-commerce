<template>
  <div class='admin-transaction'>
    <AdminTransactionCard v-for="(transaction, index) in transactions" :key="transaction._id" :transaction="transaction" :index="index">
      <div style="display: flex; flex-direction: column; align-content: flex-start; justify-content: flex-start; text-align: left;">
        <small>Customer Name: {{ transaction.user_id.username }}</small>
        <small>Customer Email: {{ transaction.user_id.email }}</small>
        <small>Transaction Date: {{ new Date(transaction.createdAt).toDateString() }}</small>
      </div>
    </AdminTransactionCard>
  </div>
</template>

<script>
import AdminTransactionCard from '../components/AdminTransactionCard.vue'

export default {
  name: 'AdminTransactionList',
  components: {
    AdminTransactionCard
  },
  computed: {
    transactions: {
      get () {
        return this.$store.state.adminTransactions
      }
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('getAdminTransactions')
    }
  }
}
</script>

<style>
.admin-transaction {
  height: 100vh;
  overflow: scroll;
}
</style>
