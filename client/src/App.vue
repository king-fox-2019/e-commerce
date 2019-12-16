<template>
  <div>
    <audio id="myAudio" controls autoplay loop style="display:none;">
      <source
        src="http://23.237.126.42/ost/seal-online-gamerip/goigjkpe/Crude%20Prophecy.mp3"
        type="audio/mpeg"
      />
    </audio>
    <v-app class="app">
      <navbartop-item v-if="$route.path !== '/news'" />
      <navbarmain-item
        v-if="
          $route.path !== '/formsign/signin' &&
            $route.path !== '/formsign/signup' && $route.path !== '/news'
        "
      />
      <transition name="fadeWindow" mode="out-in">
        <router-view />
      </transition>
      <vue-snotify></vue-snotify>
      <footer-item v-if="$route.path !== '/news'" />
    </v-app>
  </div>
</template>

<script>
import NavbarTop from "@/components/NavbarTop.vue";
import NavbarMain from "@/components/NavbarMain.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    "navbartop-item": NavbarTop,
    "navbarmain-item": NavbarMain,
    "footer-item": Footer
  }
};
</script>
<style>
.app {
  padding: 0px;
  margin: 0px;
}
.fadeWindow-enter-active,
.fadeWindow-leave-active {
  transition: opacity 0.2s ease-in;
}

.fadeWindow-enter,
.fadeWindow-leave-to {
  opacity: 0;
}
</style>
