<template>
  <div id="app">
    <Navbar></Navbar>

    <router-view />

    <footer class="footer">
      <div class="container" style=" text-align:center;">
        <small class="text-muted">Copyright © 2019 minima. by/afifahrahmak/</small>
      </div>
    </footer>

    <ModalLogin></ModalLogin>
    <ModalRegister></ModalRegister>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Navbar from "./components/Navbar.vue";
import ModalLogin from "./components/ModalLogin.vue";
import ModalRegister from "./components/ModalRegister.vue";
import axios from "../src/config/api";

export default {
  components: {
    Navbar,
    ModalLogin,
    ModalRegister
  },
  created() {
    this.$store.dispatch("auth");
  },
  data() {
    return {
      searchResult: [],
      searchInput: ""
    };
  },
  methods: {}
};
</script>


<style>
@import url("https://fonts.googleapis.com/css?family=Abril+Fatface|Poppins&display=swap");
html {
  position: relative;
  min-height: 100%;
}
body {
  font-family: "Poppins", sans-serif;
  margin-bottom: 90px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #f5f5f5;
}
</style>
