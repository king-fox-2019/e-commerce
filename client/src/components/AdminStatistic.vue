<template>
  <div>
    <h6 class="titlebasic">DAILY SALES STATISTIC</h6>
    <Chart />
  </div>
</template>

<script>
import Chart from "./Chart.vue";
export default {
  name: "AdminStatistic",
  components: {
    Chart
  },
  created() {
    this.$store.dispatch("getAdminTransactions");
  }
};
</script>

<style>
.titlebasic {
  letter-spacing: 0.12em;
  font-weight: bold;
  margin: 10px auto;
  padding-bottom: 10px;
  padding-left: 10px;
  border-bottom: 1px solid rgb(77, 76, 76);
}
</style>