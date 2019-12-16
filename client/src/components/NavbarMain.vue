<template>
  <nav>
    <v-container fluid class="px-0 py-0" id="container-nav">
      <v-row color="grey darken-4" d-flex justify="center" class="py-0" style="height:60px;">
        <v-col
          id="nav-title1"
          cols="2"
          d-flex
          align-center
          justify="center"
          class="py-0 px-0"
          @click.prevent="changePage('story')"
        >
          <v-row d-flex justify="center" class="mt-4">
            <h3>STORY</h3>
          </v-row>
        </v-col>
        <v-col
          id="nav-title1"
          cols="2"
          d-flex
          align-center
          justify="center"
          class="py-0 px-0"
          @click.prevent="changePage('heroes')"
        >
          <v-row d-flex justify="center" class="mt-4">
            <h3>HEROES</h3>
          </v-row>
        </v-col>
        <v-col
          id="nav-title1"
          cols="2"
          d-flex
          align-center
          justify="center"
          class="py-0 px-0"
          @click.prevent="changePage('about')"
        >
          <v-row d-flex justify="center" class="mt-4">
            <h3>ABOUT</h3>
          </v-row>
        </v-col>
        <v-col
          id="nav-title1"
          cols="2"
          d-flex
          align-center
          justify="center"
          class="py-0 px-0"
          @click.prevent="changePage('pvp')"
        >
          <v-row d-flex justify="center" class="mt-4">
            <h3>PVP</h3>
          </v-row>
        </v-col>
        <v-col
          id="nav-title1"
          cols="2"
          d-flex
          align-center
          justify="center"
          class="py-0 px-0"
          @click.prevent="changePage('shop')"
        >
          <v-row d-flex justify="center" class="mt-4">
            <h3>SHOP</h3>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </nav>
</template>

<script>
export default {
  name: "NavbarMain",
  data() {
    return {
      hover: false
    };
  },
  methods: {
    changePage(page) {
      switch (page) {
        case "story":
          this.$router.push("/story");
          break;
        case "heroes":
          this.$router.push("/heroes");
          break;
        case "about":
          this.$router.push("/about");
          break;
        case "pvp":
          this.$router.push("/pvp");
          break;
        case "shop":
          this.$router.push("/shop");
          break;
      }
    }
  },
  created() {
    // console.log(this.$route.path);
  }
};
</script>

<style scoped>
#container-nav {
  background-color: #272323;
}

#nav-title1 {
  color: aliceblue;
}
#nav-title1:hover {
  cursor: pointer;
  color: #fe6f01;
  background-color: black;
}
</style>
