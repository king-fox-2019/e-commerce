<template>
  <div class="about">
    <v-container fluid class="px-0 py-0 main-about">
      <v-row justify="center">
        <div class="bg bg1">
          <div v-if="currentBtn == 0" class="bgClip1 bgClip">
            <img
              src="https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab1_sq0.png"
              alt="kodok"
              id="bg1-sq0"
              :style="storyTab1[0].style"
            />
            <img
              src="https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab1_sq1.png"
              alt="komodo"
              id="bg1-sq1"
              :style="storyTab1[1].style"
            />
            <img
              src="https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab1_sq2.png"
              alt="kodok2"
              id="bg1-sq2"
              :style="storyTab1[2].style"
            />
            <img
              src="https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab1_sq3.png"
              alt="geraint"
              id="bg1-sq3"
              :style="storyTab1[3].style"
            />
          </div>
          <div v-if="currentBtn == 1" class="bgClip2 bgClip">
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab2_sq0.png"
              id="bg2-sq0"
              :style="storyTab2[0].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab2_sq1.png"
              id="bg2-sq1"
              :style="storyTab2[1].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab2_sq2.png"
              id="b2-sq2"
              :style="storyTab2[2].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab2_sq3.png"
              id="b2-sq3"
              :style="storyTab2[3].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab2_sq4.png"
              id="b2-sq4"
              :style="storyTab2[4].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab2_sq5.png"
              id="b2-sq5"
              :style="storyTab2[5].style"
            />
          </div>
          <div
            v-if="currentBtn == 2 && contTab3 == 'tab1'"
            class="bgClip31 bgClip"
          >
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq0.png"
              class="ds_k1_1"
              :style="storyTab31[0].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq1.png"
              class="ds_k1_2"
              :style="storyTab31[1].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq2.png"
              class="ds_k1_3"
              :style="storyTab31[2].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq3.png"
              class="ds_k1_4"
              :style="storyTab31[3].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq4.png"
              class="ds_k1_5"
              :style="storyTab31[4].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq5.png"
              class="ds_k1_6"
              :style="storyTab31[5].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq6.png"
              class="ds_k1_7"
              :style="storyTab31[6].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq7.png"
              class="ds_k1_8"
              :style="storyTab31[7].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq8.png"
              class="ds_k1_9"
              :style="storyTab31[8].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k1_sq9.png"
              class="ds_k1_10"
              :style="storyTab31[9].style"
            />
          </div>
          <div
            v-if="currentBtn == 2 && contTab3 == 'tab2'"
            class="bgClip32 bgClip"
          >
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq0.png"
              class="ds_k2_1"
              :style="storyTab32[0].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq1.png"
              class="ds_k2_2"
              :style="storyTab32[1].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq2.png"
              class="ds_k2_3"
              :style="storyTab32[2].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq3.png"
              class="ds_k2_4"
              :style="storyTab32[3].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq4.png"
              class="ds_k2_5"
              :style="storyTab32[4].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq5.png"
              class="ds_k2_6"
              :style="storyTab32[5].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq6.png"
              class="ds_k2_7"
              :style="storyTab32[6].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq7.png"
              class="ds_k2_8"
              :style="storyTab32[7].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq8.png"
              class="ds_k2_9"
              :style="storyTab32[8].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k2_sq9.png"
              class="ds_k2_10"
              :style="storyTab32[9].style"
            />
          </div>
          <div
            v-if="currentBtn == 2 && contTab3 == 'tab3'"
            class="bgClip33 bgClip"
          >
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k3_sq0.png"
              class="ds_k3_1"
              :style="storyTab33[0].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k3_sq1.png"
              class="ds_k3_2"
              :style="storyTab33[1].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k3_sq2.png"
              class="ds_k3_3"
              :style="storyTab33[2].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k3_sq3.png"
              class="ds_k3_4"
              :style="storyTab33[3].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k3_sq4.png"
              class="ds_k3_5"
              :style="storyTab33[4].style"
            />
            <img
              src="//static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/story_tab3_k3_sq5.png"
              class="ds_k3_6"
              :style="storyTab33[5].style"
            />
          </div>
          <div class="topTxt">
            <em>Dragont Nest</em>
            <p class="txt">Action House, Eyedentity games` first project</p>
          </div>
          <div class="dragon">
            <div class="dragonTab">
              <a
                v-for="(cls, index) in listClass"
                :key="index"
                :class="cls.class"
                @click="onBtn(cls.btn, index)"
                >{{ cls.text }}</a
              >
            </div>
            <dragon-cont
              v-for="(dragon, index) in listDragonCont"
              :key="index"
              :info="dragon"
              :currentbtn="currentBtn"
              @cont-now="changeTab3"
            />
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DragonCont from "../components/DragonCont.vue";

export default {
  name: "About",
  components: {
    "dragon-cont": DragonCont
  },
  data() {
    return {
      contTab3: "tab1",
      currentBtn: 0,
      storyTab1: [
        {
          name: "story1Sq0",
          style:
            "opacity: 0;top: 1008px;margin-left: 57px;height: 265px;width: 197px;"
        },
        {
          name: "story1Sq1",
          style:
            "opacity: 0;top: 1008px;margin-left: 204px;height: 739px;width: 651px;"
        },
        {
          name: "story1Sq2",
          style:
            "opacity: 0;top: 1008px;margin-left: 42px;height: 603px;width: 807px;"
        },
        {
          name: "story1Sq3",
          style:
            "opacity: 0;top: 335px;margin-left: -85px;height: 806px;width: 761px;"
        }
      ],
      updateStyleTab1: [
        {
          name: "story1Sq0",
          style:
            "opacity: 0.601562;top: 716px;margin-left: -213px;height: 265px;width: 197px;transition:0.5s",
          currentStyle:
            "opacity: 0;top: 1008px;margin-left: 57px;height: 265px;width: 197px;"
        },
        {
          name: "story1Sq1",
          style:
            "opacity: 1;top: 256px;margin-left: 204px;height: 739px;width: 651px;transition:0.5s;",
          currentStyle:
            "opacity: 0;top: 1008px;margin-left: 204px;height: 739px;width: 651px;"
        },
        {
          name: "story1Sq2",
          style:
            "opacity: 1;top: 518px;margin-left: 360px;height: 603px;width: 807px;transition:0.5s;",
          currentStyle:
            "opacity: 0;top: 1008px;margin-left: 42px;height: 603px;width: 807px;"
        },
        {
          name: "story1Sq3",
          beforeStyle:
            "opacity: 1;top: 335px;margin-left: -992px;height: 806px;width: 761px;transition:0.5s;",
          style:
            "opacity: 1;top: 335px;margin-left: -943px;height: 806px;width: 761px;transition:0.5s;",
          currentStyle:
            "opacity: 0;top: 335px;margin-left: -85px;height: 806px;width: 761px;"
        }
      ],
      storyTab2: [
        {
          name: "story2Sq0",
          style:
            "display: block; opacity: 0; top: 316px; margin-left: -2017px; height: 634px; width: 1790px;"
        },
        {
          name: "story2Sq1",
          style:
            "display: block; opacity: 1; top: 212px; margin-left: -2558px; height: 738px; width: 1276px;"
        },
        {
          name: "story2Sq2",
          style:
            "display: block; opacity: 0; top: 386px; margin-left: -2262px; height: 564px; width: 1863px;"
        },
        {
          name: "story2Sq3",
          style:
            "display: block; opacity: 0; top: 0px; margin-left: 742px; height: 1049px; width: 1211px;"
        },
        {
          name: "story2Sq4",
          style:
            "display: block; opacity: 1; top: 0px; margin-left: 1286px; height: 950px; width: 1094px;"
        },
        {
          name: "story2Sq5",
          style:
            "display: block; opacity: 0; top: 0px; margin-left: 196px; height: 1159px; width: 1487px;"
        }
      ],
      updateStyleTab2: [
        {
          name: "story2Sq0",
          style:
            "display: block; opacity: 1; top: 512px; margin-left: -811px; height: 438px; width: 1237px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 316px; margin-left: -2017px; height: 634px; width: 1790px;"
        },
        {
          name: "story2Sq1",
          beforeStyle:
            "display: block; opacity: 1; top: 212px; margin-left: -998px; height: 738px; width: 1276px;;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 212px; margin-left: -1025px; height: 738px; width: 1276px;;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 212px; margin-left: -2558px; height: 738px; width: 1276px;"
        },
        {
          name: "story2Sq2",
          style:
            "display: block; opacity: 1; top: 560px; margin-left: -1280px; height: 390px; width: 1288px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 386px; margin-left: -2262px; height: 564px; width: 1863px;"
        },
        {
          name: "story2Sq3",
          style:
            "display: block; opacity: 1; top: 0px; margin-left: 287px; height: 860px; width: 993px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 0px; margin-left: 742px; height: 1049px; width: 1211px;"
        },
        {
          name: "story2Sq4",
          beforeStyle:
            "display: block; opacity: 1; top: 0px; margin-left: 127px; height: 950px; width: 1153px;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 0px; margin-left: 186px; height: 950px; width: 1094px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 0px; margin-left: 1286px; height: 950px; width: 1094px;"
        },
        {
          name: "story2Sq5",
          style:
            "display: block; opacity: 1; top: 0px; margin-left: 61px; height: 950px; width: 1219px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 0px; margin-left: 196px; height: 1159px; width: 1487px;"
        }
      ],
      storyTab31: [
        {
          name: "31S0",
          style:
            "display: block; opacity: 0; top: 572px; margin-left: -403px; height: 80px; width: 80px;"
        },
        {
          name: "31S1",
          style:
            "display: block; opacity: 0; top: 672px; margin-left: -494px; height: 80px; width: 80px;"
        },
        {
          name: "31S2",
          style:
            "display: block; opacity: 0; top: 672px; margin-left: -404px; height: 80px; width: 80px;"
        },
        {
          name: "31S3",
          style:
            "display: block; opacity: 0; top: 672px; margin-left: -314px; height: 80px; width: 80px;"
        },
        {
          name: "31S4",
          style:
            "display: block; opacity: 0; top: 559px; margin-left: -59px; height: 359px; width: 752px;"
        },
        {
          name: "31S5",
          style:
            "display: block; opacity: 0; top: 351px; margin-left: 194px; height: 196px; width: 258px;"
        },
        {
          name: "31S6",
          style:
            "display: block; opacity: 0; top: 332px; margin-left: 281px; height: 257px; width: 220px;"
        },
        {
          name: "31S7",
          style:
            "display: block; opacity: 0; top: 264px; margin-left: 118px; height: 135px; width: 428px;"
        },
        {
          name: "31S8",
          style:
            "display: block; opacity: 0; top: 289px; margin-left: -230px; height: 570px; width: 787px;"
        },
        {
          name: "31S9",
          style:
            "display: block; opacity: 0; top: 402px; margin-left: 112px; height: 390px; width: 358px;"
        }
      ],
      updateStyleTab31: [
        {
          name: "31S0",
          style:
            "display: block; opacity: 1; top: 452px; margin-left: -403px; height: 80px; width: 80px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 572px; margin-left: -403px; height: 80px; width: 80px;"
        },
        {
          name: "31S1",
          style:
            "display: block; opacity: 1; top: 542px; margin-left: -494px; height: 80px; width: 80px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 672px; margin-left: -494px; height: 80px; width: 80px;"
        },
        {
          name: "31S2",
          style:
            "display: block; opacity: 1; top: 542px; margin-left: -404px; height: 80px; width: 80px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 672px; margin-left: -404px; height: 80px; width: 80px;"
        },
        {
          name: "31S3",
          style:
            "display: block; opacity: 1; top: 542px; margin-left: -314px; height: 80px; width: 80px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 672px; margin-left: -314px; height: 80px; width: 80px;"
        },
        {
          name: "31S4",
          style:
            "display: block; opacity: 1; top: 559px; margin-left: -582px; height: 359px; width: 752px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 559px; margin-left: -59px; height: 359px; width: 752px;"
        },
        {
          name: "31S5",
          style:
            "display: block; opacity: 1; top: 280px; margin-left: 490px; height: 245px; width: 323px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 351px; margin-left: 194px; height: 196px; width: 258px;"
        },
        {
          name: "31S6",
          style:
            "display: block; opacity: 1; top: 256px; margin-left: 658px; height: 446px; width: 275px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 332px; margin-left: 281px; height: 257px; width: 220px;"
        },
        {
          name: "31S7",
          style:
            "display: block; opacity: 1; top: 162px; margin-left: 464px; height: 169px; width: 535px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 264px; margin-left: 118px; height: 135px; width: 428px;"
        },
        {
          name: "31S8",
          style:
            "display: block; opacity: 1; top: 289px; margin-left: 50px; height: 570px; width: 787px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 289px; margin-left: -230px; height: 570px; width: 787px;"
        },
        {
          name: "31S9",
          style:
            "display: block; opacity: 1; top: 353px; margin-left: 537px; height: 488px; width: 448px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 402px; margin-left: 112px; height: 390px; width: 358px;"
        }
      ],
      storyTab32: [
        {
          name: "32S0",
          style:
            "display: block; opacity: 0; top: 532px; margin-left: -972px; height: 522px; width: 509px;"
        },
        {
          name: "32S1",
          style:
            "display: block; opacity: 1; top: 1009px; margin-left: -304px; height: 340px; width: 270px;"
        },
        {
          name: "32S2",
          style:
            "display: block; opacity: 1; top: 1123px; margin-left: -239px; height: 307px; width: 388px;"
        },
        {
          name: "32S3",
          style:
            "display: block; opacity: 1; top: 1012px; margin-left: -91px; height: 210px; width: 283px;"
        },
        {
          name: "32S4",
          style:
            "display: block; opacity: 1; top: 1006px; margin-left: -459px; height: 314px; width: 342px;"
        },
        {
          name: "32S5",
          style:
            "display: block; opacity: 1; top: 1004px; margin-left: 77px; height: 48px; width: 33px;"
        },
        {
          name: "32S6",
          style:
            "display: block; opacity: 1; top: 1002px; margin-left: -1154px; height: 676px; width: 1281px;"
        },
        {
          name: "32S7",
          style:
            "display: block; opacity: 1; top: 1002px; margin-left: 351px; height: 150px; width: 136px;"
        },
        {
          name: "32S8",
          style:
            "display: block; opacity: 1; top: 1002px; margin-left: 77px; height: 306px; width: 361px;"
        },
        {
          name: "32S9",
          style:
            "display: block; opacity: 1; top: 1009px; margin-left: 162px; height: 308px; width: 433px;"
        }
      ],
      updateStyleTab32: [
        {
          name: "32S0",
          style:
            "display: block; opacity: 1; top: 480px; margin-left: -673px; height: 522px; width: 509px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 0; top: 532px; margin-left: -972px; height: 522px; width: 509px;"
        },
        {
          name: "32S1",
          style:
            "display: block; opacity: 1; top: 662px; margin-left: -151px; height: 340px; width: 270px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1009px; margin-left: -304px; height: 340px; width: 270px;"
        },
        {
          name: "32S2",
          style:
            "display: block; opacity: 1; top: 603px; margin-left: -69px; height: 307px; width: 388px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1123px; margin-left: -239px; height: 307px; width: 388px;"
        },
        {
          name: "32S3",
          style:
            "display: block; opacity: 1; top: 792px; margin-left: 19px; height: 210px; width: 283px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1012px; margin-left: -91px; height: 210px; width: 283px;"
        },
        {
          name: "32S4",
          style:
            "display: block; opacity: 1; top: 556px; margin-left: -269px; height: 314px; width: 342px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1006px; margin-left: -459px; height: 314px; width: 342px;"
        },
        {
          name: "32S5",
          style:
            "display: block; opacity: 1; top: 484px; margin-left: 247px; height: 48px; width: 33px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1004px; margin-left: 77px; height: 48px; width: 33px;"
        },
        {
          name: "32S6",
          style:
            "display: block; opacity: 1; top: 216px; margin-left: -481px; height: 676px; width: 1281px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1002px; margin-left: -1154px; height: 676px; width: 1281px;"
        },
        {
          name: "32S7",
          style:
            "display: block; opacity: 1; top: 181px; margin-left: 582px; height: 150px; width: 136px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1002px; margin-left: 351px; height: 150px; width: 136px;"
        },
        {
          name: "32S8",
          style:
            "display: block; opacity: 1; top: 350px; margin-left: 389px; height: 306px; width: 361px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1002px; margin-left: 77px; height: 306px; width: 361px;"
        },
        {
          name: "32S9",
          style:
            "display: block; opacity: 1; top: 689px; margin-left: 302px; height: 308px; width: 433px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1009px; margin-left: 162px; height: 308px; width: 433px;"
        }
      ],
      storyTab33: [
        {
          name: "33S0",
          style:
            "display: block; opacity: 1; top: 1116px; margin-left: -218px; height: 522px; width: 509px;"
        },
        {
          name: "33S1",
          style:
            "display: block; opacity: 1; top: 1076px; margin-left: -269px; height: 379px; width: 554px;"
        },
        {
          name: "33S2",
          style:
            "display: block; opacity: 1; top: 1124px; margin-left: -249px; height: 303px; width: 475px;"
        },
        {
          name: "33S3",
          style:
            "display: block; opacity: 1; top: 1140px; margin-left: -85px; height: 241px; width: 200px;"
        },
        {
          name: "33S4",
          style:
            "display: block; opacity: 1; top: 1191px; margin-left: -127px; height: 178px; width: 313px;"
        },
        {
          name: "33S5",
          style:
            "display: block; opacity: 1; top: 1193px; margin-left: -127px; height: 178px; width: 313px;"
        }
      ],
      updateStyleTab33: [
        {
          name: "33S0",
          beforeStyle1:
            "display: block; opacity: 1; top: 466px; margin-left: -208px; height: 522px; width: 509px;transition:0.5s",
          beforeStyle2:
            "display: block; opacity: 1; top: 476px; margin-left: -218px; height: 522px; width: 509px;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 626px; margin-left: -448px; height: 326px; width: 457px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1116px; margin-left: -218px; height: 522px; width: 509px;"
        },
        {
          name: "33S1",
          beforeStyle1:
            "display: block; opacity: 1; top: 426px; margin-left: -369px; height: 379px; width: 554px;transition:0.5s",
          beforeStyle2:
            "display: block; opacity: 1; top: 436px; margin-left: -359px; height: 379px; width: 554px;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 576px; margin-left: -39px; height: 379px; width: 554px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1076px; margin-left: -269px; height: 379px; width: 554px;"
        },
        {
          name: "33S2",
          beforeStyle1:
            "display: block; opacity: 1; top: 474px; margin-left: -239px; height: 303px; width: 475px;transition:0.5s",
          beforeStyle2:
            "display: block; opacity: 1; top: 484px; margin-left: -249px; height: 303px; width: 475px;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 504px; margin-left: 271px; height: 303px; width: 475px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1124px; margin-left: -249px; height: 303px; width: 475px;"
        },
        {
          name: "33S3",
          beforeStyle1:
            "display: block; opacity: 1; top: 490px; margin-left: -85px; height: 241px; width: 200px;transition:0.5s",
          beforeStyle2:
            "display: block; opacity: 1; top: 500px; margin-left: -85px; height: 241px; width: 200px;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 290px; margin-left: 503px; height: 241px; width: 200px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1140px; margin-left: -85px; height: 241px; width: 200px;"
        },
        {
          name: "33S4",
          beforeStyle1:
            "display: block; opacity: 1; top: 541px; margin-left: -127px; height: 178px; width: 313px;transition:0.5s",
          beforeStyle2:
            "display: block; opacity: 1; top: 551px; margin-left: -127px; height: 178px; width: 313px;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 551px; margin-left: -267px; height: 178px; width: 313px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1191px; margin-left: -127px; height: 178px; width: 313px;"
        },
        {
          name: "33S5",
          beforeStyle1:
            "display: block; opacity: 1; top: 353px; margin-left: -231px; height: 428px; width: 676px;transition:0.5s",
          beforeStyle2:
            "display: block; opacity: 1; top: 363px; margin-left: -231px; height: 428px; width: 676px;transition:0.5s",
          style:
            "display: block; opacity: 1; top: 363px; margin-left: -784px; height: 428px; width: 676px;transition:0.5s",
          currentStyle:
            "display: block; opacity: 1; top: 1003px; margin-left: -231px; height: 428px; width: 676px;"
        }
      ],
      listClass: [
        {
          class: "tab1 on",
          text: "OVERVIEW",
          btn: "overview"
        },
        {
          class: "tab2",
          text: "STORIES",
          btn: "stories"
        },
        {
          class: "tab3",
          text: "KEY FEATURES",
          btn: "features"
        }
      ],
      listDragonCont: [
        {
          name: "overview",
          image:
            "https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/game/games_logo_dn.png",
          text: `
            Eyedentity Game's First title, 3D Action MORPG "Dragon Nest",
            <br />
            is developed to introduce high quality action and fun of console game to Online game field.
            <br />
            <br />
            After 3 years preparation, Dragon Nest was released in Korean Market at early 2009
            <br />
            and grapped players with vivid graphics and fast dynamic action.
          `
        },
        {
          name: "stories",
          title: "A story of warriros who emerged to against evil 6 warriors",
          span: "and fate of Altera is on your hand now.",
          text: `
            Evil dragons and monsters continuously threat the Altera continent.
            <br />
            And little girl who graps a key of new hope appears at a little town of the continent.
            <br />
            Some of high clerics and sorceress sense her advent and start to make their move.
            <br />
            On the other side, evil forces also makes their move.
            <br />
            You are dragged into their battle...
          `
        },
        {
          name: "features",
          p1: "Satisfying Power Action",
          p2: "Various Combo Display",
          p3: "A gripping story"
        }
      ]
    };
  },
  methods: {
    onBtn(btn, index) {
      if (btn === "overview") {
        this.listClass[this.currentBtn].class = `tab${this.currentBtn + 1}`;
        this.listClass[index].class = "tab1 on";
        this.currentBtn = 0;
        this.storyTab1.forEach(element => {
          this.updateStyleTab1.forEach(el => {
            if (element.name === el.name) {
              element.style = el.currentStyle;
            }
          });
        });
        setTimeout(() => {
          this.storyTab1.forEach(element => {
            this.updateStyleTab1.forEach(el => {
              if (element.name === el.name && element.name !== "story1Sq3") {
                setTimeout(() => {
                  element.style = el.style;
                }, 200);
              } else if (
                element.name === el.name &&
                element.name === "story1Sq3"
              ) {
                element.style = el.beforeStyle;
                setTimeout(() => {
                  element.style = el.style;
                }, 600);
              } else if (element.name === el.name) {
                element.style = el.style;
              }
            });
          });
        }, 500);
      } else if (btn === "stories") {
        this.listClass[this.currentBtn].class = `tab${this.currentBtn + 1}`;
        this.listClass[index].class = "tab2 on";
        this.currentBtn = 1;
        this.storyTab2.forEach(element => {
          this.updateStyleTab2.forEach(el => {
            if (element.name === el.name) {
              element.style = el.currentStyle;
            }
          });
        });
        setTimeout(() => {
          this.storyTab2.forEach(element => {
            this.updateStyleTab2.forEach(el => {
              if (element.name === el.name && element.name === "story2Sq1") {
                setTimeout(() => {
                  element.style = el.beforeStyle;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 750);
                }, 300);
              } else if (
                element.name === el.name &&
                element.name === "story2Sq4"
              ) {
                setTimeout(() => {
                  element.style = el.beforeStyle;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 750);
                }, 100);
              } else if (element.name === el.name) {
                element.style = el.style;
              }
            });
          });
        }, 500);
      } else if (btn === "features") {
        this.listClass[this.currentBtn].class = `tab${this.currentBtn + 1}`;
        this.listClass[index].class = "tab3 on";
        this.currentBtn = 2;
        this.onTab(this.contTab3);
      }
    },
    onTab(tab) {
      if (tab == "tab1") {
        this.storyTab31.forEach(element => {
          this.updateStyleTab31.forEach(el => {
            if (element.name === el.name) {
              element.style = el.currentStyle;
            }
          });
        });
        setTimeout(() => {
          this.storyTab31.forEach(element => {
            this.updateStyleTab31.forEach(el => {
              if (element.name === el.name && element.name === "31S0") {
                setTimeout(() => {
                  element.style = el.style;
                }, 300);
              } else if (element.name === el.name && element.name === "31S1") {
                setTimeout(() => {
                  element.style = el.style;
                }, 400);
              } else if (element.name === el.name && element.name === "31S2") {
                setTimeout(() => {
                  element.style = el.style;
                }, 500);
              } else if (element.name === el.name && element.name === "31S3") {
                setTimeout(() => {
                  element.style = el.style;
                }, 600);
              } else if (element.name === el.name && element.name === "31S4") {
                setTimeout(() => {
                  element.style = el.style;
                }, 100);
              } else if (element.name === el.name) {
                element.style = el.style;
              }
            });
          });
        }, 500);
      } else if (tab == "tab2") {
        this.storyTab32.forEach(element => {
          this.updateStyleTab32.forEach(el => {
            if (element.name === el.name) {
              element.style = el.currentStyle;
            }
          });
        });
        setTimeout(() => {
          this.storyTab32.forEach(element => {
            this.updateStyleTab32.forEach(el => {
              if (element.name === el.name && element.name === "32S1") {
                setTimeout(() => {
                  element.style = el.style;
                }, 300);
              } else if (element.name === el.name && element.name === "32S3") {
                setTimeout(() => {
                  element.style = el.style;
                }, 400);
              } else if (element.name === el.name && element.name === "32S4") {
                setTimeout(() => {
                  element.style = el.style;
                }, 600);
              } else if (element.name === el.name && element.name === "32S9") {
                setTimeout(() => {
                  element.style = el.style;
                }, 500);
              } else if (element.name === el.name && element.name === "32S8") {
                setTimeout(() => {
                  element.style = el.style;
                }, 800);
              } else if (element.name === el.name && element.name === "32S7") {
                setTimeout(() => {
                  element.style = el.style;
                }, 800);
              } else if (element.name === el.name && element.name === "32S6") {
                setTimeout(() => {
                  element.style = el.style;
                }, 900);
              } else if (element.name === el.name && element.name === "32S5") {
                setTimeout(() => {
                  element.style = el.style;
                }, 700);
              } else if (element.name === el.name && element.name === "32S2") {
                setTimeout(() => {
                  element.style = el.style;
                }, 700);
              } else if (element.name === el.name) {
                element.style = el.style;
              }
            });
          });
        }, 500);
      } else if (tab == "tab3") {
        this.storyTab33.forEach(element => {
          this.updateStyleTab33.forEach(el => {
            if (element.name === el.name) {
              element.style = el.currentStyle;
            }
          });
        });
        setTimeout(() => {
          this.storyTab33.forEach(element => {
            this.updateStyleTab33.forEach(el => {
              if (element.name === el.name && element.name === "33S0") {
                element.style = el.beforeStyle1;
                setTimeout(() => {
                  element.style = el.beforeStyle2;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 1000);
                }, 500);
              } else if (element.name === el.name && element.name === "33S1") {
                element.style = el.beforeStyle1;
                setTimeout(() => {
                  element.style = el.beforeStyle2;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 1000);
                }, 500);
              } else if (element.name === el.name && element.name === "33S2") {
                element.style = el.beforeStyle1;
                setTimeout(() => {
                  element.style = el.beforeStyle2;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 1000);
                }, 500);
              } else if (element.name === el.name && element.name === "33S3") {
                element.style = el.beforeStyle1;
                setTimeout(() => {
                  element.style = el.beforeStyle2;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 1000);
                }, 500);
              } else if (element.name === el.name && element.name === "33S4") {
                element.style = el.beforeStyle1;
                setTimeout(() => {
                  element.style = el.beforeStyle2;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 1000);
                }, 500);
              } else if (element.name === el.name && element.name === "33S5") {
                element.style = el.beforeStyle1;
                setTimeout(() => {
                  element.style = el.beforeStyle2;
                  setTimeout(() => {
                    element.style = el.style;
                  }, 1000);
                }, 500);
              }
            });
          });
        }, 500);
      }
    },
    changeTab3(tabnow) {
      this.contTab3 = tabnow;
      this.onTab(tabnow);
    }
  },
  watch: {
    currentBtn(val) {
      if (val != 2) {
        this.contTab3 = "tab1";
      }
    }
  },
  created() {
    this.onBtn("overview", 0);
  }
};
</script>

<style scoped>
@import "../assets/scss/about/about.css";
</style>
