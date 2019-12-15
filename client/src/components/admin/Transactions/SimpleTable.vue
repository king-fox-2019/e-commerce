<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Date</md-table-head>
        <md-table-head>Total</md-table-head>
        <md-table-head>Status</md-table-head>
        <md-table-head>User</md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="transaction in transactionsAsAdmin" :key="transaction._id">
        <md-table-cell md-label="Date">{{ transaction.createdAt }}</md-table-cell>
        <md-table-cell md-label="Total">$ {{ transaction.total }}</md-table-cell>
        <md-table-cell md-label="Status">{{ transaction.status }}</md-table-cell>
        <md-table-cell md-label="User">{{transaction.user.email}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('fetchTransactionsAsAdmin')
  },
  computed: {
    ...mapState(['transactionsAsAdmin'])
  }
};
</script>

<style>
.md-ripple {
  padding: 0 !important;
}
</style>

<style scoped>
img {
  max-height: 120px;
  width: auto
}
</style>
