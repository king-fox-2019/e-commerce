<template>
  <div>
    <div class="subsection">
      <div>
        <h1>TRANSACTION SUMMARY</h1>
      </div>
      <div>
        <div v-if="isAdmin" style="cursor: pointer;" @click="$router.push(`/transaction/statistic`)"><span> STATISTIC </span></div>
      </div>
    </div>

    <hr>
    <div class="mainsection">
    <div class="is-divider" data-content="OR"></div>

    <div v-if="transactions.length > 1">
    <div class="container">
      <div class="columns">
        <div class="column">id</div>
        <div class="column">total billing</div>
        <div class="column">status</div>
        <div class="column">action</div>
      </div>
    </div>
      <hr>
    <div class="detil" v-for="(transaction, i) in transactions" :key="i">
      <DetailTransaction :transactions="transactions" :transaction="transaction" @refetch="refetch" :isAdmin="isAdmin"></DetailTransaction>
    </div>

      <router-view v-if="isAdmin" :onRecap="onRecap"></router-view>
    </div>

    <div v-if="transactions.length === 0">
      <div style="font-family: 'Josefin Sans', sans-serif; font-size: 20px;">There is no transaction recorded</div>
    </div>

    </div>

  </div>
</template>

<script>
import DetailTransaction from '../components/DetailTransaction.vue'
export default {
  name: 'transactions',
  props: ['isAdmin'],
  components: {
    DetailTransaction
  },
  data: function () {
    return {
      transactions: []
    }
  },
  methods: {
    // received () {
    //   this.transactions[1].status = 'received'
    // },
    // deliv () {
    //   this.axios
    //     .patch()
    //   this.transactions[1].status = 'delivered'
    // },
    fetchTransaction () {
      // console.log('ke fetch transaction')

      this.axios
        .get('/transactions', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          // console.log(data, 'dari transaction ada data apa yg mau ditampilin')
          this.transactions = data
        })
        .catch(err => {
          this.$emit('alert', err)
        })
    },
    refetch () {
      this.fetchTransaction()
    }
  },
  created () {
    this.fetchTransaction()
  },
  computed: {
    // isAdmin () {
    //   return localStorage.getItem('isAdmin')
    // },
    formatPrice () {
      return `IDR ${this.transactions[0].total.toLocaleString()}`
    },
    onRecap () {
      let dataSet = []

      for (let i = 0; i < 12; i++) {
        dataSet[i] = 0
      }

      this.transactions.forEach(transaction => {
        let month = transaction.createdAt.split('-')[1]

        for (let i = 1; i <= 12; i++) {
          if (Number(month) === i) {
            dataSet[i - 1] += Number(transaction.total)
          }
        }
      })
      return dataSet
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Gelasio&display=swap');
@import url('https://fonts.googleapis.com/css?family=Abel|Barlow|Josefin+Sans|Varela+Round&display=swap');
@import url("https://fonts.googleapis.com/css?family=Playfair+Display&display=swap");

.subsection {
  font-family: "Gelasio", serif;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  justify-content: space-around;
}
.small {
    max-width: 600px;
    margin:  150px auto;
  }
.h1 {
  font-size: 2px;
}
.row {
  display: flex;
  flex-direction: row;
}
.col {
  width: 5vw;
}
hr {
  width: 75vw;
  border: 1px solid rgb(226, 221, 221) !important;
  margin-left: 12%;
}
/* hr.after-title {
  width: 50vw !important;
  border: 1px solid rgb(226, 221, 221) !important;
  margin-left: 0% !important;
} */
.container {
  width: 50vw;
}
.mainsection {
  font-family: 'Josefin Sans', sans-serif;
}
</style>
