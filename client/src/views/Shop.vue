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
            <v-btn v-if="infoUser.role == 'customer'" color="orange darken-4">
              <v-icon>mdi-cart</v-icon>checkout
            </v-btn>
            <v-btn v-if="infoUser.role == 'admin'" color="green darken-2">
              <v-icon>mdi-book</v-icon>history
            </v-btn>
          </v-flex>
          <tabshop-item />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TabShop from "@/components/TabShop.vue";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("sign");

export default {
  name: "Shop",
  components: {
    "tabshop-item": TabShop
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
