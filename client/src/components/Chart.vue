
<script>
import { Line } from "vue-chartjs";

export default {
  name: "Chart",
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
      transactions: this.$store.state.adminTransactions,
      transaction: [],
      income: []
    };
  },
  methods: {
    getData() {
      let dataDay = [],
        dataIncome = [];
      for (let i = 0; i < 30; i++) {
        dataDay[i] = 0;
        dataIncome[i] = 0;
      }
      this.transactions.forEach(transaction => {
        let month = transaction.createdAt.split("-")[2];
        let day = month.split("T")[0];
        // console.log(day);
        for (let i = 1; i <= 30; i++) {
          if (Number(day) === i) {
            let total = 0,
              income = 0;
            transaction.products.forEach(product => {
              total += product.quantity;
              income += product.quantity * product.product_id.price;
            });
            // console.log(String(income).substring(0, 2));
            dataIncome[i - 1] += Number(String(income).substring(0, 2));
            dataDay[i - 1] += Number(total);
          }
        }
      });
      this.transaction = dataDay;
      this.income = dataIncome;
      return dataDay;
    },
    getdata() {
      let dataMonth = [];
      for (let i = 0; i < 30; i++) {
        dataMonth[i] = 0;
      }
      this.transactions.forEach(transaction => {
        let month = transaction.createdAt.split("-")[1];
        for (let i = 1; i <= 12; i++) {
          if (Number(month) === i) {
            let total = 0;
            transaction.products.forEach(product => {
              total += product.quantity;
              // console.log(total);
            });
            dataMonth[i - 1] += Number(total);
          }
        }
      });
      this.transaction = dataMonth;
      // console.log(dataMonth);
      return dataMonth;
    }
  },
  created() {
    this.$store.dispatch("getAdminTransactions");
    this.getData();
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(250,185,50)");
    this.gradient.addColorStop(0.5, "rgba(250,185,50)");
    this.gradient.addColorStop(1, "rgba(250,185,50)");

    this.gradient2.addColorStop(0, "rgba(185,238,212, 1)");
    this.gradient2.addColorStop(0.5, "rgba(185,238,212, 0.9");
    this.gradient2.addColorStop(1, "rgba(185,238,212, 0.5)");

    this.renderChart(
      {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31"
        ],
        datasets: [
          {
            label: "Sold Products",
            borderColor: "#fab932",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: this.transaction
          },
          {
            label: "income(IDR mio)",
            borderColor: "#b9eed4",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: this.income
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>