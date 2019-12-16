<template>
    <div id="listItem">
        <sui-card-group>
            <card v-for="item in items" :key="item._id" :data="item"/>
        </sui-card-group>
    </div>
</template>

<script>
    import card from "./card";

    export default {
        name: "listItem",
        data() {
            return {
                items: []
            }
        },
        methods: {
            listItem() {
                this.$axios({
                    method: 'get',
                    url: '/api/item'
                }).then(response => {
                    console.log(response.data.data);
                    this.items = response.data.data
                }).catch(err => {
                    console.log(err.response);
                })
            }
        },
        mounted() {
            this.listItem()
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