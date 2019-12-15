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
    <div> id : {{transaction[0]._id}}</div>
    <div>status : {{transaction[0].status}}</div>
    <div>total billing : {{transaction[0].total}}</div>
    <div>date: {{transaction[0].createdAt}}</div>
    <div>customer : {{transaction[0].carts[0].user.username}}</div>
    <div>products : {{transaction[0].carts[0].product.name}}</div>
  </div>
  <div>
    <br>
    <div>
    AAAAAAAAAAAAAAAAAA ini utk admin
    </div>
    <br>
    <div> id : {{transaction[1]._id}}</div>
    <div>status : {{transaction[1].status}}</div>
    <!-- <div>total billing : {{transaction[1].total}}</div> -->
     <div>Total : {{formatPrice}}</div>
    <div>date: {{transaction[1].createdAt}}</div>
    <div>customer : {{transaction[1].carts[0].user.username}}</div>
    <div>products : {{transaction[1].carts[0].product.name}}</div>
    <div>products : {{transaction[1].carts[1].product.name}}</div>
        <!-- nanti transaction[1].carts harus di looping -->
    <button v-if="transaction[1].status === 'on hold for delivery confirmation'" @click="deliv" class="button is-light">Confirm</button>

<button @click="$router.push(`/transaction/statistic`)" class="button is-light">statistic</button>
<router-view></router-view>
  </div>
    <div>
    <br>
    <div>
    AAAAAAAAAAAAAAAAAA ini utk customer
    </div>
    <br>
    <div> id : {{transaction[1]._id}}</div>
    <div>status : {{transaction[1].status}}</div>
    <!-- <div>total billing : {{transaction[1].total}}</div> -->
    <div>Total : {{formatPrice}}</div>
    <div>date: {{transaction[1].createdAt}}</div>
    <div>customer : {{transaction[1].carts[0].user.username}}</div>
    <div>products : {{transaction[1].carts[0].product.name}}</div>
    <div>products : {{transaction[1].carts[1].product.name}}</div>
        <!-- nanti transaction[1].carts harus di looping -->
    <button v-if="transaction[1].status === 'delivered'" @click="received" class="button is-light">Receive</button>
  </div>

  </div>
</template>

<script>

export default {
  name: 'transaction',
  data: function () {
    return {
      transaction: []
    }
  },
  methods: {
    received () {
      this.transaction[1].status = 'received'
    },
    deliv () {
      this.transaction[1].status = 'delivered'
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

          this.transaction = data
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
      return `IDR ${this.transaction[0].total.toLocaleString()}`
    }
    // bikin looping bulanan,
    // [0,1,2,..11] index
    // kalau bulan nya 02, arr[1] += totalbill
    // result [700.000, 390.000, 900.000, ... 299.000] ini yg ditampilin di chart
    // dan jumlah yg terjual, itung amount di transaction
  }
}
</script>

<style scoped>
.small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
