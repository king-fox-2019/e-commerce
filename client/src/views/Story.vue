<template>
  <div class="Story">
    <v-container fluid class="px-0 py-0 main-story">
      <v-row>
        <div id="header">
          <h2>THE STORY OF THE HEROES</h2>
          <br />
          <em>DRAGON NEST</em>
          <br />
          <p>
            The warrior's story who pull through the crisis that covers Alteia
            continent
          </p>
        </div>
      </v-row>
      <v-row justify="center" class="mt-5">
        <v-col
          cols="10"
          justify="center"
          style="display:flex; flex-direction:column; justify-content:center;"
        >
          <v-row justify="center">
            <h2>STORY</h2>
          </v-row>
          <v-row justify="center">
            <p>
              Goddess Altea created the beautiful world Alteia. But she drank a
              poison of decadence and fell into a deep sleep..
            </p>
          </v-row>
          <v-row class="mt-5">
            <v-carousel
              cycle
              height="600"
              interval="5000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
                :src="slide.src"
              ></v-carousel-item>
            </v-carousel>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Story",
  components: {},
  data() {
    return {
      slides: [
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_bg0.jpg"
        },
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_bg1.jpg"
        },
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_bg2.jpg"
        },
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_bg3.jpg"
        },
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_bg4.jpg"
        },
        {
          src:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_bg5.jpg"
        }
      ]
    };
  }
};
</script>
<style scoped>
@import "../assets/scss/story/story.css";
</style>
