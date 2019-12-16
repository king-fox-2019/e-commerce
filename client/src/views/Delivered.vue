<template>
  <div class="sent">
    <v-toolbar>
      <v-toolbar-title>Delivered</v-toolbar-title>
    </v-toolbar>
       <v-flex v-for="(orderItem) in listOrder" :key="orderItem._id" align-center >
          <OrderItem
          :transactionItem="orderItem"
            :orderId="orderItem._id"
            :status="'sent'"/>
        </v-flex>
  </div>
</template>
<script>
import OrderItem from '../components/OrderItem.vue'

export default {
  computed: {
    listOrder () {
      console.log('listOrder()')
      return this.$store.state.orders.filter(obj => obj.status === 'delivered')
    }
  },
  components: {
    OrderItem
  }
}
</script>
