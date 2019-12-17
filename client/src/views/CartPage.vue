<template>
  <div style="margin: 0 auto; left: 100px;" class>
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div v-if="cartItems.length == 0" class="row">
        <div class="py-5 px-5 col-12 text-center m-auto">
          <h3>Your Cart</h3>
          <small>is empty</small>
          <br />
          <router-link to="/products">
            <button class="btn btncard">Continue Shopping</button>
          </router-link>
        </div>
        <div class="col-4 text-center"></div>
      </div>
      <div v-if="cartItems.length !== 0" class="row py-5 px-5">
        <div class="py-3 px-3 col-12 d-flex flex-column justify-content-center align-items-center">
          <h3 class="yc">Your Cart</h3>
          <table class="table table-hover">
            <tbody>
              <!-- <tr>{{JSON.stringify(cartItems)}}</tr> -->
              <tr v-for="(item, index) in cartItems" :key="index">
                <th scope="row">{{index + 1}}</th>
                <td>
                  <img style="max-width:10vh;" :src="item.product_id.image" />
                </td>
                <td>{{item.product_id.name}}</td>

                <td>
                  <div class="d-flex align-items-center">
                    <button
                      :disabled="isDisable(item.quantity)"
                      class="btn"
                      @click.prevent="subtract(item.product_id._id)"
                    >-</button>
                    <div>{{ item.quantity }}</div>
                    <button
                      :disabled="isMoreThanStock(item.quantity, item.product_id.stock)"
                      class="btn"
                      @click.prevent="addCart(item.product_id._id)"
                    >+</button>
                  </div>
                </td>
                <td>
                  <small>Items will be dispatched in {{random}} days</small>
                </td>
                <td>IDR {{subtotal(item.quantity, item.product_id.price)}}</td>
                <td>
                  <small
                    id="remove"
                    href
                    v-on:click="removeFromCart(item.product_id._id)"
                    style="color:red"
                  >remove</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="cartItems.length !== 0" class="row">
        <!-- <div class="col">
          <h4 class="d-flex justify-content-between align-items-center mb-2">
            <span class="yc text-muted">Order Summary</span>
            <span
              class="badge badge-secondary"
              style="font-size:13px; !important"
            >{{this.totalProductsInCart}}</span>
          </h4>
          <li class="list-group-item d-flex justify-content-between">
            <span style="font-size:12px; !important">Subtotal (IDR)</span>
            <strong>{{getTotalCart.toLocaleString()}}</strong>
          </li>
          <br />
          <button
            style="width: 250px;"
            class="btn btncard btn-secondary btn-lg btn-block"
            type="submit"
            @click.prevent="proceedToCheckout"
          >Continue to checkout</button>
        </div>-->
        <div class="container d-flex flex-column justify-content-center align-items-center">
          <div class="row" style="width: 70%;">
            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-2">
                <span class="yc text-muted">Order Summary</span>
                <span
                  class="badge badge-secondary"
                  style="font-size:13px; !important"
                >{{this.totalProductsInCart}}</span>
              </h4>
              <ul class="list-group mb-2" style="font-size:11px; !important">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 style="font-size:12px; !important" class="my-0">Estimated Sales Tax</h6>
                    <small class="text-muted">Packing and product-care</small>
                  </div>
                  <span class="text-muted">IDR 50,000</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span style="font-size:12px; !important">Subtotal (IDR)</span>
                  <strong>{{getTotalCart.toLocaleString()}}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between bg-light">
                  <div class="text-success">
                    <h6 style="font-size:12px; !important" class="my-0">Delivery Price</h6>
                    <small style="text-transform:uppercase;">chosenKurir</small>
                  </div>
                  <span class="text-success">IDR {{deliverPrice.toLocaleString()}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span style="font-size:12px; !important">Total (IDR)</span>
                  <strong>{{calcTotal(getTotalCart, deliverPrice)}}</strong>
                </li>
              </ul>
            </div>

            <div class="col-md-8 order-md-1">
              <h4 class="yc mb-3">Billing Details</h4>
              <form v-on:submit.prevent="proceedToCheckout" class="needs-validation" novalidate>
                <div class="row">
                  <div class="col-md-12 mb-2">
                    <label for="firstName">Recipient's name</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="recipientName"
                      placeholder
                      value
                      required
                    />
                    <div class="invalid-feedback">Valid recipient's name is required.</div>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    v-model="address"
                    placeholder="Jl. Krbayoran Baru, No. 12 / Gd. Aquarius"
                    required
                  />
                  <div class="invalid-feedback">Please enter your shipping address.</div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label for="country">City</label>
                    <select
                      v-on:change="pushDeliveryState('city')"
                      v-model="chosenCity"
                      v-bind:cities="cities"
                      class="custom-select d-block w-100"
                      id="country"
                      required
                    >
                      <option value>Choose...</option>
                      <option
                        v-for="(city, index) in cities"
                        :value="city.id"
                        :key="index"
                      >{{city.name}}</option>
                    </select>
                    <div class="invalid-feedback">Please select a valid city.</div>
                  </div>
                  <div class="col-md-6">
                    <label for="state">Courier</label>
                    <select
                      v-model="chosenKurir"
                      v-on:change="pushDeliveryState('courier')"
                      class="custom-select d-block w-100"
                      id="state"
                      required
                    >
                      <option value>Choose...</option>
                      <option
                        v-for="(kur, index) in kurir"
                        :value="kur"
                        :key="index"
                      >{{kur.toUpperCase()}}</option>
                    </select>
                    <div class="invalid-feedback">Please provide a valid state.</div>
                  </div>
                </div>

                <hr class="mb-4" />
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="same-address" />
                  <label
                    class="custom-control-label"
                    for="same-address"
                  >Shipping address is the same as my billing address</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="save-info" />
                  <label
                    class="custom-control-label"
                    for="save-info"
                  >Save this information for next time</label>
                </div>
                <hr class="mb-4" />
                <div class="row">
                  <div class="col-md-2">
                    <p class="mb-3" style="font-size: 12px;">
                      <strong>Payment</strong>
                    </p>
                    <div class="d-block my-3">
                      <div class="custom-control custom-radio">
                        <input
                          id="credit"
                          name="paymentMethod"
                          type="radio"
                          class="custom-control-input"
                          checked
                          required
                        />
                        <label class="custom-control-label" for="credit">Credit card</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input
                          id="debit"
                          name="paymentMethod"
                          type="radio"
                          class="custom-control-input"
                          required
                        />
                        <label class="custom-control-label" for="debit">Debit card</label>
                      </div>
                      <div class="custom-control custom-radio">
                        <input
                          id="paypal"
                          name="paymentMethod"
                          type="radio"
                          class="custom-control-input"
                          required
                        />
                        <label class="custom-control-label" for="paypal">Paypal</label>
                      </div>
                    </div>
                  </div>

                  <div class="col ml-10">
                    <div class="row">
                      <div class="col-md-8 mb-2">
                        <label for="cc-name">Name on card</label>
                        <input type="text" class="form-control" id="cc-name" placeholder required />
                        <small class="text-muted">Full name as displayed on card</small>
                        <div class="invalid-feedback">Name on card is required</div>
                      </div>
                      <div class="col-md-6 mb-2">
                        <label for="cc-number">Credit card number</label>
                        <input type="text" class="form-control" id="cc-number" placeholder required />
                        <div class="invalid-feedback">Credit card number is required</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 mb-2">
                        <label for="cc-expiration">Expiration</label>
                        <input
                          type="text"
                          class="form-control"
                          id="cc-expiration"
                          placeholder
                          required
                        />
                        <div class="invalid-feedback">Expiration date required</div>
                      </div>
                      <div class="col-md-3 mb-2">
                        <label for="cc-expiration">CVV</label>
                        <input type="text" class="form-control" id="cc-cvv" placeholder required />
                        <div class="invalid-feedback">Security code required</div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="mb-4" />
                <button
                  class="btn btncard btn-secondary btn-lg btn-block"
                  type="submit"
                  @click.prevent="proceedToCheckout"
                >Continue to checkout</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "Carts",
  data() {
    return {
      cartItems: [],
      totalProductsInCart: 0,
      sumPrice: 0, //total
      cities: [],
      provinces: [],
      kurir: ["pos", "tiki", "jne"],
      chosenCity: "",
      chosenProvince: "",
      chosenKurir: "",
      deliverPrice: 0,
      recipientName: "",
      address: "",
      deliveryState: [],
      status: true
    };
  },
  computed: {
    ...mapState(["cart"]),
    getTotalCart() {
      let total = 0;
      this.cartItems.forEach(
        item => (total += item.quantity * item.product_id.price)
      );
      // console.log(this.cartItems);
      this.sumPrice = total;
      return total;
    }
  },
  methods: {
    cartz() {
      // console.log(`panggil`);
      this.$store
        .dispatch("viewCart")
        .then(data => {
          // console.log(data);
          this.cartItems = data;
          this.totalProductsInCart = 0;
          data.forEach(cartItem => {
            this.totalProductsInCart += cartItem.quantity;
          });
        })
        .catch(err => {
          alert(err.response);
          Swal.fire(
            "Something went wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    subtract(id) {
      this.$store
        .dispatch("subtractFromCart", id)
        .then(data => {
          this.cartz();
        })
        .catch(err => {
          // console.log(err.response);
          Swal.fire(
            "Something went wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    addCart(id) {
      this.$store
        .dispatch("addFromCart", { _id: id, quantity: 1 })
        .then(data => {
          this.cartz();
        })
        .catch(err => {
          // console.log(err.response);
          Swal.fire(
            "Something went wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    subtotal(qty, prc) {
      let res = qty * prc;
      // this.cartItems.push(res);
      return res.toLocaleString();
    },
    isDisable(qty) {
      if (qty == 0) {
        return true;
      } else return false;
    },
    isMoreThanStock(qty, stock) {
      if (qty >= stock) {
        return true;
      } else return false;
    },
    removeFromCart(id) {
      this.$store
        .dispatch("removeFromCart", id)
        .then(() => {
          this.cartz();
          Swal.fire("Item deleted", "You may continue shopping", "success");
        })
        .catch(err => {
          // console.log(err);
          Swal.fire(
            "Something went wrong",
            "Please reload the page",
            "warning"
          );
        });
    },
    proceedToCheckout() {
      this.$store.dispatch("createTransaction");
    },
    calcTotal(a, b) {
      let x = a + b + 50000;
      return x.toLocaleString();
    },
    randomhehe() {
      return Math.floor(Math.random() * 4);
    },
    pushDeliveryState(val) {
      if (this.deliverPrice.length >= 3) {
        this.deliveryState.pop();
        this.deliveryState.push(val);
      } else {
        this.deliveryState.push(val);
      }
    },
    getSelectedDeliveryDetails() {
      axios({
        method: "GET",
        url: "https://api.rajaongkir.com/starter/city",
        headers: {
          key: process.env.VUE_APP_KEYRAJAONGKIR
        }
      })
        .then(({ data }) => {
          this.category = event.target.value;
          this.cities = data.dataOngkir.city;
          this.provinces = data.dataOngkir.province;
          console.log(data);
        })
        .catch(err => console.log(err));
    },
    async calculatePrice() {
      try {
        let { data } = await axios({
          method: "POST",
          url: "https://api.rajaongkir.com/starter/cost",
          headers: {
            key: process.env.VUE_APP_KEYRAJAONGKIR
          },
          data: {
            origin: 153,
            destination: this.chosenCity,
            courier: this.chosenKurir,
            weight: this.totalProductsInCart * 100
          }
        }).then(({ data }) => {
          this.deliverPrice = data.info[0].costs[0].cost[0].value;
        });
      } catch (error) {
        this.swal.fire(
          "Something is wrong",
          "Please reload the page",
          "warning"
        );
      }
    },
    statuz() {
      if (this.cartItems.length == 0) {
        this.status = false;
      } else this.status = true;
    }
  },
  created() {
    this.cartz();
    this.getSelectedDeliveryDetails();
    this.chosenCity = "";
    this.chosenKurir = "";
    this.deliveryState = [];
    this.random = this.randomhehe();
    this.statuz();
    console.log(process.env.VUE_APP_KEYRAJAONGKIR);
  },
  watch: {
    selected: function(val) {
      axios({
        method: "GET",
        url: `click/carts/ongkir/${this.selected.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.ongkir = data.rajaongkir.results[0].costs[1].cost[0].value;
        })
        .catch(err => {
          this.$swal("error", err.response.data.error[0].message, "error");
        });
    }
  }
};
</script>

<style scoped>
label {
  margin: 2px auto !important;
  font-size: 12px;
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
.btncard {
  background-color: transparent;
  font-size: 12px;
  color: black;
  border-style: 1px solid rgb(233, 233, 233) !important;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}
.row {
  font-size: 12px;
  /* width: 70%; */
}
.btncard:hover {
  border-style: none !important;
  color: black;

  background-color: rgb(230, 230, 230);
}

#remove:hover {
  cursor: pointer;
  text-decoration: underline;
}
input,
select {
  font-size: 11px !important;
  margin-bottom: 0px !important;
}
</style>
