<template>
  <div>
    <div class="ui cart-product grid items" style="display:flex;justify-content:center;">
      <div class="three wide column" style="text-align:center">
        <b>Action</b>
      </div>
      <div class="three wide column" style="text-align:center">
        <b>Items</b>
      </div>
      <div class="three wide column" style="text-align:center">
        <b>Price</b>
      </div>
      <div class="three wide column" style="text-align:center">
        <b>Qty</b>
      </div>
      <div class="three wide column" style="text-align:center">
        <b>Total</b>
      </div>
    </div>
    <div class="ui divider"></div>
    <div v-if="cart">
      <div
        v-for="item in Object.keys(getItemQty)"
        :key="item._id"
        class="ui cart-product grid items"
        style="display:flex;justify-content:center;align-items:center"
      >
        <div class="three wide column" style="text-align:center">
          <a href @click.prevent="removeByItem(getItemQty[item])">
            <i class="trash icon" style="padding-right:45px;color:black"></i>
          </a>
          <a href @click.prevent="increaseAmount(getItemQty[item])">
            <i class="plus icon" style="padding-right:45px;color:black"></i>
          </a>
          <a href @click.prevent="reduceAmount(getItemQty[item])">
            <i class="minus icon" style="padding-right:45px;color:black"></i>
          </a>
        </div>
        <div class="three wide column" style="text-align:center">
          <div class="item">
            <div class="ui grid" style="display:flex;justify-content:center;align-items:center">
              <div class="eight wide column">
                <a class="ui tiny image">
                  <img :src="getItemQty[item].image" />
                </a>
              </div>
              <div class="eight wide column" style="text-align:center">
                <div class="middle aligned content" style="text-align:left">
                  <div class="header">{{getItemQty[item].name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="three wide column" style="text-align:center">{{rupiahFormatMoney[item]}}</div>
        <div class="three wide column" style="text-align:center">
          <div class="ui transparent input" style="text-align:center">{{getItemQty[item].qty}}</div>
        </div>
        <div class="three wide column" style="text-align:center">{{totalPerItem[item]}}</div>
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui cart-product grid items" style="display:flex;justify-content:center">
      <div class="three wide column" style="text-align:center"></div>
      <div class="three wide column" style="text-align:center"></div>
      <div class="three wide column" style="text-align:center"></div>
      <div class="three wide column" style="text-align:center">
        <b>Subtotal</b>
      </div>
      <div class="three wide column" style="text-align:center">
        <b>{{getSubtotal}}</b>
      </div>
    </div>
    <div class="ui cart-product grid items" style="display:flex;justify-content:center">
      <div class="three wide column" style="text-align:center"></div>
      <div class="three wide column" style="text-align:center"></div>
      <div class="three wide column" style="text-align:center"></div>
      <div class="three wide column" style="text-align:center"></div>
      <div class="three wide column" style="text-align:center">
        <b>
          <button
            @click.prevent="checkout"
            class="ui black button"
            style="border-radius:0px;margin-top:25px"
          >Checkout</button>
        </b>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import convertRupiah from "rupiah-format";
import Swal from "sweetalert2";

export default {
  methods: {
    checkout() {
      const command = "paid";
      const payload = {
        command
      };
      this.$store
        .dispatch("updateCart", payload)
        .then(data => {
          Swal.fire("Success!", data.message, "success");
          this.$store.dispatch("createCart");
        })
        .catch(err => {
          const message = err.response.data.message;
          Swal.fire("Oops...", `${message}`, "error");
        });
    },
    removeByItem(item) {
      Swal.fire({
        title: "Warning!",
        text: "Remove from cart ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          const qty = item.qty;
          const command = "clear";
          const payload = {
            item,
            qty,
            command
          };
          this.$store
            .dispatch("updateCart", payload)
            .then(data => {
              Swal.fire("Success!", data.message, "success");
            })
            .catch(err => {
              const message = err.response.data.message;
              Swal.fire("Oops...", `${message}`, "error");
            });
        }
      });
    },
    increaseAmount(item) {
      const qty = 1;
      const isAvailable = Number(item.stock) - qty >= 0;
      if (isAvailable) {
        const command = "add";
        const payload = {
          item,
          qty,
          command
        };
        this.$store
          .dispatch("updateCart", payload)
          .then(data => {})
          .catch(err => {
            const message = err.response.data.message;
            Swal.fire("Oops...", `${message}`, "error");
          });
      } else {
        Swal.fire({
          title: "Warning!",
          text: "The item you want is currently not available.",
          icon: "warning",
          confirmButtonColor: "#3085d6"
        });
      }
    },
    reduceAmount(item) {
      const isAvailable = Number(item.qty) - 1 >= 0;
      if (isAvailable) {
        let currentItem;
        const items = this.cart.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i]._id === item._id) {
            currentItem = items[i];
          }
        }
        const qty = 1;
        const command = "reduce";
        const payload = {
          item: currentItem,
          qty,
          command
        };
        this.$store
          .dispatch("updateCart", payload)
          .then(data => {})
          .catch(err => {
            const message = err.response.data.message;
            Swal.fire("Oops...", `${message}`, "error");
          });
      } else {
        Swal.fire({
          title: "Warning!",
          text: "The item you want is currently not available.",
          icon: "warning",
          confirmButtonColor: "#3085d6"
        });
      }
    }
  },
  computed: {
    totalPerItem() {
      const products = Object.keys(this.getItemQty);
      const prices = {};
      for (let i = 0; i < products.length; i++) {
        prices[products[i]] = convertRupiah.convert(
          this.getItemQty[products[i]].price * this.getItemQty[products[i]].qty
        );
      }
      return prices;
    },
    rupiahFormatMoney() {
      const products = this.cart.items;
      const prices = {};
      for (let i = 0; i < products.length; i++) {
        prices[products[i]._id] = convertRupiah.convert(products[i].price);
      }
      return prices;
    },
    getItemQty() {
      if (this.cart.items) {
        const itemsQty = {};
        const items = this.cart.items;
        for (let i = 0; i < items.length; i++) {
          if (itemsQty[items[i]._id]) {
            itemsQty[items[i]._id].qty++;
          } else {
            itemsQty[items[i]._id] = items[i];
            itemsQty[items[i]._id].qty = 1;
          }
        }
        return itemsQty;
      } else return {};
    },
    getSubtotal() {
      let subtotal = 0;
      if (this.cart && this.cart.items.length > 0) {
        this.cart.items.forEach(item => {
          subtotal += item.price;
        });
        return convertRupiah.convert(subtotal);
      } else {
        return convertRupiah.convert(subtotal);
      }
    },
    ...mapState(["cart"])
  }
};
</script>

<style></style>
