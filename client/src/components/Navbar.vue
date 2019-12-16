<template>
  <div>
    <div class="ui borderless menu fixed">
      <div class="menu">
        <a @click.prevent="movePage('home-page')" class="item">Home</a>
        <a @click.prevent="movePage('shop-page')" class="item">Shop</a>
        <a @click.prevent="movePage('home-page')" class="item">
          <img src="../assets/SShop.png" />
        </a>
      </div>
      <div class="menu">
        <a @click="movePage('cart-page')" class="ui item">
          <i class="icon cart arrow down"></i>
          <span
            class="right ui white label circular"
            style="margin-left:-15px;margin-bottom:25px;z-index:10"
          >{{getItemQty}}</span>
        </a>
        <a v-if="!onSession" @click.prevent="movePage('signup-page')" class="ui item">Sign Up</a>
        <a v-if="!onSession" @click.prevent="movePage('signin-page')" class="ui item">Sign In</a>
        <a v-if="onSession" @click.prevent="signOutUser" class="ui item">Sign Out</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
export default {
  components: {},
  data() {
    return {
      page: "home-page"
    };
  },
  methods: {
    movePage(page) {
      if (page === "home-page") {
        this.$router.push("/");
      } else if (page === "shop-page") {
        this.$router.push("/products");
      } else if (page === "cart-page") {
        this.$router.push("/cart");
      } else if (page === "signin-page") {
        this.$router.push("/signin");
      } else if (page === "signup-page") {
        this.$router.push("/signup");
      }
    },
    signOutUser() {
      if (typeof gapi.auth2 !== "undefined") {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
      }
      localStorage.removeItem("access_token");
      this.$store.commit("SET_SESSION", false);
      this.$store.commit("SET_CURRENT_CART", {});
      Swal.fire("Success!", "Sign out success", "success");
      this.$router.push("/signin");
    }
  },
  computed: {
    onSession() {
      return this.$store.state.onSession;
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
        return Object.keys(itemsQty).length;
      } else return 0;
    },
    ...mapState(["cart"])
  }
};
</script>

<style scoped>
.ui.menu {
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100px;
  display: flex;
  justify-content: center;
}
.ui.menu .item {
  color: white;
}
.ui.menu .item:hover,
.ui.menu .item:active {
  color: rgb(57, 57, 255);
}
</style>
