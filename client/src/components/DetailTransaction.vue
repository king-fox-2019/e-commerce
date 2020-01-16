<template>
  <div>
    <div class="container">
      <div class="columns">
      <div class="column">{{transaction._id}}</div>
      <!-- <div class="column">{{transaction.createdAt}}</div> -->
      <!-- <div class="column">{{getDate}}</div> -->
      <div class="column">IDR {{transaction.total.toLocaleString()}}</div>
      <div class="column">{{transaction.status}}</div>

      <div class="column" v-if="isAdmin">
        <button v-if="transaction.status === 'on hold for delivery confirmation'" @click="deliv" class="button is-black">Confirm</button>
      </div>
      <div class="column" v-if="!isAdmin">
        <button v-if="transaction.status === 'delivered'" @click="received" class="button is-black">Receive</button>
      </div>
      <!-- <div class="column">customer : {{transaction.carts[0].user.username}}</div> -->
      <!-- <div class="column-cart" v-for="(cart, i) in transaction.carts" :key="i">products :
        <div>{{cart.product.name}}</div>
      </div> -->
  </div>
    </div>
  <hr>
  </div>
</template>

<script>
export default {
  name: 'DetailTransaction',
  props: ['transactions', 'transaction', 'isAdmin'],
  methods: {
    deliv () {
      let id = this.transaction._id
      this.axios
        .patch(`/transactions/${id}`, { status: 'delivered' }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.transaction.status = 'delivered'
          this.$emit('refetch')
        })
    },
    received () {
      let id = this.transaction._id
      this.axios
        .patch(`/transactions/${id}`, { status: 'received' }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          this.transactions.status = 'received'
          this.$emit('refetch')
        })
    }
  },
  computed: {
    getDate () {
      // let date = this.transactions.createdAt
      // let month = date.toLocaleString('default', { month: 'long' })
      return `${this.transactions.createdAt.toLocaleString('default', { month: 'long' })}`
      // return month
    }
  }
}
</script>

<style scoped>
.column-cart {
  display: flex;
  flex-direction: column;
}
.container {
  width: 50vw;
}
hr {
  width: 75vw;
  border: 1px solid rgba(233, 222, 222, 0.541) !important;
  margin-left: 12%;
}
</style>
