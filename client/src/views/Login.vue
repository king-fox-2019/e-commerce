<template>
    <sui-container id="suiContainer">
        <form-login/>
    </sui-container>
</template>

<script>
    import formLogin from "../components/formLogin";

    export default {
        name: "Login",
        components: {
            formLogin
        }
    }
</script>

<style scoped>
    #suiContainer {
        border: black 1px solid;
        padding: 30px;
        width: 30%;
    }
</style>