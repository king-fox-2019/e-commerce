<template>
  <div class="Main">
    <v-container fluid class="main-container px-0 py-0">
      <v-row>
        <v-col cols="10" class="px-0 py-0 mb-3 mx-auto">
          <bannertop-item />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" class="px-0 py-0 mb-3 mx-auto">
          <v-img
            src="https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/main_wbanner.png"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="px-0 py-0 mb-3 mx-auto">
          <customer-item />
        </v-col>
      </v-row>
      <v-col cols="10" class="px-0 py-0 mb-3 mx-auto">
        <bannerbot-item />
      </v-col>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import BannerTop from "@/components/BannerTop.vue";
import Customer from "@/components/Customer.vue";
import BannerBot from "@/components/BannerBottom.vue";

export default {
  name: "Main",
  components: {
    "bannertop-item": BannerTop,
    "customer-item": Customer,
    "bannerbot-item": BannerBot
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
@import "../assets/scss/main/main.css";
</style>
