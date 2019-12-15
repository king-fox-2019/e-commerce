<template>
  <div id="mycart">
    <!-- USER'S ACTIVE TRANSACTIONS -->
    <section id="user-active-transactions">
      <div class="header-text">
        <h1 class="is-size-4 my-3 has-text-centered">Your Active Transactions</h1>
      </div>

      <div v-for="transaction in myActiveTransactions" :key="transaction._id">
        <!-- {{transaction}} -->
        <div class="mytransactions cart-container checkout py-1 mb-3">
          <h6 class="mr-3 mt-3 float-right">Order ID: {{transaction._id}}</h6>
          <h6 class="ml-3 mt-3">Time Ordered: {{new Date(transaction.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' })}}</h6>
          <div class="received-confirmation checkout-container">
            <button class="button is-primary"
              v-if="transaction.status === 'delivering'"
              @click="confirmReceived"
              :id="transaction._id"
              >I have received this package</button>
          </div>
          <hr>
          <div class="products-container text-center">

            <span class="checkout-process" 
              :class="{ active: transaction.status === 'preparing' }"
              >
              <img class="shopping-cart-img"
                src="../assets/purple-arrow.png" 
                alt="checkout-icon"
              /> Processing delivery
            </span>

            <span class="checkout-process" 
              :class="{ active: transaction.status === 'delivering' }"
              >
              <img class="shopping-cart-img ml-3"
                src="../assets/purple-arrow.png" 
                alt="checkout-icon"
              /> Package shipped
            </span>

            <span class="checkout-process" 
              :class="{ active: transaction.status === 'received' }"
              >
              <img class="shopping-cart-img ml-3"
                src="../assets/purple-arrow.png" 
                alt="checkout-icon"
              /> Package received
            </span>

            <hr>
            
            <div v-for="product in transaction.cart.products" :key="product._id">
              <!-- {{product}} -->
              <ProductCardCartTransaction :product="product" />
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- USER'S TRANSACTION HISTORY -->
    <section id="user-transactions-history">
      <div class="header-text broken-white">
        <h1 class="is-size-4 my-3 has-text-centered">Your Past Transactions</h1>
      </div>

      <div v-for="transaction in myTransactionsHistory" :key="transaction._id">
        <div class="mytransactions cart-container broken-white checkout py-1 mb-3">
          <h6 class="mr-3 mt-3 float-right">Order ID: {{transaction._id}}</h6>
          <h6 class="ml-3 mt-3">Time Ordered: {{new Date(transaction.createdAt).toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' })}}</h6>
          <h6 class="ml-3 mt-3">Time Received: {{new Date(transaction.updatedAt).toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' })}}</h6>
          <div class="received-confirmation checkout-container">
            <button class="button is-primary"
              v-if="transaction.status === 'delivering'"
              @click="confirmReceived"
              :id="transaction._id"
              >I have received this package</button>
          </div>
          <hr>
          <div class="products-container text-center">

            <span class="checkout-process" 
              :class="{ active: transaction.status === 'preparing' }"
              >
              <img class="shopping-cart-img"
                src="../assets/purple-arrow.png" 
                alt="checkout-icon"
              /> Processing delivery
            </span>

            <span class="checkout-process" 
              :class="{ active: transaction.status === 'delivering' }"
              >
              <img class="shopping-cart-img ml-3"
                src="../assets/purple-arrow.png" 
                alt="checkout-icon"
              /> Package shipped
            </span>

            <span class="checkout-process" 
              :class="{ active: transaction.status === 'received' }"
              >
              <img class="shopping-cart-img ml-3"
                src="../assets/purple-arrow.png" 
                alt="checkout-icon"
              /> Package received
            </span>

            <hr>
            
            <div v-for="product in transaction.cart.products" :key="product._id">
              <!-- {{product}} -->
              <ProductCardCartTransaction :product="product" />
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { mapState } from "vuex"
import ProductCardCartTransaction from '../components/ProductCardCartTransaction'
import axios from "../../config/axios"
import toastMixin from "../mixins/toastMixin"

export default {
  name: "my-cart",

  methods: {
    confirmReceived: async function (event) {
      try {
        await axios({
          method: 'patch',
          url: `/transactions/${event.currentTarget.id}/received`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(({ data }) => {
          this.success(data.message);
          this.$store.dispatch('fetchMyActiveTransactions')
        })
        
      } catch (error) {
        
        console.log(error)
        this.danger(error.response.data.messages[0])
      }
    }
  },

  created() {
    this.$store.dispatch("fetchMyActiveTransactions")
    this.$store.dispatch("fetchMyTransactionsHistory")
  },

  computed: {
    ...mapState([
      'myCart', 'myActiveTransactions', 'myTransactionsHistory'
    ]),

    totalProductPriceInCart () {
      return this.$store.getters.totalPrice
    },

    totalProductQtyInCart() {
      return this.$store.getters.totalItem
    }
  },

  components: {
    ProductCardCartTransaction
  },

  mixins: [toastMixin]
  // ...mapGetters(["totalProductQtyInCart"])
};
</script>

<style scoped>
#mycart {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: left; */

  background-image: url("../assets/1511.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  min-height: 100vh;
  padding-bottom: 50px;
}

hr {
  margin: 1% 0;
}

.header-text {
  margin: 10px 10%;
  margin-left: 10%;
  padding: 1px;
  background-color: white;
  border-radius: 5px;
}

.broken-white {
  background-color: rgb(245, 240, 240) !important;
}

.header-text > h1 {
  color: rgb(65, 69, 69);
  font-weight: 700;
}

.cart-container {
  margin: 0 10%;
  background-color: white;
  border-radius: 1%;
  box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.08);
}

.checkout-container {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkout-container > p {
  margin-right: 25px;
}

.shopping-cart-img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.products-container {
  margin: 0 5%;
  margin-bottom: 5%;
}

.checkout-process {
  opacity: 30%;
}

.active {
  opacity: 100%;
}

</style>