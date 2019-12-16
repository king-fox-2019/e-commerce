<template>
  <div class="tabshop">
    <div v-if="infoUser.role == 'admin'" class="tabadmin">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in adminItems" :key="item" @click="goTab(item)">{{ item }}</v-tab>
      </v-tabs>
    </div>

    <!-- dialog create -->
    <v-dialog v-model="dialogCreate" fullscreen hide-overlay transition="dialog-bottom-transition">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>-->
      <v-form ref="formCreate" @submit.prevent="createItem">
        <v-card>
          <v-toolbar dark color="green darken-2">
            <v-btn icon dark @click="closeFormCreate">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Create Item</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text type="submit">Create</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list three-line subheader>
            <v-subheader>Admin Controls</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Name Item</v-list-item-title>
                <!--  input name-->
                <v-text-field v-model="name" :rules="nameRules" label="Name Item" required></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Stock Item</v-list-item-title>
                <!-- input stock -->
                <v-text-field v-model="stock" :rules="stockRules" label="Stock Item" required></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Category Item</v-list-item-title>
                <!-- input category -->
                <v-select
                  v-model="category"
                  :items="items"
                  :rules="categoryRules"
                  label="Category Item"
                  required
                ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Price Item</v-list-item-title>
                <!-- input price -->
                <v-text-field v-model="price" :rules="priceRules" label="Price Item" required></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Image Item</v-list-item-title>
                <!-- input image -->
                <v-file-input
                  small-chips
                  multiple
                  type="file"
                  required
                  :rules="imageRules"
                  v-model="image"
                  label="Image Item"
                ></v-file-input>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- end dialog create -->

    <div v-if="infoUser.role == 'customer'" class="tabcustomer">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in customerItems" :key="item" @click="goTab(item)">{{ item }}</v-tab>
      </v-tabs>
    </div>
    <list-item :currenttab="currentTab" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import ListItem from "../components/ListItem.vue";
const { mapGetters } = createNamespacedHelpers("sign");

export default {
  name: "TabShop",
  components: {
    "list-item": ListItem
  },
  data() {
    return {
      name: "",
      nameRules: [v => !!v || "Name is required"],
      stock: 0,
      stockRules: [
        v => !!v || "Stock is required",
        v => v >= 0 || "stock must be higher then 0"
      ],
      category: "",
      categoryRules: [v => !!v || "Category is required"],
      items: ["newitem", "bestitem"],
      price: 0,
      priceRules: [
        v => !!v || "price is required",
        v => v >= 0 || "price must be higher then 0"
      ],
      image: [],
      imageRules: [
        v => !!v || "Image is required",
        v => (v && v.length <= 1) || "Image is required"
      ],
      dialogCreate: false,
      tab: null,
      adminItems: ["New Item", "Best Item", "Add Item"],
      customerItems: ["New Item", "Best Item", "Item Purchesed"],
      currentTab: "New Item"
    };
  },
  methods: {
    goTab(tab) {
      if (tab === "Add Item") {
        this.dialogCreate = true;
      } else if (tab === "New Item") {
        this.currentTab = "";
        this.currentTab = "New Item";
      } else if (tab === "Best Item") {
        this.currentTab = "";
        this.currentTab = "Best Item";
      }
    },
    createItem() {
      if (this.$refs.formCreate.validate()) {
        let fd = new FormData();
        if (this.image.length == 0 || this.image == undefined) {
          fd.append("image", null);
        } else {
          fd.append("image", this.image[0]);
        }
        fd.append("name", this.name);
        fd.append("stock", this.stock);
        fd.append("category", this.category);
        fd.append("price", this.price);

        this.$store
          .dispatch("item/createItem", fd)
          .then(data => {
            this.fetchItem();
            this.dialogCreate = false;
            this.resetFormCreate();
            this.$snotify.success(`${data.message}`, {
              timeout: 5000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: "leftTop"
            });
          })
          .catch(err => {
            this.resetFormCreate();
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
    resetFormCreate() {
      this.$refs.formCreate.reset();
    },
    closeFormCreate() {
      this.dialogCreate = false;
      this.resetFormCreate();
    },
    fetchItem() {
      this.$store.dispatch("item/fetchItem");
    }
  },
  computed: {
    ...mapGetters(["infoUser"])
  },
  created() {
    this.fetchItem();
  }
};
</script>

<style>
</style>