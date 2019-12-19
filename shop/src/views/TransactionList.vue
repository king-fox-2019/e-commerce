<template>
    <v-container class="py-10 my-10">
      <v-row>
        <v-col cols="3">
          <FloatingCard />
        </v-col>
        <v-col cols="9">
          <h3 class="mb-4">Transaction History</h3>
          <v-expansion-panels>
              <v-expansion-panel
                v-for="transaction in transactions"
                :key="transaction._id"
              >
                <v-expansion-panel-header>
                  {{renderDate(transaction.createdAt)}} - {{transaction.status}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list dense>
                    <div class="d-flex justify-space-between align-center">
                      Total: $ {{transaction.total}}
                      <v-btn v-if="transaction.status !== 'ORDER_RECEIVED'"
                      @click="confirmOrder(transaction._id)">I've received my package!</v-btn>
                    </div>
                    <v-list-item v-for="item in transaction.products" :key="item._id">
                      <v-list-item-content>
                        <v-img :src="item.image" max-height="100" max-width="100"></v-img>
                      </v-list-item-content>
                      <v-list-item-content>{{item.name}}</v-list-item-content>
                      <v-list-item-content>$ {{item.price}}</v-list-item-content>
                      <v-list-item-content>{{item.quantity}} Items</v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import FloatingCard from '@/components/FloatingCard'
export default {
  name: 'transactions',
  components: {
    FloatingCard
  },
  data () {
    return {
      user: {},
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    }
  },
  computed: {
    ...mapState(['transactions'])
  },
  created () {
    this.$store.dispatch('fetchTransactions')
  },
  methods: {
    confirmOrder (id) {
      this.$store.dispatch('confirmOrder', id)
        .then(data => {
          this.swal('success', 'Order status updated!')
        })
        .catch(err => {
          this.swal('error', err)
        })
    },
    renderDate(date) {
      date = new Date(date)
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let result = `${day}/${month}/${year}`
      return result;
    } 
  }
}
</script>

<style>

</style>