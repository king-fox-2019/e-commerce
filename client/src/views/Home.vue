<template>
    <div class="home">
        <nav-bar/>
        <list-item/>
    </div>
</template>

<script>

    import navBar from "../components/navBar";
    import listItem from "../components/listItem";

    export default {
        name: 'home',
        components: {
            navBar,
            listItem
        }
    }
</script>

<style scoped>

</style>
