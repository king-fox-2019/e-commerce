<template>
  <div style="margin: 0px auto; left: 100px;" class>
    <div class="container">
      <div class="row">
        <div class="py-3 px-3 col-12 d-flex flex-column justify-content-center align-items-center">
          <h3 class="yc">Transaction Customers History</h3>
          <br />
          <!-- {{transactions}} -->
          <table class="table" style="width: 100%">
            <div
              v-for="(transaction, index) in transactions"
              :key="index"
              class="d-flex flex-column justify-content-center align-items-center"
            >
              <!-- <thead class="d-flex justify-content-between"> -->
              <div class="d-flex justify-content-between heads">
                <!-- <div class="d-flex justify-content-between"> -->
                <!-- <th scope="row" colspan="5"> -->
                Transaction: #{{ transaction._id.toUpperCase().substr(0,6) }}
                <div class="d-flex flex-column" style="text-align: left">
                  <small>deliver to : {{ transaction.user_id.username }}</small>
                  <small>invoice date : {{ new Date(transaction.createdAt).toLocaleDateString() }}</small>
                </div>
                <!-- </th> -->
                <!-- </div> -->
              </div>
              <!-- </thead> -->
              <tbody class="d-flex flex-column justify-content-center align-items-center">
                <!-- <tr>{{JSON.stringify(cartItems)}}</tr> -->
                <div
                  class="d-flex justify-content-between align-items-center"
                  v-for="(item, index) in transaction.products"
                  :key="index"
                  style="width: 550px"
                >
                  <div scope="row">{{index + 1}}</div>
                  <div>
                    <img style="max-width:10vh;" :src="item.product_id.image" />
                  </div>
                  <div>{{item.product_id.name}}</div>
                  <div>{{ item.quantity }}</div>
                  <div>IDR {{subtotal(item.quantity, item.product_id.price)}}</div>
                </div>
                <!-- <tr> -->
                <!-- </tr> -->
              </tbody>
              <div class="d-flex justify-content-between pt-2 foots" style="width: 100%">
                <span>
                  Status :
                  <small
                    v-if="transaction.status"
                    id="remove"
                    v-on:click="removeFromCart(item.product_id._id)"
                    style="color: rgb(52, 138, 99)"
                  >Delivered</small>

                  <small v-else id="remove" style="color: rgb(195, 156, 16);">On process</small>
                </span>
                <div>
                  <span style="font-size:12px; !important">Total (IDR)</span>
                  <strong>{{ " "+ getTotalCart(transaction)}}</strong>
                </div>
              </div>
              <hr class="mbt-4" />
            </div>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  props: ["isLogin"],
  name: "Carts",
  data() {
    return {
      cartItems: [],
      totalProductsInCart: 0,
      sumPrice: 0 //total
    };
  },
  computed: {
    ...mapState(["adminTransactions"]),
    transactions() {
      return this.$store.state.adminTransactions;
    }
  },
  methods: {
    getTotalCart(trans) {
      let total = 0;
      trans.products.forEach(
        item => (total += item.quantity * item.product_id.price)
      );
      return total.toLocaleString();
    },
    subtotal(qty, prc) {
      let res = qty * prc;
      // this.cartItems.push(res);
      return res.toLocaleString();
    }
  },
  created() {
    this.$store.dispatch("getAdminTransactions");
  }
};
</script>

<style>
.container {
  width: 80%;
  background-color: white;
}

hr {
  border: 0.5px dashed darkgrey;
  width: 100%;
}
table {
}
td {
  border: none !important;
}
.yc {
  font-size: 15px;
  letter-spacing: 0.1em;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Lato", serif;
}

#quantity {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.row {
  font-size: 13px;
  /* width: 70%; */
}

#remove {
  font-size: 10px;
}
input,
select {
  font-size: 11px !important;
  margin-bottom: 0px !important;
}
.heads {
  width: 90% !important;
  margin: 5px;
  /* padding: 0 10px; */
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;
}
.foots {
  width: 90% !important;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid grey;
  /* padding: 0 10px; */
}
</style>
