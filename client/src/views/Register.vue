<template>
    <sui-container id="suiContainer">
        <form-register/>
    </sui-container>
</template>

<script>
    import formRegister from "../components/formRegister";

    export default {
        name: "Register",
        components: {
            formRegister
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