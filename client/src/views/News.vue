<template>
  <div class="news">
    <v-app-bar flat color="rgba(0,0,0,0)" dark class="mt-5">
      <v-toolbar-title>
        <v-img
          id="img-gohome"
          src="https://static-sea.dragonnest.com/static-sea/event/2019/dec_landing/img/logo.png"
          max-width="200"
          style="margin-top:30px; margin-left:50px;"
          @click="$router.push('/')"
        ></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn id="btn-gohome" style="margin-right:20px;" rounded @click="$router.push('/')">
        <v-icon>mdi-home</v-icon>
        <v-toolbar-title>HOMEPAGE</v-toolbar-title>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "News"
};
</script>

<style scoped>
@import "../assets/scss/news/news.css";
</style>