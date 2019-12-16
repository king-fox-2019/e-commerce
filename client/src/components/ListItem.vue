<template>
  <div class="list-item" style="height: auto; width: 100%;">
    <v-container fluid class="px-0 py-0 mt-3" style="height: auto; text-align:center;">
      <h2 style="text-decoration:underline; color:#ff7315;">New Item Mall</h2>
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

          <p>{{ item.name }}</p>
          <p>{{ item.stock }}</p>
          <p>{{ item.price }}</p>

          <v-flex d-flex flex-direction-row justify-space-around>
            <a>
              <v-icon color="red" @click="removeItem({id: item._id, name: item.name})">mdi-delete</v-icon>
            </a>

            <a>
              <v-icon>mdi-update</v-icon>
            </a>
          </v-flex>
        </v-col>
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
  methods: {
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
  computed: {
    ...mapGetters(["fetchItem"]),
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