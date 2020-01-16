<template>
  <!-- chart js  -->
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
  </div>
  <!-- chart js -->
</template>

<script>
// import { Bar, Line } from "vue-chartjs"
import LineChart from '../configs/LineChart'

export default {
  name: 'Chart',
  props: ['onRecap'],
  data: function () {
    return {
      datacollection: null
    }
  },
  components: {
    LineChart
  },
  methods: {
    fillData () {
      this.datacollection = {
        // labels: [this.getRandomInt(), this.getRandomInt()],
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'Profit',
            backgroundColor: '#f87979',
            // data: [this.getRandomInt(), this.getRandomInt()]
            // data: [8, 79, 7, 60, 95, 89, 0, 4, 8, 15, 69, 8]
            data: this.onRecap
          }
          // {
          //   label: 'Loss',
          //   backgroundColor: '#f81267',
          //   data: [this.getRandomInt(), this.getRandomInt()],
          //   data: [22, 11, 37, 7, 8, 67, 90, 0, 0, 0, 0, 8]
          // }
        ]
      }
    }
  },
  mounted () {
    this.fillData()
  }
}
</script>

<style>
</style>
