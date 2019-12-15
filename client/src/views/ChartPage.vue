<template>
  <div class="card mt-4" style="padding: 20px;">
    <h3> Sales Statistics </h3>
    <ChartLine :transactions=transactions></ChartLine>
  </div>
</template>

<script>
import ChartLine from '../components/Chart'
export default {
  name: 'ChartPage',
  components: {
    ChartLine
  },
  created () {
    this.$store.dispatch('getAdminTransactions')
  }

}
</script>

<style>

</style>
