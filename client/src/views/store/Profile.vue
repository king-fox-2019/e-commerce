<template>
<div class="container my-4">
  <div class="card-expansion" v-for="transaction in transactions" :key="transaction._id">
    <md-card>
      <md-card-header>
        <div class="md-title">{{transaction.status}}</div>
        <div class="md-subhead">{{transaction.createdAt}}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button
            v-if="transaction.status !== 'ORDER_RECEIVED'"
            @click.prevent="confirmOrder(transaction._id)">CONFIRM RECEIVED</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            <div class="row" v-for="(product, i) in transaction.products" :key="i">
                <div class="col-4">
                    {{product.name}}
                </div>
                <div class="col-4">
                    {{product.quantity}} items
                </div>
                <div class="col-4">
                    $ {{product.price}}
                </div>
            </div>
            <p class="float-right">Total: $ {{transaction.total}}</p>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'profile',
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
    }
  }
}
</script>

<style>

</style>
