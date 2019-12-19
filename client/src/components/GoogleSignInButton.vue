<template>
    <button
      id="google-sign-in-button"
      class="button is-fullwidth"
      v-google-signin-button="clientId"
    >
      <img
        id="google-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png"
        alt="google-icon"
      />
      Continue with Google
    </button>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive"
import axios from "../../config/axios"
import toastMixin from "../mixins/toastMixin"

export default {
  name: "google-sign-in-button",

  directives: {
    GoogleSignInButton
  },

  data: () => ({
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
  }),

  methods: {
    OnGoogleAuthSuccess(idToken) {
      console.log("---googleAuthSuccess, ini env host server", process.env.HOST_SERVER);
      axios({
        method: "post",
        url: "/users/googleSignIn",
        headers: {
          googleidtoken: idToken
        }
      })
        .then(({ data }) => {
          console.log("---googleAuthSuccess, ini data di google auth", data)
          localStorage.setItem("access_token", data.access_token)
          this.$store.dispatch('checkToken')
          this.toast(data.message)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.danger(err.response.data.messages[0])
        });
    },
    OnGoogleAuthFail(error) {
      this.danger(error.error)
    }
  },

  mixins: [toastMixin]
};
</script>

<style scoped>
.btn {
  color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
}
#google-icon {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}
</style>