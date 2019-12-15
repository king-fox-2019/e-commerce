<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'Chart',
  extends: Line,
  data () {
    return {
      gradient: null,
      gradient2: null,
      transactions: this.$store.state.adminTransactions,
      transactionData: []
    }
  },
  methods: {
    getdata () {
      let dataDay = []
      for (let i = 0; i < 31; i++) {
        dataDay[i] = 0
      }
      this.transactions.forEach(transaction => {
        let month = transaction.createdAt.split('-')[2]
        let day = month.split('T')[0]
        for (let i = 1; i <= 31; i++) {
          if (Number(day) === i) {
            let total = 0
            transaction.products.forEach(product => {
              // console.log(product.product_id.price)
              total += product.quantity
            })
            dataDay[i - 1] += Number(total)
          }
        }
      })
      this.transactionData = dataDay
      // console.log(dataDay)
      return dataDay
    }
  },
  created () {
    this.$store.dispatch('getAdminTransactions')
    this.getdata()
  },
  mounted () {
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

    this.renderChart(
      {
        labels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
          '31'
        ],
        datasets: [
          {
            label: 'Product Sold',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: this.gradient,
            data: this.transactionData
          }
          // {
          //   label: 'Data Two',
          //   borderColor: '#05CBE1',
          //   pointBackgroundColor: 'white',
          //   pointBorderColor: 'white',
          //   borderWidth: 1,
          //   backgroundColor: this.gradient2,
          //   data: []
          // }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    )
  }
}
</script>
