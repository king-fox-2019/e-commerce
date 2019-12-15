<template>
  <div style="background-color: transparent; height:10vh; z-index:100;" class="row">
    <div class="container my-3">
      <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div class="container">
          <router-link class="navbar-brand js-scroll-trigger navtitle active" to="/">minima.</router-link>
          <form @submit.prevent="pushSearch" style="width: 200px !important; margin:10px;">
            <div class="input-group">
              <i
                class="fas fa-search"
                style="color: rgb(40,40,40); 
                  font-size:15px; 
                  display: flex; 
                  justify-content: baseline; 
                  align-items: center;"
              ></i>
              <input
                type="text"
                v-model="searchInput"
                class="form-control p-2"
                placeholder="Enter to search.."
                aria-label="Search.."
                aria-describedby="basic-addon1"
                style="border: none; background-color: transparent;"
              />
            </div>
          </form>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style="border: none;"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li v-if="!isLogin" class="nav-item">
                <a
                  data-toggle="modal"
                  data-target="#loginmodal"
                  class="nav-link sub active"
                  to="/login"
                >Sign in</a>
              </li>
              <li class="nav-item"></li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/products">
                  <i class="fas fa-shopping-bag" style="color: rgb(45,45,45); font-size:20px;"></i>
                  <!-- Shop -->
                </router-link>
              </li>
              <li v-if="isLogin && !isAdmin" class="nav-item">
                <router-link class="nav-link active" to="/cart">
                  <i class="fas fa-shopping-cart" style="color: rgb(45,45,45); font-size:20px;"></i>
                  <span href="#" class="badge badge-light rounded">{{$store.state.cart.length}}</span>
                  <!-- Cart -->
                </router-link>
              </li>
              <li v-if="isAdmin" class="nav-item">
                <router-link class="nav-link sub active" to="/admin">
                  <i class="fas fa-user" style="color: rgb(45,45,45); font-size:20px;"></i>Admin
                  <!-- User -->
                </router-link>
              </li>
              <li v-if="isLogin && !isAdmin" class="nav-item">
                <router-link class="nav-link sub active" to="/transaction">
                  <i class="fas fa-user" style="color: rgb(45,45,45); font-size:20px;"></i>Transaction
                  <!-- User -->
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link v-if="statAdmin" class="nav-link sub active" to="/admin">Admin</router-link>
              </li>-->
              <li v-if="isLogin" @click.prevent="signOut" class="nav-item">
                <router-link class="nav-link sub active" to="/">
                  <i class="fas fa-sign-out-alt" style="color: rgb(45,45,45); font-size:20px;"></i>
                  <!-- Sign out -->
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ul style="display:flex;" class="nav justify-content-between"></ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  data() {
    return {
      searchInput: ""
    };
  },
  computed: {
    ...mapState(["isAdmin", "isLogin"])
  },
  // watch: {
  //   isAdmin() {},
  //   isLogin() {}
  // },
  created() {
    this.$store.dispatch("auth");
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.$store.commit("IS_LOGIN", false);
      this.$store.commit("ADMIN", false);
      this.$store.commit("USERNAME");
      Swal.fire("Logged out", "Have a nice day", "success");
      this.$router.push("/");
    },
    pushSearch() {
      this.axios
        .get(`/products`, {
          params: { name: this.searchInput, category: this.searchInput }
        })
        .then(({ data }) => {
          this.searchResult = data;
          this.$router.push("/search");
          this.searchInput = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
nav {
  position: fixed;
  width: 100%;
}
.sub {
  color: rgb(48, 48, 48);
  font-size: 14px;
}
.navtitle {
  font-size: 30px;
  font-weight: 700;
}
.badge {
  font-size: 10px;
  background: #fbfafa;
  color: rgb(0, 0, 0);
  padding: 0 3px;
  border-radius: 50%;
  vertical-align: top;
  margin-left: -1px;
}
</style>