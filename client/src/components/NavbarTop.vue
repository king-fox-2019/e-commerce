<template>
  <nav>
    <v-app-bar depressed dark src="../assets/img/bg-nav.png">
      <v-toolbar-title id="logo-nav">
        <v-img class="ml-5" alt="logonavbar" src="../assets/img/logo-nav.png" @click="goMain"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        v-if="!isLogin"
        @click="goFormSign('signin')"
        small
        color="black"
        class="orange--text"
      >LOG IN</v-btn>
      <v-btn v-if="!isLogin" @click="goFormSign('signup')" small text color="black">SIGN UP</v-btn>
      <v-btn v-if="isLogin" @click="goSignOut" small text color="black">SIGN OUT</v-btn>
      <span style="color:black;">|</span>
      <v-img src="../assets/img/cash.png" alt="logo" max-width="30" max-height="30"></v-img>
      <!-- dialog -->
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn small text color="black" v-on="on">EYE CASH</v-btn>
        </template>

        <v-card>
          <v-form ref="form" @submit.prevent="buyCash">
            <v-card-title class="headline green darken-2" primary-title>Add Eye Cash</v-card-title>
            <v-select
              v-model="select"
              :items="items"
              :rules="cashRules"
              label="Cash"
              required
              class="px-5"
            ></v-select>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text type="submit">Buy</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <!-- end dialog -->
      <v-btn small text rounded href="https://www.facebook.com/dragonnestsea" target="_blank">
        <v-icon>fab fa-facebook</v-icon>
      </v-btn>
      <v-btn small text rounded href="https://www.youtube.com/user/dragonnestsea" target="_blank">
        <v-icon>fab fa-youtube</v-icon>
      </v-btn>
      <v-btn small text rounded href="https://www.twitch.tv/dragonnest_sea" target="_blank">
        <v-icon>fab fa-discord</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("sign");

export default {
  name: "NavbarTop",
  data() {
    return {
      dialog: false,
      select: 0,
      items: [100, 300, 500, 1000, 1500, 2000, 2500, 3000],
      cashRules: [v => !!v || "Cash is required"]
    };
  },
  methods: {
    goMain() {
      this.$router.push("/");
    },
    goFormSign(formSign) {
      if (formSign === "signin") {
        this.$router.push("/formsign/signin");
      } else if (formSign === "signup") {
        this.$router.push("/formsign/signup");
      }
    },
    goSignOut() {
      this.$snotify.info(`Thank's ${this.infoUser.name}, Have Nice Day`, {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: "leftTop"
      });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$store.commit("sign/CHANGE_STATUS_LOGIN", false);
      this.$store.dispatch("sign/getInfoUser");
      this.$router.push("/news");
    },
    buyCash() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$store
          .dispatch("sign/addCash", this.select)
          .then(response => {
            this.$store.dispatch("sign/getInfoUser");
            this.dialog = false;
            this.reset();
            this.$snotify.success(
              `Success Add Cash,Now Your Cash : ${response.cash}`,
              {
                timeout: 5000,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                position: "leftTop"
              }
            );
          })
          .catch(err => {
            let text = "";
            err.response.data.errors.forEach(element => {
              text += element + ", ";
            });
            this.reset();
            this.$snotify.warning(`${text}`, {
              timeout: 3000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: "leftTop"
            });
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.reset();
      }
    }
  },
  computed: {
    ...mapGetters(["isLogin", "infoUser"])
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("sign/CHANGE_STATUS_LOGIN", true);
    }
  }
};
</script>

<style scoped>
#logo-nav {
  cursor: pointer;
}
</style>
