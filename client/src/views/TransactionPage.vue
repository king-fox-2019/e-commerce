<template>
  <div style="margin: 0 auto; left: 100px;" class>
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div v-if="this.$store.state.transactions.length == 0" class="row">
        <div class="py-5 px-5 col-12 text-center m-auto">
          <h3>Your Transaction History</h3>
          <small>is empty</small>
          <br />
          <router-link to="/products">
            <button class="btn btncard">Continue Shopping</button>
          </router-link>
        </div>
        <div class="col-4 text-center"></div>
      </div>
      <div v-if="this.$store.state.transactions.length !== 0" class="row py-5 px-5">
        <div
          class="py-3 px-3 col-12 d-flex mt-5 mb-3 flex-column justify-content-center align-items-center"
        >
          <h3 class="yc">Your Transaction History</h3>
          <br />
          <table class="table table-hover">
            <div v-for="(transaction, index) in transactions" :key="index">
              <thead class="d-flex justify-content-between">
                <div class="d-flex justify-content-between heads">
                  <!-- <div class="d-flex justify-content-between"> -->
                  <!-- <th scope="row" colspan="5"> -->
                  Transaction: #{{ transaction._id.toUpperCase().substr(0,6) }}
                  <div v-if="!transaction.status">
                    <button
                      class="btn btncardx btn-secondary btn-lg btn-block"
                      style
                      @click.prevent="delivered(transaction._id)"
                    >confirm Received</button>
                  </div>
                  <!-- </th> -->
                  <!-- </div> -->
                </div>
              </thead>
              <tbody>
                <!-- <tr>{{JSON.stringify(cartItems)}}</tr> -->
                <tr v-for="(item, index) in transaction.products" :key="index">
                  <td scope="row">{{index + 1}}</td>
                  <td>
                    <img style="max-width:10vh;" :src="item.product_id.image" />
                  </td>
                  <td>{{item.product_id.name}}</td>
                  <td>{{ item.quantity }}</td>
                  <td>IDR {{subtotal(item.quantity, item.product_id.price)}}</td>
                </tr>
                <!-- <tr> -->
                <div class="foots">
                  Status :
                  <small
                    v-if="transaction.status"
                    id="remove"
                    v-on:click="removeFromCart(item.product_id._id)"
                    style="color: rgb(52, 138, 99)"
                  >Delivered</small>
                  <small v-else id="remove" style="color: rgb(195, 156, 16);">On process</small>
                  <div>
                    <span style="font-size:12px; !important">Total (IDR)</span>
                    <strong>{{ " "+ getTotalCart(transaction)}}</strong>
                  </div>
                </div>
                <!-- </tr> -->
              </tbody>
              <hr class="mb-4" />
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
      sumPrice: 0, //total
      status: false
    };
  },
  computed: {
    // ...mapState(["transactions"])
    transactions() {
      return this.$store.state.transactions;
    }
  },
  methods: {
    statuz() {
      if (this.$store.state.transactions.length == 0) {
        this.status = false;
      } else this.status = true;
    },
    getTotalCart(trans) {
      let total = 0;
      trans.products.forEach(
        item => (total += item.quantity * item.product_id.price)
      );
      total += 50000;
      return total.toLocaleString();
    },
    getUserTransactions() {
      this.$store.dispatch("getUserTransactions");
    },
    delivered(id) {
      this.$store.dispatch("confirmTransaction", id);
    },
    subtotal(qty, prc) {
      let res = qty * prc;
      // this.cartItems.push(res);
      return res.toLocaleString();
    }
  },
  created() {
    this.getUserTransactions();
    this.statuz();
  }
};
</script>

<style scoped>
label {
  margin: 2px auto !important;
  font-size: 12px;
}
hr {
  border: 0.5px dashed darkgrey;
}
.yc {
  font-size: 15px;
  letter-spacing: 0.1em;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Lato", serif;
}

.atc {
  border-radius: 0px;
  color: white;
  font-size: 12.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
#quantity {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.summ {
  font-family: "Lato", serif;
  font-size: 15px;
  letter-spacing: 0.11em;
}
.btncardx {
  width: 125px;
  margin-right: 20px !important;
  background-color: rgb(255, 255, 255);
  font-size: 9px;
  font-weight: bold;
  padding: 2px;
  color: crimson;
  border-style: 1px solid rgb(233, 233, 233);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  border-radius: 12px;
}
.btncardx:hover {
  color: rgb(251, 251, 251);
  background-color: rgb(215, 60, 60);
  border-style: 1px solid rgb(215, 60, 60) !important;
}
.row {
  font-size: 12px;
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
  width: 100% !important;
  margin: 5px;
  display: flex;
  justify-content: space-between;
}
</style>
