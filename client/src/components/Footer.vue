<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4"
            dark
            icon
            :href="icon.link"
            target="_blank"
          >
            <v-icon right size="24px">{{ icon.icon }}</v-icon>
          </v-btn>
        </div>
        {{ new Date().getFullYear() }} —
        <strong>Edwin Satya Yudistira</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [
        {
          icon: "fab fa-twitter",
          link: "https://twitter.com/edwinsatya3"
        },
        {
          icon: "fab fa-facebook",
          link: "https://www.facebook.com/AUTO.TELKOMNIZER"
        },
        {
          icon: "fab fa-google-plus",
          link: ""
        },
        {
          icon: "fab fa-instagram",
          link: "https://www.instagram.com/edwinsatya_/"
        },
        {
          icon: "fab fa-linkedin",
          link: "https://www.linkedin.com/in/edwin-satya-yudistira-5a4734159/"
        }
      ]
    };
  }
};
</script>

<style></style>
