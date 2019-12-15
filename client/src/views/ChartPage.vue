<template>
  <div class="card">
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

</style>
