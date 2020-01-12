<template>
  <div id="mycart">
    <div class="header-text">
      <h1 class="is-size-4">Your cart</h1>
    </div>

    <div class="mycart cart-container">
      <div class="checkout-container">
        <img
          class="shopping-cart-img"
          src="https://icon-library.net/images/shopping-cart-icon-png-transparent/shopping-cart-icon-png-transparent-27.jpg"
          alt="cart-icon"
          srcset
        />
        <p>
          You have {{totalProductQtyInCart}} item(s) in your cart for a total of
          <strong>Rp{{totalProductPriceInCart.toLocaleString('id')}}</strong>
        </p>
        <button class="button is-primary"
          @click="confirmCheckout($event, totalProductPriceInCart)"
          :id="myCart._id"
          >Checkout</button>
      </div>
      <hr>
      <div class="products-container">
        <p><strong>Shopping cart details</strong></p>
        <hr>
        
        <!-- ini my cart {{myCart}} -->
        <div v-for="product in myCart.products" :key="product._id">
          <!-- {{product}} -->
          {{product.imageUrl}}
          <ProductCardCart :product="product" />
        </div>

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
  name: "my-cart",

  methods: {
    confirmCheckout: function (event, totalProductPriceInCart) {
      const cart_id = event.currentTarget.id;
      
      this.$buefy.dialog.confirm({
        message: `Proceed to checkout and pay <strong>Rp${totalProductPriceInCart.toLocaleString('id')}</strong>?`,
        onConfirm: async () => {
          try {
            await axios({
              method: 'patch',
              url: `/carts/${cart_id}/checkout`,
              headers: {
                access_token: localStorage.getItem("access_token")
              }
            })
            .then(({ data }) => {
              // console.log('ini updated cart', data);
              this.success(data.message);
              this.$store.dispatch("fetchMyCart");
            })

          } catch (error) {

            console.log(error)
            this.danger(error.response.data.messages[0])
          }
        }
      })
    }
  },

  created() {
    // console.log('ini myCart', this.$store.state.myCart)
    this.$store.dispatch("fetchMyCart")
    this.$store.dispatch("fetchMyActiveTransactions")
  },

  computed: {
    ...mapState([
      'myCart', 'myTransactions'
    ]),

    totalProductPriceInCart () {
      return this.$store.getters.totalPrice
    },

    totalProductQtyInCart() {
      return this.$store.getters.totalItem
    }
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