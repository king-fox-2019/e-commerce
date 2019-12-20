<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row>
        <md-table-head>Date</md-table-head>
        <md-table-head>Total</md-table-head>
        <md-table-head>Status</md-table-head>
        <md-table-head>User</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>
      <md-table-row slot="md-table-row" v-for="transaction in transactionsAsAdmin" :key="transaction._id">
        <md-table-cell md-label="Date">{{ renderDate(transaction.createdAt) }}</md-table-cell>
        <md-table-cell md-label="Total">$ {{ transaction.total }}</md-table-cell>
        <md-table-cell md-label="Status">{{ transaction.status }}</md-table-cell>
        <md-table-cell md-label="User">{{transaction.user.email}}</md-table-cell>
        <md-table-cell md-label="Action">
          <md-button class="md-primary md-raised" @click="editingStatus(transaction)">Edit Status</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Update Status</md-dialog-title>
            <div class="md-layout-item">
              <md-field>
                <label for="status">Status</label>
                <md-select v-model="status" name="status" id="status">
                  <md-option value="AWAITING_PAYMENT">AWAITING_PAYMENT</md-option>
                  <md-option value="PROCESSING_ORDER">PROCESSING_ORDER</md-option>
                  <md-option value="ORDER_RECEIVED">ORDER_RECEIVED</md-option>
                </md-select>
              </md-field>
            </div>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" @click="updateStatus()">Update</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'simple-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    showDialog: false,
    transactionInDialog: '',
    status: ''
  }),
  methods: {
    updateStatus() {
      this.showDialog = false;
      this.$store.dispatch('updateTransactionStatus', {
        id: this.transactionInDialog._id,
        status: this.status
      })
    },
    renderDate(date) {
      date = new Date(date);
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDay();
      return `${day}/${month}/${year}`
    },
    editingStatus(transaction) {
      this.showDialog = true;
      this.transactionInDialog = transaction;
      this.status = transaction.status;
    }
  },
  created () {
    this.$store.dispatch('fetchTransactionsAsAdmin')
  },
  computed: {
    ...mapState(['transactionsAsAdmin'])
  }
}
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
