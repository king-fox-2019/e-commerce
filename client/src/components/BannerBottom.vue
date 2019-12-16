<template>
  <v-container fluid class="px-0 py-0">
    <v-row justify="center">
      <v-carousel
        :show-arrows="showArrow"
        cycle
        interval="3000"
        height="250"
        :hide-delimiters="hideDelimiter"
        hide-delimiter-background
        style="width:100%;"
      >
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BannerBottom",
  data() {
    return {
      showArrow: false,
      hideDelimiter: true,
      items: [
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/main_story1.jpg"
        },
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/main_story2.jpg"
        },
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/main_story3.jpg"
        }
      ]
    };
  }
};
</script>

<style></style>
