<template>
    <div is="sui-button-group">
        <sui-button primary class="signIn">
            <router-link to="/login" class="routerLink">Sign In</router-link>
        </sui-button>
        <sui-button class="signUp">
            <router-link to="/register" class="routerLink">Sign Up</router-link>
        </sui-button>
    </div>
</template>

<script>
    export default {
        name: "signinButton"
    }
</script>

<style scoped>
    .routerLink {
        color: white;
    }

    .signUp {
        background-color: #bdc3c7;
    }
</style>