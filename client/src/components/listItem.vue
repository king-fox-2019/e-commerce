<template>
    <sui-segment id="listItem" :class="isLoading">
        <sui-card-group>
            <card id="card-item" v-for="(item, index) in listItem" :key="index" :data="item"/>
        </sui-card-group>
    </sui-segment>
</template>

<script>
    import card from "./card";
    export default {
        name: "listItem",
        computed: {
            listItem() {
                return this.$store.getters.itemList;
            },
            isLoading(){
                return this.$store.getters.loadingIs;
            }
        },
        mounted() {
            this.$store.dispatch('getListItems');
        },
        components: {
            card
        }
    }
</script>

<style scoped>
    #listItem {
        padding: 25px;
    }
</style>