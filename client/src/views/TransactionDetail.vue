<template>
  <div class="transaction-detail cart-container checkout py-1 mb-3">
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
</template>

<script>
import { mapState } from "vuex"
import ProductCardCart from '../components/ProductCardCart'
import ProductCardCartTransaction from '../components/ProductCardCartTransaction'
import axios from "../../config/axios"
import toastMixin from "../mixins/toastMixin"

export default {
  name: "transaction-detail",

  data () {
    return {
      // transaction: {}
    }
  },

  methods: {
    getTransactionDetail: async function() {
      try {
        await axios({
          method: 'get',
          url: '/transactions/' + this.$route.params.id,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          // this.transaction = data.transaction
          this.$store.commit('FETCH_A_TRANSACTION', data.transaction)
        })

      } catch (error) {
        console.log(error)
        this.danger(error.response.data.messages[0])
      }
    }
  },

  created() {
    this.getTransactionDetail()
    // this.$store.dispatch('fetchATransaction')
  },

  computed: {
    ...mapState([
      // 'myCart', 'myTransactions', 
      'transaction'
    ]),

    // totalProductPriceInCart () {
    //   return this.$store.getters.totalPrice
    // },

    // totalProductQtyInCart() {
    //   return this.$store.getters.totalItem
    // }
  },

  components: {
    ProductCardCart, ProductCardCartTransaction
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
}

.header-text > h1 {
  color: white;
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