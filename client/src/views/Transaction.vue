<template>
  <div>
    <h1>TRANSACTION SUMMARY</h1>
    <div class="is-divider" data-content="OR"></div>
    <!-- untuk v-for dlm layout -->
    <!-- {{transaction}} -->
  <div>

    <div class="row">
      <div class="col">id</div>
      <div>status</div>
      <div>total billing</div>
      <div>date</div>
      <div>customer</div>
      <div>products</div>

    </div>

    <br>
    <div> id : {{transactions[0]._id}}</div>
    <div>status : {{transactions[0].status}}</div>
    <div>total billing : {{transactions[0].total}}</div>
    <div>date: {{transactions[0].createdAt}}</div>
    <div>customer : {{transactions[0].carts[0].user.username}}</div>
    <div>products : {{transactions[0].carts[0].product.name}}</div>
  </div>
  <div>
    <br>
    <div>
    AAAAAAAAAAAAAAAAAA ini utk admin
    </div>
    <br>
    <div> id : {{transactions[1]._id}}</div>
    <div>status : {{transactions[1].status}}</div>
    <!-- <div>total billing : {{transactions[1].total}}</div> -->
     <div>Total : {{formatPrice}}</div>
    <div>date: {{transactions[1].createdAt}}</div>
    <div>customer : {{transactions[1].carts[0].user.username}}</div>
    <div>products : {{transactions[1].carts[0].product.name}}</div>
    <div>products : {{transactions[1].carts[1].product.name}}</div>
        <!-- nanti transactions[1].carts harus di looping -->
    <button v-if="transactions[1].status === 'on hold for delivery confirmation'" @click="deliv" class="button is-light">Confirm</button>

<button @click="$router.push(`/transaction/statistic`)" class="button is-light">statistic</button>
<router-view :onRecap="onRecap"></router-view>
  </div>
    <div>
    <br>
    <div>
    AAAAAAAAAAAAAAAAAA ini utk customer
    </div>
    <br>
    <div> id : {{transactions[1]._id}}</div>
    <div>status : {{transactions[1].status}}</div>
    <!-- <div>total billing : {{transactions[1].total}}</div> -->
    <div>Total : {{formatPrice}}</div>
    <div>date: {{transactions[1].createdAt}}</div>
    <div>customer : {{transactions[1].carts[0].user.username}}</div>
    <div>products : {{transactions[1].carts[0].product.name}}</div>
    <div>products : {{transactions[1].carts[1].product.name}}</div>
        <!-- nanti transactions[1].carts harus di looping -->
    <button v-if="transactions[1].status === 'delivered'" @click="received" class="button is-light">Receive</button>
  </div>

  </div>
</template>

<script>

export default {
  name: 'transactions',
  data: function () {
    return {
      transactions: []
    }
  },
  methods: {
    received () {
      this.transactions[1].status = 'received'
    },
    deliv () {
      this.transactions[1].status = 'delivered'
    },
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
        .catch(console.log)
    }

  },
  created () {
    this.fetchTransaction()
  },
  computed: {
    isAdmin () {
      return localStorage.getItem('isAdmin')
    },
    formatPrice () {
      return `IDR ${this.transactions[0].total.toLocaleString()}`
    },
    onRecap () {
      let dataSet = []
      // let month = this.transactions[1].createdAt.split('-')[1]

      // for (let i = 1; i <= 12; i++) {
      //   if (Number(month) === i) {
      //     dataSet[i - 1] = month
      //   }
      // }
      for (let i = 0; i < 12; i++) {
        dataSet[i] = 0
      }

      this.transactions.forEach(transaction => {
        let month = transaction.createdAt.split('-')[1]

        for (let i = 1; i <= 12; i++) {
          // console.log(month, 'lengkap gak bulan nya')
          // console.log(i, 'log i')

          if (Number(month) === i) {
            dataSet[i - 1] += Number(transaction.total)
            console.log(dataSet[i - 1], 'ggggggggggggggggggg')
          }
        }
      })
      return dataSet
    }
  }
}
</script>

<style scoped>
.small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
