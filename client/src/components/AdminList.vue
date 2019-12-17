<template>
  <div class="table-responsive" v-if="!adprod">
    <h6 class="titlebasic">PRODUCTS</h6>
    <table id="listprod" class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Number</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Image</th>
          <th scope="col">Stock</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col" style="left: 10px;">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.$store.state.products" :key="index">
          <th scope="row">{{index + 1}}</th>
          <td>{{item.name}}</td>
          <td>{{truncate(item.description)}}</td>
          <td>
            <img style="max-width:8vh;" :src="item.image" />
          </td>
          <td>{{item.stock}}</td>
          <td>{{item.category.join(', ')}}</td>
          <td>{{item.price}}</td>
          <td class="basic">
            <p @click.prevent="geteditpage(item._id)" class="btnaction">Edit</p>
            <p
              style="border-top: 1px solid darkgray; margin-top: 0px;"
              @click.prevent="deleteProduct(item._id)"
              class="btnaction"
            >Delete</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "AdminDashboard",
  props: ["productList"],
  components: {},
  data() {
    return {
      currentProduct: {},
      panel: true,
      adprod: false
    };
  },
  methods: {
    truncate(content) {
      if (content.length > 30) {
        return content.substring(0, 33).concat("...");
      } else {
        return content;
      }
    },
    deleteProduct(id) {
      // console.log(id);
      let payload = id;
      this.$store
        .dispatch("deleteProduct", payload)
        .then(data => {
          Swal.fire(`product has been deleted`, "You may proceed", "success");
          // this.$router.push("/admin");
          this.$store.dispatch("fetchProducts").then(data => {
            this.$router.push("/admin/listproduct");
          });
          this.$emit("successdelete");
        })
        .catch(err => {
          Swal.fire(`Something went wrong`, "sorry", "error");
        });
    },
    adprodd() {
      this.adprodd = true;
    },
    fetchListProduct() {
      this.$store.dispatch("fetchProducts").then(data => {});
    },
    togglePanel() {
      this.panel = true;
    },
    geteditpage(id) {
      this.$router.push(`/admin/edit/${id}`);
    }
  },
  created() {
    this.fetchListProduct();
  },
  computed: {
    getaction() {
      if (this.$router("/admin/add") || this.$router("admin/edit")) {
        this.adprod = true;
      }
    }
  }
};
</script>

<style scoped>
.admins {
  margin: 0 auto;
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
.container {
  width: 100%;
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
  border-right: 1px solid grey;
  height: 100vh;
  position: absolute;
  margin: 10px;
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
  font-size: 10px;
  color: darkgrey;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.btnaction:hover {
  opacity: 0.6;
}
</style>