<template>
    <div>
        <sui-form @submit.prevent="searchItem">
            <sui-form-field>
                <sui-input placeholder="Search..."
                           icon="search"
                           size="50"
                           transparent
                           v-model="itemName"/>
            </sui-form-field>
        </sui-form>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
                itemName: ""
            }
        },
        methods: {
            searchItem() {
                this.$store.dispatch('getListItems', this.itemName)
            }
        }
    }
</script>

<style scoped>

</style>