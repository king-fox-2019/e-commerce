<template>
  <div class="shop">
    <v-container fluid class="px-0 py-0" color="#ffffff">
      <v-row>
        <v-col cols="10" class="px-0 py-0 my-0 mx-auto" style="height:119px;">
          <h1 id="header">SHOP</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="10"
          class="px-0 py-0 mx-auto"
          style="margin-top:50px; margin-bottom:50px;"
        >
          <v-flex d-flex flex-direction-row class="mb-3">
            <p class="py-auto px-auto" style="margin-top:10px; width:auto;">
              EYE CASH : {{ infoUser.cash }}
            </p>
            <v-spacer></v-spacer>
            <v-btn
              v-if="infoUser.role == 'customer'"
              color="orange darken-4"
              @click="showDialog('checkout')"
            >
              <v-icon>mdi-cart</v-icon>checkout
            </v-btn>
            <v-btn
              v-if="infoUser.role == 'admin'"
              color="green darken-2"
              @click="showDialog('history')"
            >
              <v-icon>mdi-book</v-icon>history
            </v-btn>
            <transaction-item
              :showcheckout="showCheckout"
              @close-checkout="closeCheckout"
              :showhistory="showHistory"
              @close-history="closeHistory"
              :showpurchesed="showPurchesed"
              @close-purchesed="closePurchesed"
            />
          </v-flex>
          <tabshop-item @show-purchesed="showPurchesedNow" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Transaction from "@/components/DialogTransaction.vue";
import TabShop from "@/components/TabShop.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("sign");

export default {
  name: "Shop",
  data() {
    return {
      showHistory: false,
      showCheckout: false,
      showPurchesed: false
    };
  },
  components: {
    "tabshop-item": TabShop,
    "transaction-item": Transaction
  },
  methods: {
    showDialog(dialog) {
      if (dialog === "history") {
        this.showHistory = true;
        this.showCheckout = false;
      } else if (dialog === "checkout") {
        this.showCheckout = true;
        this.showHistory = false;
      }
    },
    closeCheckout(value) {
      this.showHistory = value;
      this.showCheckout = value;
      this.showPurchesed = value;
    },
    closeHistory(value) {
      this.showHistory = value;
      this.showCheckout = value;
      this.showPurchesed = value;
    },
    showPurchesedNow(value) {
      this.showPurchesed = true;
      this.showCheckout = false;
      this.showHistory = false;
    },
    closePurchesed(value) {
      this.showCheckout = value;
      this.showPurchesed = value;
      this.showHistory = value;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next("/formsign/signin");
    }
  },
  computed: {
    ...mapGetters(["infoUser"])
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("sign/CHANGE_STATUS_LOGIN", true);
      this.$store.dispatch("sign/getInfoUser");
    } else {
      this.$store.dispatch("sign/getInfoUser");
    }
  }
};
</script>

<style scoped>
@import "../assets/scss/shop/shop.css";
</style>
