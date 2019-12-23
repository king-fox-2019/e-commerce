<template>
  <v-container fluid class="px-0 py-0">
    <v-row justify="center">
      <div class="dragonCont">
        <div
          v-if="info.name == 'overview' && currentbtn == 0"
          class="cont cont1"
        >
          <strong class="tit">
            <img :src="info.image" alt="logo" />
          </strong>
          <p class="txt" v-html="info.text"></p>
        </div>
        <div
          v-if="info.name == 'stories' && currentbtn == 1"
          class="cont cont2"
        >
          <strong class="tit">{{ info.title }}</strong>
          <p class="txt" v-html="info.text"></p>
          <span class="spantxt">{{ info.span }}</span>
        </div>
        <div
          v-if="info.name == 'features' && currentbtn == 2"
          class="cont cont3"
        >
          <div class="cont3Tab">
            <p>
              <a id="tab1" class="cont3Tab1 on" @click="onTab('tab1')">{{
                info.p1
              }}</a>
            </p>
            <p>
              <a id="tab2" class="cont3Tab2" @click="onTab('tab2')">{{
                info.p2
              }}</a>
            </p>
            <p>
              <a id="tab3" class="cont3Tab3" @click="onTab('tab3')">{{
                info.p3
              }}</a>
            </p>
          </div>
          <content-tab3
            v-for="(cont, index) in listContTab3"
            :key="index"
            :cont="cont"
            :currenttab="currentTab"
          />
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import ContentTab3 from "./ContentTab3.vue";

export default {
  name: "DragonCont",
  components: {
    "content-tab3": ContentTab3
  },
  props: {
    info: {
      type: Object
    },
    currentbtn: {
      type: Number
    }
  },
  data() {
    return {
      currentTab: "tab1",
      listContTab3: [
        {
          name: "tab1",
          text: `
          Dragon Nest imposes FPS game control that uses WASD and Mouse so it brings fast view change
          <br />
          and character movement more than other action games.
          <br />
          Also Dragon Nest arranges a character at left side of screen that make players can see character's movement
          <br />
          and opponents attack action more easily
        `
        },
        {
          name: "tab2",
          text: `
            The action of Dragon Nest is the result of consideration of character's movement and monsters' feedback
            <br />
            with background particles and interaction.
            <br />
            Players can do unique combo attacks when monster's rebounded action is activated.
            <br />
            Also if players make a party then they can make various play patterns such as long distance
            <br />
            player's long ranged attack after a close range character makes monster fly.
          `
        },
        {
          name: "tab3",
          text: `
            Dragon Nest's action lives without a gripping story. Players are immersed in stories while they play various main and sub quests.
            <br />
            And event movies at important quest moment enhance the understanding of stories and arouse player's curiosity about next chapters.
          `
        }
      ]
    };
  },
  methods: {
    onTab(tab) {
      if (tab == "tab1") {
        let currentElement = document.getElementById(this.currentTab);
        currentElement.classList.remove("on");
        let newElement = document.getElementById("tab1");
        newElement.classList.add("on");
        this.currentTab = "tab1";
        this.$emit("cont-now", "tab1");
      } else if (tab == "tab2") {
        let currentElement = document.getElementById(this.currentTab);
        currentElement.classList.remove("on");
        let newElement = document.getElementById("tab2");
        newElement.classList.add("on");
        this.currentTab = "tab2";
        this.$emit("cont-now", "tab2");
      } else if (tab == "tab3") {
        let currentElement = document.getElementById(this.currentTab);
        currentElement.classList.remove("on");
        let newElement = document.getElementById("tab3");
        newElement.classList.add("on");
        this.currentTab = "tab3";
        this.$emit("cont-now", "tab3");
      }
    }
  },
  watch: {
    currentbtn(val) {
      if (val != 2) {
        this.currentTab = "tab1";
      }
    }
  }
};
</script>

<style></style>
