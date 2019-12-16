<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense
        v-for="item in menuItems"
        :key="item.title"
      >
        <v-list-item link>
          <v-list-item-action>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.path" tag="span" style="cursor: pointer">
                {{ item.title }}
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-btn color="red" @click.prevent="logout" id="logout">Log Out</v-btn>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="orange accent-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>MY E-COMMERCE</v-toolbar-title>
        <v-layout justify-center row wrap>
          <v-flex xs12 style="text-align: center;">
          </v-flex>
          <v-flex xs12>
            <v-layout align-center justify-center row wrap>
              <v-flex xs6>
                <v-form>
                  <v-text-field outline label="Search for products" append-icon="search"></v-text-field>
                </v-form>
                <v-spacer />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
      drawer: null,
      menuItems: [
        { title: 'Home', path: '/', icon: 'home' },
        { title: 'Register', path: '/register', icon: 'face' },
        { title: 'Log In', path: '/login', icon: 'lock_open' },
        { title: 'Shopping Cart', path: '/cart', icon: 'shopping_cart' }
      ]
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style scoped>
#logout {
  margin-left: 30%;
}
</style>
