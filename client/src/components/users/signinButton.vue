<template>
    <div is="sui-button-group">
        <sui-button primary class="signIn" @click="login">
            Sign In
        </sui-button>
        <sui-button class="signUp">
            <router-link to="/register" class="routerLink">Sign Up</router-link>
        </sui-button>
    </div>
</template>

<script>
    import router from "../../router";

    export default {
        name: "signinButton",
        methods:{
            login(){
                router.push("/login")
            }
        }
    }
</script>

<style scoped>

</style>