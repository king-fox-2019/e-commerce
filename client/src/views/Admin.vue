<template>
  <div id="admins" style="margin-top:20px;">
    <div class="container">
      <div class="row">
        <div class="admin-left">
          <router-link to="/admin/add">
            <button class="btnadmin btn-secondary btn">Add product</button>
          </router-link>
          <router-link to="/admin/listproduct">
            <button class="btnadmin btn-secondary btn">List product</button>
          </router-link>
          <router-link to="/admin/transactions">
            <button class="btnadmin btn-secondary btn">Transaction</button>
          </router-link>
          <router-link to="/admin/statistic">
            <button class="btnadmin btn-secondary btn">Statistic</button>
          </router-link>
          <br />
        </div>
        <div class="admin-main col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "AdminDashboard",
  components: {},
  data() {
    return {
      addprod: false
    };
  },
  created() {
    console.log(this.currentProduct);
    if (localStorage.getItem("token")) {
      this.statLogin = true;
    } else {
      this.statLogin = false;
    }
    if (localStorage.getItem("isAdmin") === false) {
      Swal.fire("Not Authorized", "You cannot enter here", "error");
      this.$router.push("/");
    } else {
      this.statAdmin = true;
      this.fetchListProduct();
    }
  },
  methods: {
    fetchListProduct() {
      this.$store.dispatch("fetchProducts").then(data => {});
    },
    togglePanel() {
      this.panel = true;
    }
  },
  created() {
    this.$router.push("/admin/listproduct");
  },
  watch: {
    $route() {
      if (this.$route.path.username == "admin") {
        this.panel = false;
        this.fetchListProduct();
      }
    }
  },
  computed: {
    getaction() {
      if (this.$router("/admin/add") || this.$router("admin/edit")) {
        this.addprod = true;
      } else this.addprod = false;
    },
    getstat() {
      if (localStorage.getItem("token")) {
        this.statLogin = true;
      } else {
        this.statLogin = false;
      }
      if (localStorage.getItem("isAdmin") === false) {
        Swal.fire("Not Authorized", "You cant enter here", "error");
        this.$router.push("/");
      } else {
        this.statAdmin = true;
        this.fetchListProduct();
      }
    }
  }
};
</script>

<style scoped>
.admins {
  margin: 0 auto;
  width: 100%;
}
td.basic {
  left: 0;
  display: flex;
  flex-direction: column;
  /* align-items: baseline;
  justify-content: baseline; */
}

.titlebasic {
  letter-spacing: 0.12em;
  font-weight: bold;
  margin: 10px auto;
  padding-bottom: 10px;
  padding-left: 10px;

  border-bottom: 1px solid rgb(77, 76, 76);
}

.table {
  width: 100%;
}
.tableadmin {
  border: 1px solid !important;
}
.table tr,
.table td,
.table th {
  border: 0 !important;
  font-size: 11px;
}
.table tr td:nth-child(1),
.btnadmin {
  background-color: transparent;
  font-size: 11px;
  width: 117px;
  display: inline-block;
  color: black;
  border-radius: 22px;
  letter-spacing: 0.18em;
  border-style: 1px solid rgb(233, 233, 233) !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0.5em;
}

.btnadmin:hover {
  background-color: rgb(230, 230, 230);

  opacity: 0.6;
}

.adminbtn {
  margin: 2px;
  display: inline-block;
  width: 130px;
  font-size: 14px;
  color: grey;
  border-style: 1px solid grey !important;
  border-radius: 22px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.adminbtn:hover {
  opacity: 0.6;
}

.admintitletbltxt {
  height: 2rem;
  font-weight: 600;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

.admintabletxt {
  text-decoration: none;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
}

.admintabletxt:before {
  width: 60px;
  position: absolute;
  bottom: 0;
  right: 350px;
}

.admin-left {
  width: 165px;
  /* padding: 0; */
  border-right: 1px solid grey;
  height: 100vh;
  position: fixed;
  margin: 10px;
}

.admin-main {
  left: 195px;
  right: 1050px;
  padding: 10px 200px 0 50px;
  margin: 0px auto;
  background-color: white;
}
#listprod {
  font-size: 13px;
}

.btnaction {
  padding: 5px 0px;
  cursor: pointer;
  border-style: 1px solid black !important;
  margin: 0 auto !important;
  /* display: inline-block; */
  /* width: 130px; */
  font-size: 11px;
  color: darkgrey;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.btnaction:hover {
  opacity: 0.6;
}
</style>

