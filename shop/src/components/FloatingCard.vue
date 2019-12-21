<template>
    <v-card
        width="256"
      >
        <v-navigation-drawer
          floating
          permanent
          color="light-blue darken-4"
        >
        
          <v-list
            dense
            rounded
          >
            <v-list-item class="my-5">
              <v-list-item-content>
                <v-avatar>
                <img src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg">
                </v-avatar>
                <v-list-item-title class="white--text py-4">{{name}}</v-list-item-title>
                <v-list-item-subtitle class="white--text">{{email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
export default {
  data: () => ({
    email: localStorage.getItem('email'),
    name: localStorage.getItem('name')
  })
}
</script>

<style>

</style>