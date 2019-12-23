<template>
  <v-row justify="center" style="height:350px; padding-left:10px;">
    <v-col cols="4" class="main-box">
      <h3>NOTICE</h3>
      <ul>
        <li>
          <span class="bbox_tag bbt_event">EVENT</span>
          <span class="bbox_text">
            <a>[REVISED] Black Friday Costume Deals &amp; Sale</a>
          </span>
          <span class="bbox_date">05. Nov. 2019</span>
        </li>
        <li>
          <span class="bbox_tag bbt_update">UPDATE</span>
          <span class="bbox_text">
            <a>[Patchnote] December Patchnote</a>
          </span>
          <span class="bbox_date">05. Dec. 2019</span>
        </li>
        <li>
          <span class="bbox_tag bbt_event">EVENT</span>
          <span class="bbox_text">
            <a>[UPDATED] Event Details for December</a>
          </span>
          <span class="bbox_date">02. Dec. 2019</span>
        </li>
        <li>
          <span class="bbox_tag bbt_notice">NOTICE</span>
          <span class="bbox_text">
            <a>Action Guide for Recent Crash or Disconnection Issue</a>
          </span>
          <span class="bbox_date">25. Nov. 2019</span>
        </li>
        <li>
          <span class="bbox_tag bbt_notice">NOTICE</span>
          <span class="bbox_text">
            <a>[UPDATED] BEWARE OF SCAMS AND HACKING (13th December)</a>
          </span>
          <span class="bbox_date">21. Oct. 2019</span>
        </li>
      </ul>
    </v-col>
    <v-col cols="4" class="main-box">
      <v-row d-flex flex-column>
        <v-col style="height:220px;">
          <h3>DEV'S BLOG</h3>
          <ul>
            <li>
              <span class="bbox_sq"></span>
              <span class="bbox_text">
                <a>2nd Anniversary Loading Page Art Contest's Work</a>
              </span>
              <span class="bbox_date">26. Sep. 2019</span>
            </li>
            <li>
              <span class="bbox_sq"></span>
              <span class="bbox_text">
                <a>Machina Fanart Contest's Work</a>
              </span>
              <span class="bbox_date">23. May. 2019</span>
            </li>
            <li>
              <span class="bbox_sq"></span>
              <span class="bbox_text">
                <a>2018 DWC</a>
              </span>
              <span class="bbox_date">04. Dec. 2018</span>
            </li>
            <li>
              <span class="bbox_sq"></span>
              <span class="bbox_text">
                <a>Art Contest (Season2) Winners' Work</a>
              </span>
              <span class="bbox_date">19. Jun. 2018</span>
            </li>
          </ul>
        </v-col>
        <!-- <v-col> -->
        <!-- <v-row> -->
        <v-col style="position:relative; bottom:11px; margin-left:20px;">
          <a>
            <img
              src="//images-sea.dragonnest.com/cms-sea/2/20170905/201709051156485561.png"
              alt="DN PRESS RELEASE"
            />
          </a>
        </v-col>
        <v-col style="position:relative; bottom:11px; right:15px;">
          <a>
            <img
              src="//images-sea.dragonnest.com/cms-sea/2/20170905/2017090511553297926.jpg"
              alt="PVP DISCUSSION"
            />
          </a>
        </v-col>
        <!-- </v-row> -->
        <!-- </v-col> -->
      </v-row>
    </v-col>
    <v-col cols="2" class="customer px-0 py-0">
      <v-container style="background-color:red;" class="px-0 py-0">
        <v-row class="forum px-0 py-0 my-0" style="width:211px;">
          <v-img
            src="https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/main_fbanner.jpg"
            max-width="215"
            position="center right"
          ></v-img>
        </v-row>
        <v-row class="forum px-0 py-0 my-0" style="width:211px;">
          <v-img
            src="https://static-sea.dragonnest.com/static-sea/2/Content/EN/images/main_fbanner2.jpg"
            max-width="215"
            position="center right"
          ></v-img>
        </v-row>
        <v-row class="user" style="width:211px;">
          <h3>On : {{ infoUser.name }}</h3>
          <ul>
            <li>
              <h5>FAQ</h5>
            </li>
            <li>
              <h5>{{ infoUser.cash }}</h5>
            </li>
            <li>
              <h5>GLHF</h5>
            </li>
          </ul>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("sign");

export default {
  name: "Customer",
  computed: {
    ...mapGetters(["infoUser"])
  }
};
</script>

<style></style>
