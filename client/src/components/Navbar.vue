<template>
  <div>
    <v-toolbar
      :extended="extended"
      :prominent="prominent"
      :dense="dense"
      :collapse-on-scroll="collapse"
      :flat="flat"
      src="../assets/img/header.png"
      :extension-height="extensionHeight"
    >
      <v-toolbar-title>
          <img src="../assets/img/dota2.png">
      </v-toolbar-title>

      <v-spacer></v-spacer>

    <div>
      <v-toolbar-items>
        <v-btn text class="mx-4" @click.prevent="moveStory"><span class="grey--text darken-3">Story</span></v-btn>
        <v-btn text class="mx-4"><span class="grey--text darken-3">Heropedia</span></v-btn>
        <v-btn text class="mx-4"><span class="grey--text darken-3">Shop</span></v-btn>
      </v-toolbar-items>
    </div>

    <v-spacer></v-spacer>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn color="success" @click.prevent="moveLogin">Login
        </v-btn>
        <v-btn color="warning" @click.prevent="moveRegister" class="mx-3">
            Register
        </v-btn>
        <v-btn color="error" v-if="isLogin">
            Logout
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collapse: true,
      bg: true,
      isLogin: false
    }
  },
  methods: {
    moveLogin () {
      this.$router.push('/user-control/login')
    },
    moveRegister () {
      this.$router.push('/user-control/register')
    },
    moveStory () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
