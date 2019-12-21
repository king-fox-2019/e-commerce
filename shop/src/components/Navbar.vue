<template>
    <div>
        <v-app-bar
        color="white"
        fixed>
            <router-link to="/">
                <v-toolbar-title>ANALOGUES</v-toolbar-title>
            </router-link>
            
            <v-toolbar-items>
                <v-btn text to="/products" class="ml-3">PRODUCTS</v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn text to="/login" v-if="!isLoggedIn">SIGN IN</v-btn>
                <!-- <v-btn text v-else>SIGN OUT</v-btn> -->
                <v-menu v-if="isLoggedIn" left bottom>
                    <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-account-circle-outline</v-icon>
                    </v-btn>
                    </template>

                    <v-list>
                    <v-list-item to="/transactions">
                        <v-list-item-title>Transactions</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="signOut">
                        <v-list-item-title>Log Out</v-list-item-title>
                    </v-list-item>
                    </v-list>
                </v-menu>

                <v-btn icon to="/cart">
                    <v-icon>mdi-cart-outline</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
      
    }),
    computed: {
        ...mapState(['isLoggedIn'])
    },
    methods: {
        signOut() {
            localStorage.removeItem('token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            this.$store.commit('SET_SESSION', false)
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>