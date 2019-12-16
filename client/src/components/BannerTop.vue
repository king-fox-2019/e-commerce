<template>
  <v-container fluid class="px-0 py-0">
    <v-row justify="center">
      <v-carousel
        cycle
        interval="3000"
        height="400"
        hide-delimiter-background
        style="width:98%;"
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BannerTop",
  data() {
    return {
      items: [
        {
          src:
            "https://images-sea.dragonnest.com/cms-sea/2/20191210/2019121010131722727.jpg"
        },
        {
          src:
            "https://images-sea.dragonnest.com/cms-sea/2/20191210/2019121010142947927.jpg"
        },
        {
          src:
            "https://images-sea.dragonnest.com/cms-sea/2/20191210/2019121010153789594.jpg"
        },
        {
          src:
            "https://images-sea.dragonnest.com/cms-sea/2/20191210/2019121010163216563.jpg"
        },
        {
          src:
            "https://images-sea.dragonnest.com/cms-sea/2/20191210/2019121010172668284.jpg"
        },
        {
          src:
            "https://images-sea.dragonnest.com/cms-sea/2/20191210/2019121010183685191.jpg"
        }
      ]
    };
  }
};
</script>

<style></style>
