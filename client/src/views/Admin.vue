<template>
  <div>
      <div class="container">
          <div class="row justify-content-center">
            <h1>List Transactions</h1>
          </div>
        <div>
        <b-table striped hover :items="this.listTransaction"></b-table>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
    computed:{
        ...mapGetters({listTransaction:'transaction/listTransaction'})
    },
    methods:{
        ...mapActions({getAllTransactions:'transaction/getAllTransactions'})
    },
    created(){
        this.getAllTransactions()
    }
};
</script>

<style>
</style>