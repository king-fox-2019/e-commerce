<template>
  <div class="list-item" style="height: auto; width: 100%;">
    <v-container fluid class="px-0 py-0 mt-3" style="height: auto; text-align:center;">
      <h2
        v-show="currenttab == 'New Item'"
        style="text-decoration:underline; color:#ff7315;"
      >New Item Mall</h2>
      <h2
        v-show="currenttab == 'Best Item'"
        style="text-decoration:underline; color:#0c9463;"
      >Best Item Mall</h2>
      <v-row d-flex flex-direction-row flex-wrap>
        <v-col
          v-for="item in filterItemNow"
          :key="item._id"
          cols="2"
          class="mx-0"
          d-flex
          flex-direction-row
          flex-wrap
        >
          <v-img :src="item.image" max-width="200" max-height="200"></v-img>

          <p>
            <strong>{{ item.name }}</strong>
          </p>
          <p>
            qty:
            <span style="color:red;">{{ item.stock }}</span>
          </p>
          <p>
            price:
            <span style="color:green;">{{ item.price }}</span>
          </p>

          <v-flex v-if="infoUser.role === 'admin'" d-flex flex-direction-row justify-space-around>
            <a @click="removeItem({id: item._id, name: item.name})">
              <v-icon color="red">mdi-delete</v-icon>
            </a>
            <a @click.prevent="openDialogUpdate(item._id)">
              <v-icon>mdi-update</v-icon>
            </a>
          </v-flex>
        </v-col>
        <!-- dialog update -->
        <v-dialog v-model="dialogUpdate" width="600" height="600">
          <v-card>
            <v-form ref="formUpdate" @submit.prevent="updateItem">
              <v-card-title class="headline orange darken-2" primary-title>Update Item</v-card-title>
              <v-text-field
                class="px-5"
                v-model="name"
                :rules="nameRules"
                label="Name Item"
                required
              ></v-text-field>
              <v-text-field
                class="px-5"
                v-model="stock"
                :rules="stockRules"
                label="Stock Item"
                required
              ></v-text-field>
              <v-select
                class="px-5"
                v-model="category"
                :items="items"
                :rules="categoryRules"
                label="Category Item"
                required
              ></v-select>
              <v-text-field
                class="px-5"
                v-model="price"
                :rules="priceRules"
                label="Price Item"
                required
              ></v-text-field>
              <v-file-input
                class="px-5"
                small-chips
                multiple
                type="file"
                required
                :rules="imageRules"
                v-model="image"
                label="Image Item"
              ></v-file-input>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text type="submit">Update Item</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <!-- end dialog update -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("item");

export default {
  name: "ListItem",
  props: {
    currenttab: {
      type: String
    }
  },
  data() {
    return {
      dialogUpdate: false,
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
      idUpdate: null
    };
  },
  methods: {
    openDialogUpdate(id) {
      this.idUpdate = id;
      this.dialogUpdate = true;
    },
    updateItem() {
      if (this.$refs.formUpdate.validate()) {
        let fd = new FormData();
        if (
          this.image.length == 0 ||
          this.image == undefined ||
          this.image == null
        ) {
          fd.append("image", null);
        } else {
          fd.append("image", this.image[0]);
        }
        fd.append("name", this.name);
        fd.append("stock", this.stock);
        fd.append("category", this.category);
        fd.append("price", this.price);

        this.$store
          .dispatch("item/updateItem", {
            id: this.idUpdate,
            data: fd
          })
          .then(data => {
            this.dialogUpdate = false;
            this.resetFormUpdate();
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
    resetFormUpdate() {
      this.$refs.formUpdate.reset();
    },
    removeItem(item) {
      this.$snotify.confirm(`item: ${item.name}`, `Want Delete This?`, {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        buttons: [
          {
            text: "Yes",
            action: toast => {
              this.$store.dispatch("item/deleteItem", item.id);
              // this.$store.dispatch("fetchNewItem");
              this.$snotify.remove(toast.id);
              this.$snotify.success(
                `Success Delete ${item.name} from Item Mall`,
                {
                  timeout: 3000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: "leftTop"
                }
              );
            },
            bold: false
          },
          {
            text: "No",
            action: toast => {
              this.$snotify.info(
                `Cancel Delete ${item.name} from your Item Mall`,
                {
                  timeout: 3000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: "leftTop"
                }
              );
              this.$snotify.remove(toast.id);
            }
          },
          {
            text: "Close",
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: true
          }
        ]
      });
    }
  },
  watch: {
    dialogUpdate(val) {
      if (!val) {
        this.resetFormUpdate();
      } else {
        this.$store
          .dispatch("item/detailItem", this.idUpdate)
          .then(data => {
            this.name = data.name;
            this.stock = data.stock;
            this.category = data.category;
            this.price = data.price;
            this.image = null;
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
    }
  },
  computed: {
    ...mapGetters(["fetchItem", "sign/infoUser"]),
    filterItemNow() {
      if (this.currenttab === "New Item") {
        let filterItem = this.fetchItem.filter(item => {
          return item.category == "newitem";
        });
        return filterItem;
      } else {
        let filterItem = this.fetchItem.filter(item => {
          return item.category == "bestitem";
        });
        return filterItem;
      }
    },
    infoUser() {
      return this.$store.state.sign.infoUser;
    },
    showDetailItem() {
      return this.$store.state.item.detailItem;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.list-item {
  font-family: "Roboto", sans-serif;
}
</style>