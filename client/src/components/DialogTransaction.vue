<template>
  <div class="dialogtransaction">
    <!-- history -->
    <v-dialog v-model="showhistory" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">History Transaction</span>
        </v-card-title>
        <v-card-text>
          <!-- card -->
          <v-card
            v-for="history in showHistory"
            :key="history._id"
            class="mx-auto mt-3"
            max-width="450"
            outlined
            style="border:none;"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">User : {{ history.userId.name }}</div>
                <v-card
                  v-for="detail in history.detailTransaction"
                  :key="detail._id"
                  class="mx-auto mt-3"
                  max-width="344"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">{{ detail.itemId.name }}</v-list-item-title>
                      <v-list-item-subtitle>Count : {{ detail.count }}</v-list-item-subtitle>
                      <v-list-item-subtitle>Total Price : {{ detail.totalPrice }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80" color="grey">
                      <v-img :src="detail.itemId.image" alt="item"></v-img>
                    </v-list-item-avatar>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn text>status</v-btn>
                    <v-btn v-if="detail.accepted" text>accepted</v-btn>
                    <v-btn v-if="!detail.accepted" text>pending</v-btn>
                  </v-card-actions>
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <!-- end card -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close-history', false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- checkout -->
    <v-dialog v-model="showcheckout" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Your List Cart</span>
        </v-card-title>
        <v-card-text>
          <!-- card -->
          <v-card v-for="cart in showCheckout" :key="cart._id" class="mx-auto mt-3" max-width="450">
            <v-list-item v-if="cart.purchesed == false" three-line>
              <v-list-item-content>
                <div class="overline mb-4">DETAIL ITEM</div>
                <v-list-item-title class="headline mb-1">{{ cart.itemId.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ cart.count }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ cart.totalPrice }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn color="red darken-1" text @click="removeItem(cart.itemId._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-list-item-avatar tile size="80" color="grey">
                <v-img :src="cart.itemId.image" alt="item"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <!-- end card -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange darken-2" text @click="checkout">Checkout Now</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close-checkout', false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- purchesed -->
    <v-dialog v-model="showpurchesed" width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Your List Purchesed</span>
        </v-card-title>
        <v-card-text>
          <!-- card -->
          <v-card v-for="cart in showCheckout" :key="cart._id" class="mx-auto mt-3" max-width="450">
            <v-list-item v-if="cart.purchesed == true && cart.accepted == false" three-line>
              <v-list-item-content>
                <div class="overline mb-4">DETAIL ITEM</div>
                <v-list-item-title class="headline mb-1">{{ cart.itemId.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ cart.count }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ cart.totalPrice }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-btn color="red darken-1" text @click="acceptItem(cart.itemId._id)">
                <v-icon class="mb-4">mdi-rocket</v-icon>
                <p>acc</p>
              </v-btn>

              <v-list-item-avatar tile size="80" color="grey">
                <v-img :src="cart.itemId.image" alt="item"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <!-- end card -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('close-purchesed', false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogTransaction",
  props: {
    showhistory: {
      type: Boolean
    },
    showcheckout: {
      type: Boolean
    },
    showpurchesed: {
      type: Boolean
    }
  },
  methods: {
    checkout() {
      this.$store
        .dispatch("cart/checkout", this.$store.state.sign.infoUser.cash)
        .then(data => {
          this.$store.dispatch("sign/getInfoUser");
          this.$store.dispatch("item/fetchItem");
          this.$emit("close-checkout", false);
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          this.$snotify.warning(`${text}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    },
    removeItem(itemId) {
      this.$store
        .dispatch("cart/removeItem", itemId)
        .then(data => {
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          this.$snotify.warning(`${text}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    },
    acceptItem(itemId) {
      this.$store
        .dispatch("cart/acceptItem", itemId)
        .then(data => {
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          this.$snotify.warning(`${text}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    }
  },
  computed: {
    showCheckout() {
      return this.$store.state.cart.fetchCheckout;
    },
    showHistory() {
      return this.$store.state.transaction.fetchHistory;
    }
  },
  watch: {
    showhistory(val) {
      if (val) {
        this.$store.dispatch("transaction/fetchHistory");
      } else {
        this.$emit("close-history", false);
      }
    },
    showcheckout(val) {
      if (val) {
        this.$store.dispatch("cart/fetchCheckout");
      } else {
        this.$emit("close-checkout", false);
      }
    },
    showpurchesed(val) {
      if (!val) {
        this.$emit("close-purchesed");
      } else {
        this.$store.dispatch("cart/fetchCheckout");
      }
    }
  }
};
</script>

<style>
</style>