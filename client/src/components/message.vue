<template>
    <sui-message v-if="visibility" :class="type">
        <sui-message-header>{{ header }}</sui-message-header>
        {{ description }}
    </sui-message>
</template>

<script>
    export default {
        name: "message",
        props: {
            header: String,
            description: String,
            visibility: Boolean,
            type: String
        }
    }
</script>

<style scoped>
    .warning-msg{

    }
</style>